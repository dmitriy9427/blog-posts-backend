import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
export const register = async (req, res) => {
  try {
    const password = req.body.passwordHash;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      passwordHash: hash,
      avatarUrl: req.body.avatarUrl,
    });

    const user = await newUser.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token, message: "Регистрация прошла успешно!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Ошибка при регистрации пользователя. Попробуйте зайти позднее.",
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: "Пользователя не существует.",
      });
    }

    const validPassword = await bcrypt.compare(
      req.body.passwordHash,
      user.passwordHash
    );
    if (!validPassword) {
      return res.status(400).json({
        message: "Не верный логин или пароль.",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
      message: "Вы успешно вошли в систему.",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "Ошибка входа.",
    });
  }
};

// Получение пользователя чтобы после перезагрузки страницы не логиниться заново
export const userme = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "Такого пользователя не существует.",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (error) {
    return res.json({
      message: "Ошибка доступа.",
    });
  }
};
