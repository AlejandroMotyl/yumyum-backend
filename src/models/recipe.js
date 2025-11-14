import { model, Schema } from 'mongoose';

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      required: true,
    },
    area: {
      type: String,
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
      trim: true,
      default: '',
    },
    thumb: {
      type: String,
      trim: true,
    },
    time: {
      type: Number,
      required: true,
    },
    cals: {
      type: Number,
      required: false,
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

recipeSchema.index({ categoryId: 1 });

recipeSchema.index({ owner: 1 });

recipeSchema.index({ 'ingredients.id': 1 });

export const Recipe = model('Recipe', recipeSchema);
