import createHttpError from 'http-errors';

export const getCurrentUser = async (req, res, next) => {
  try {
    if (!req.user) throw createHttpError(401, 'Unauthorized');

    res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      savedRecipes: req.user.savedRecipes,
    });
  } catch (error) {
    next(error);
  }
};
