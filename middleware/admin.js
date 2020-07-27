
/*
  Xác thực ủy quyền dựa trên vai trò quyền của User.
*/

module.exports = function (req, res, next) {
  // 401 Unauthorized: Cố gắng truy cập 1 tài nguyên được bảo vệ khi không cung cấp các mã JWT hợp lệ.
  // 403 Forbidden: Bị cấm, không thể truy cập tài nguyên.
  // Kiểm tra xem quyền gì.
  if (!req.user.isAdmin) return res.status(403).send('Access denied.');
  next();
}