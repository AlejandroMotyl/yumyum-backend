import createHttpError from 'http-errors';
import { Recipe } from '../models/recipe.js';
import { User } from '../models/user.js';

export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, search, tag } = req.query;
  const skip = (page - 1) * perPage;

  const notesQuery = Recipe.find({ userId: req.user._id });

  if (tag) {
    notesQuery.where({ tag });
  }

  if (search) {
    notesQuery.where({
      $text: { $search: search },
    });
  }

  const [totalNotes, notes] = await Promise.all([
    notesQuery.clone().countDocuments(),
    notesQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({
    page,
    perPage,
    totalNotes,
    totalPages,
    notes,
  });
};

export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Recipe.findOne({
    _id: noteId,
    userId: req.user._id,
  });

  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const note = await Recipe.create({
    ...req.body,
    userId: req.user._id,
  });
  res.status(201).json(note);
};

export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Recipe.findOneAndDelete({
    _id: noteId,
    userId: req.user._id,
  });

  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }

  res.status(200).json(note);
};

export const updateNote = async (req, res, next) => {
  const { noteId } = req.params;

  const note = await Recipe.findOneAndUpdate(
    { _id: noteId, userId: req.user._id },
    req.body,
    {
      new: true,
    },
  );

  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }

  res.status(200).json(note);
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

  res.json({ message: 'Recipe removed from favorites' });
};

export const getFavoriteRecipes = async (req, res) => {
  const { page = 1, perPage = 12 } = req.query;
  const pageNum = Number(page);
  const limit = Number(perPage);
  const skip = (pageNum - 1) * limit;

  const countQuery = Recipe.countDocuments({ owner: req.user._id });

  const dataQuery = Recipe.find({ owner: req.user._id })
    .skip(skip)
    .limit(limit)
    .populate('owner', 'email')
    .populate('ingredients.id', 'name');

  const [totalRecipes, recipes] = await Promise.all([countQuery, dataQuery]);

  const totalPages = Math.ceil(totalRecipes / limit);

  res.status(200).json({
    page: pageNum,
    perPage: limit,
    totalRecipes,
    totalPages,
    recipes,
  });
};
