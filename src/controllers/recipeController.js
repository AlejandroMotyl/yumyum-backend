import createHttpError from 'http-errors';
import { Recipe } from '../models/recipe.js';

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

//TODO:Get all user recipes

export const getUserRecipes = async (req, res) => {
  const { page = 1, perPage = 12 } = req.query;
  const skip = (page - 1) * perPage;
  const recipesQuery = Recipe.find({ owner: req.user._id }).populate(
    'owner',
    'username email',
  );

  const [totalRecipes, recipes] = await Promise.all([
    recipesQuery.clone().countDocuments(),
    recipesQuery.clone().skip(skip).limit(perPage),
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
