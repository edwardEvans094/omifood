/**
 * GET /
 * Cart page.
 */
exports.renderCartPage = (req, res) => {
  res.render('cart', {
    title: 'Cart'
  });
};
