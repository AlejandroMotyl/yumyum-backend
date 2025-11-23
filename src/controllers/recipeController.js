import createHttpError from 'http-errors';
import { Recipe } from '../models/recipe.js';
import { User } from '../models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { deleteFileFromCloudinary } from '../utils/deleteFileFromCloudinary.js';

export const getAllRecipesPublic = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    search,
    category,
    ingredient,
    sortBy,
    sortOrder = 'asc',
  } = req.query;
  const skip = (page - 1) * perPage;

  const recipesQuery = Recipe.find();

  if (category) {
    recipesQuery.where({ category });
  }
  if (ingredient) {
    recipesQuery.where({ 'ingredients.id': ingredient });
  }
  if (search) {
    recipesQuery.where({
      $text: { $search: search },
    });
  }

  const allowedSortFields = {
    time: 'time',
    cals: 'cals',
    popularity: 'favoritesCount',
  };

  if (sortBy && allowedSortFields[sortBy]) {
    recipesQuery.sort({
      [allowedSortFields[sortBy]]: sortOrder === 'desc' ? -1 : 1,
    });
  }

  const [totalRecipes, recipes] = await Promise.all([
    recipesQuery.clone().countDocuments(),
    recipesQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalRecipes / perPage);

  res.status(200).json({
    page,
    perPage,
    totalRecipes,
    totalPages,
    recipes,
  });
};

export const getUserRecipes = async (req, res) => {
  const {
    page = 1,
    perPage = 12,
    search,
    category,
    ingredient,
    sortBy,
    sortOrder = 'asc',
  } = req.query;

  const skip = (page - 1) * perPage;
  const recipesQuery = Recipe.find({ owner: req.user._id }).populate(
    'owner',
    'username email',
  );

  if (category) {
    recipesQuery.where({ category });
  }
  if (ingredient) {
    recipesQuery.where({ 'ingredients.id': ingredient });
  }
  if (search) {
    recipesQuery.where({ $text: { $search: search } });
  }

  const allowedSortFields = {
    time: 'time',
    cals: 'cals',
    popularity: 'favoritesCount',
  };

  if (sortBy && allowedSortFields[sortBy]) {
    recipesQuery.sort({
      [allowedSortFields[sortBy]]: sortOrder === 'desc' ? -1 : 1,
    });
  }

  const [totalRecipes, recipes] = await Promise.all([
    recipesQuery.clone().countDocuments(),
    recipesQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalRecipes / perPage);

  res.status(200).json({
    page: Number(page),
    perPage: Number(perPage),
    totalRecipes,
    totalPages,
    recipes,
  });
};

export const getRecipeById = async (req, res, next) => {
  const { recipeId } = req.params;
  const recipe = await Recipe.findOne({
    _id: recipeId,
  });

  if (!recipe) {
    next(createHttpError(404, 'Recipe not found'));
    return;
  }

  res.status(200).json(recipe);
};

export const createRecipe = async (req, res, next) => {
  if (req.file) {
    const result = await saveFileToCloudinary(req.file.buffer);
    req.body.thumb = result.secure_url;
  }

  const recipe = await Recipe.create({
    ...req.body,
    owner: req.user._id,
  });

  res.status(201).json(recipe);
};

export const addRecipeToFavorites = async (req, res) => {
  const userId = req.user._id;
  const { recipeId } = req.params;

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) throw createHttpError(404, 'Recipe not found');

  const user = await User.findById(userId);
  if (user.savedRecipes.includes(recipeId))
    throw createHttpError(400, 'Already in favorites');

  user.savedRecipes.push(recipeId);
  await user.save();

  await Recipe.findByIdAndUpdate(recipeId, { $inc: { favoritesCount: 1 } });

  res.status(201).json({ message: 'Recipe added to favorites' });
};

export const removeRecipeFromFavorites = async (req, res) => {
  const userId = req.user._id;
  const { recipeId } = req.params;

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) throw createHttpError(404, 'Recipe not found');

  const user = await User.findById(userId);
  const index = user.savedRecipes.indexOf(recipeId);

  if (index === -1) {
    throw createHttpError(404, 'Recipe not found in favorites');
  }

  user.savedRecipes.splice(index, 1);
  await user.save();
  await Recipe.findByIdAndUpdate(recipeId, [
    {
      $set: {
        favoritesCount: {
          $max: [{ $subtract: ['$favoritesCount', 1] }, 0],
        },
      },
    },
  ]);
  res.json({ message: 'Recipe removed from favorites' });
};

export const getFavoriteRecipes = async (req, res) => {
  const {
    page = 1,
    perPage = 12,
    search,
    category,
    ingredient,
    sortBy,
    sortOrder = 'asc',
  } = req.query;

  const pageNum = Number(page);
  const limit = Number(perPage);
  const skip = (pageNum - 1) * limit;

  const user = await User.findById(req.user._id).select('savedRecipes');
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const recipesQuery = Recipe.find({
    _id: { $in: user.savedRecipes },
  }).populate('owner', 'username email avatar');

  if (category) {
    recipesQuery.where({ category });
  }
  if (ingredient) {
    recipesQuery.where({ 'ingredients.id': ingredient });
  }
  if (search) {
    recipesQuery.where({ $text: { $search: search } });
  }

  const allowedSortFields = {
    time: 'time',
    cals: 'cals',
    popularity: 'favoritesCount',
  };

  if (sortBy && allowedSortFields[sortBy]) {
    recipesQuery.sort({
      [allowedSortFields[sortBy]]: sortOrder === 'desc' ? -1 : 1,
    });
  }

  const [totalRecipes, recipes] = await Promise.all([
    recipesQuery.clone().countDocuments(),
    recipesQuery.skip(skip).limit(limit),
  ]);

  const totalPages = Math.ceil(totalRecipes / limit);

  res.status(200).json({
    page: pageNum,
    perPage: limit,
    totalRecipes,
    totalPages,
    recipes,
  });
};

export const deleteMyRecipe = async (req, res) => {
  const userId = req.user._id;
  const { recipeId } = req.params;

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) throw createHttpError(404, 'Recipe not found');

  if (recipe.owner.toString() !== userId.toString()) {
    throw createHttpError(403, 'You are not the owner of this recipe');
  }

  if (recipe.thumb) {
    try {
      const result = await deleteFileFromCloudinary(recipe.thumb);
      if (result.result !== 'ok' && result.result !== 'not found') {
        console.warn('Failed to delete Cloudinary image', recipe.thumb);
      }
    } catch (err) {
      console.warn('Error deleting Cloudinary image', err);
    }
  }

  const usersUpdated = await User.updateMany(
    { savedRecipes: recipeId },
    { $pull: { savedRecipes: recipeId } },
  );

  const decrementValue = usersUpdated.modifiedCount || 0;
  if (decrementValue > 0) {
    await Recipe.findByIdAndUpdate(recipeId, {
      $inc: { favoritesCount: -decrementValue },
    });
  }

  await Recipe.findByIdAndDelete(recipeId);

  res.json({ message: 'Recipe deleted successfully' });
};
