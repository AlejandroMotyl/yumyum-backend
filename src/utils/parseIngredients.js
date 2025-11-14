export const parseIngredients = (req, res, next) => {
  if (typeof req.body.ingredients === 'string') {
    req.body.ingredients = JSON.parse(req.body.ingredients);
  }
  next();
};
