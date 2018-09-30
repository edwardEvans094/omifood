/**
 * GET /
 * Cart page.
 */
exports.renderCartPage = (req, res) => {
  const allCarts = req.session.carts;
  res.render('cart', {
    title: 'Giỏ hàng',
    allCarts
  });
};
