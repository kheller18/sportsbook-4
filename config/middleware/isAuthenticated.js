module.exports = (req, res, next) => {
  if (req.user) {
    console.log('authenticated')
    return next();
  };

  return res.redirect('/');
};
