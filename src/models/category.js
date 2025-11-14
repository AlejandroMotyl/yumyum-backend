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

categorySchema.index({ name: 'text' });

categorySchema.statics.getAllCategories = function () {
  return this.find().sort({ name: 1 });
};

// Віртуальне поле для отримання рецептів цієї категорії
categorySchema.virtual('recipes', {
  ref: 'Recipe', // з якої колекції тягнути
  localField: '_id', // _id категорії
  foreignField: 'categoryId', // поле у Recipe
});

export const Category = model('Category', categorySchema);
