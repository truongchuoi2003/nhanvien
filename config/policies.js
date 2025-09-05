/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  // Mặc định yêu cầu đăng nhập
  '*': 'is-logged-in',  // Tất cả các controller/action đều yêu cầu đăng nhập

  // UserController
  UserController: {
    // Super Admin có quyền CRUD và xem tất cả thông tin (bao gồm cả admin và user)
    create: 'isSuperAdmin', 
    update: 'isSuperAdmin',
    destroy: 'isSuperAdmin',
    find: 'isSuperAdmin',
    findOne: 'isSuperAdmin',

    // Admin chỉ có quyền CRUD khách hàng
    createCustomer: 'isAdmin', 
    updateCustomer: 'isAdmin', 
    deleteCustomer: 'isAdmin', 
    findCustomer: 'isAdmin', 

    // User chỉ có thể xem thông tin của chính mình
    viewProfile: 'isUserSelf', 
  },

  // CustomerController
  CustomerController: {
    // Super Admin có quyền CRUD tất cả khách hàng
    create: 'isSuperAdmin',
    update: 'isSuperAdmin',
    destroy: 'isSuperAdmin',
    find: 'isSuperAdmin',
    findOne: 'isSuperAdmin',

    // Admin có quyền CRUD danh sách khách hàng
    create: 'isAdmin',
    update: 'isAdmin',
    destroy: 'isAdmin',
    find: 'isAdmin',
    findOne: 'isAdmin',

    // User không có quyền quản lý khách hàng
    // (có thể thêm nếu cần cho User truy cập một số dữ liệu khách hàng của chính mình)
  },

  // Policy cho SuperAdmin
  isSuperAdmin: async function (req, res, proceed) {
    if (!req.me || req.me.role !== 'superadmin') {
      return res.forbidden('Bạn không có quyền thực hiện hành động này');
    }
    return proceed();
  },

  // Policy cho Admin
  isAdmin: async function (req, res, proceed) {
    if (!req.me || (req.me.role !== 'superadmin' && req.me.role !== 'admin')) {
      return res.forbidden('Bạn không có quyền thực hiện hành động này');
    }
    return proceed();
  },

  // Policy cho User
  isUserSelf: async function (req, res, proceed) {
    if (!req.me) {
      return res.forbidden('Bạn chưa đăng nhập');
    }

    // Nếu là Admin hoặc Super Admin, họ có thể xem thông tin của tất cả người dùng
    if (req.me.role === 'admin' || req.me.role === 'superadmin') {
      return proceed();
    }

    // Nếu là User thì chỉ xem thông tin của chính mình
    if (req.me.id === req.param('id')) {
      return proceed();
    }

    return res.forbidden('Bạn chỉ có thể xem thông tin của mình');
  },
};
