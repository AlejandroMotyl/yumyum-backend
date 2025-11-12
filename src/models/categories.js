import { model, Schema } from 'mongoose';

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Індекс для текстового пошуку
categorySchema.index({ name: 'text' });

// Статичний метод для отримання всіх категорій
categorySchema.statics.getAllCategories = function () {
  return this.find().sort({ name: 1 });
};

categorySchema.virtual('recipes', {
  ref: 'Recipe',
  localField: '_id',
  foreignField: 'categoryId',
});

export const Category = model('Category', categorySchema);
