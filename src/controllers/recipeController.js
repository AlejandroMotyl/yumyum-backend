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
