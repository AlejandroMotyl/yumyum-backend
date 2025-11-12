import { model, Schema } from 'mongoose';

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String, // приклад: "Dessert", "Lamb", "Beef"
      required: true,
      trim: true,
    },
    area: {
      type: String, // приклад: "British", "Irish"
      required: false,
      trim: true,
    },
    instructions: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      default: '',
    },
    thumb: {
      type: String, // URL до зображення
      required: false,
      trim: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ingredients: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: 'Ingredient',
          required: true,
        },
        measure: {
          type: String,
          trim: true,
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

recipeSchema.index({
  title: 'text',
  description: 'text',
  instructions: 'text',
});
recipeSchema.index({ category: 1, owner: 1 });

recipeSchema.index({ 'ingredients.Id': 1 });

export const Recipe = model('Recipe', recipeSchema);
