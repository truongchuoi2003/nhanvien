/**
 * is-logged-in
 *
 * A simple policy that allows any request from an authenticated user.
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */
module.exports = async function (req, res, proceed) {
  if (!req.me || (req.me.role !== 'superadmin' && req.me.role !== 'admin')) {
    return res.forbidden('Bạn không có quyền thực hiện hành động này');
  }
  return proceed();
};