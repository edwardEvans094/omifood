/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  const allCarts = req.session.carts;
  res.render('home', {
    title: 'Sách',
    allCarts
  });
};
