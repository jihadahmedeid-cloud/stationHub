const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAdminByEmail = (email) => {
  if (email !== process.env.ADMIN_EMAIL) return null;

  return {
    id: "admin-001",
    email: process.env.ADMIN_EMAIL,
    passwordHash: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
    role: "admin",
  };
};

const loginAdmin = async (email, password) => {
  const admin = getAdminByEmail(email);

  if (!admin) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, admin.passwordHash);

  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      id: admin.id,
      role: admin.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  return { token };
};

module.exports = {
  loginAdmin,
};