import { model, Schema } from 'mongoose';

const ingredientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    desc: {
      type: String,
      required: false,
      trim: true,
      default: '',
    },
    img: {
      type: String,
      required: false,
      default: '',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

ingredientSchema.index({ name: 'text' });

export const Ingredient = model('Ingredient', ingredientSchema);
