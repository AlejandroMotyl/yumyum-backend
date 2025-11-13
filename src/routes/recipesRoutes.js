import { Router } from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  addRecipeToFavorites,
  removeRecipeFromFavorites,
  getFavoriteRecipes,
} from '../controllers/recipeController.js';
import {
  createNoteSchema,
  getAllNotesSchema,
  getFavoriteRecipeSchema,
  recipeIdSchema,
} from '../validations/recipesValidation.js';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

// !!!!!!!!!! Переробити з notes на recipes, обовязково використовуєм /api/recipes для всіх рутів. !!!!!!!!!

// TODO: створити публічний ендпоінт для пошуку рецептів за категорією, інгредієнтом, входженням пошукового значення в назву рецепту (з урахуванням логіки пагінації)

router.get('/notes', celebrate(getAllNotesSchema), getAllNotes);

// !!!
// TODO: створити публічний ендпоінт для отримання детальної інформації про рецепт за його id

router.get('/notes/:noteId', celebrate(recipeIdSchema), getNoteById);

// !!!

// TODO: створити приватний ендпоінт для створення власного рецепту

router.post('/notes', celebrate(createNoteSchema), createNote);

// !!!

// TODO: створити приватний ендпоінт для отримання власних рецептів

// !!! Писати з нуля

// TODO:створити приватний ендпоінт для додавання рецепту до списку улюблених

router.post(
  '/api/recipes/favorites/:recipeId',
  authenticate,
  celebrate(recipeIdSchema),
  addRecipeToFavorites,
);

// TODO:створити приватний ендпоінт для видалення рецепту зі списку улюблених

router.delete(
  '/api/recipes/favorites/:recipeId',
  authenticate,
  celebrate(recipeIdSchema),
  removeRecipeFromFavorites,
);

// TODO:створити приватний ендпоінт для отримання списку улюблених рецептів

router.get(
  '/api/recipes/favorites',
  authenticate,
  celebrate(getFavoriteRecipeSchema),
  getFavoriteRecipes,
);

// !!!

// ? Додаткове завдання для видалення власного рецепту
// router.delete('/notes/:noteId', celebrate(recipeIdSchema), deleteNote);

// ? Не чіпати, можливо для додаткового завдання реалізувати оновлення рецепту.
// router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

export default router;
