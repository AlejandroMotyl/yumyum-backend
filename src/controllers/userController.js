import createHttpError from 'http-errors';

export const getCurrentUser = async (req, res, next) => {
  try {
    if (!req.user) throw createHttpError(401, 'Unauthorized');

    res.status(200).json({
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    });
  } catch (error) {
    next(error);
  }
};
