import { model, Schema } from 'mongoose';

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: { type: String, required: false, trim: true, default: '' },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: false,
    },
    ingredients: [
      {
        ingredientId: {
          type: Schema.Types.ObjectId,
          ref: 'Ingredient',
          required: true,
        },
        measure: {
          type: String, // наприклад: "200g", "2 cups", "1 tsp"
          required: false,
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

recipeSchema.index({ title: 'text', content: 'text' });
recipeSchema.index({ userId: 1, categoryId: 1 });

recipeSchema.index({ 'ingredients.ingredientId': 1 });

export const Recipe = model('Recipe', recipeSchema);
