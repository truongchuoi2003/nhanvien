module.exports = async function (req, res, proceed) {
  if (!req.me) {
    return res.forbidden('Bạn chưa đăng nhập');
  }

  // Admin và Super Admin có thể truy cập mọi thông tin người dùng
  if (req.me.role === 'admin' || req.me.role === 'superadmin') {
    return proceed();
  }

  // User chỉ được phép xem thông tin của chính mình
  if (req.me.id === req.param('id')) {
    return proceed();
  }

  return res.forbidden('Bạn chỉ có thể xem thông tin của mình');
};
