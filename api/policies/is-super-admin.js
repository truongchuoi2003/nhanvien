/**
 * is-super-admin
 *
 * A simple policy that blocks requests from non-super-admins.
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */
module.exports = async function (req, res, proceed) {
  if (!req.me) {
    return res.forbidden('Bạn chưa đăng nhập');
  }

  // Admin thì luôn cho qua
  if (req.me.role === 'admin') {
    return proceed();
  }

  // User chỉ được phép xem thông tin của chính mình
  if (req.me.id === req.param('id')) {
    return proceed();
  }

  return res.forbidden('Bạn chỉ có thể xem thông tin của mình');
};

