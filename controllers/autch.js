import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isUserRegister = await User.findOne({ username });

    if (isUserRegister) {
      return res.json({
        message: "Пользователь с таким именем уже зарегистрирован.",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hash,
    });

    await newUser.save();

    return res.json({ newUser, message: "Регистрация прошла успешно!" });
  } catch (error) {
    return res.json({
      message: "Ошибка при регистрации пользователя. Попробуйте зайти позднее",
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.json({
        message: "Пользователя с таким именем не существует.",
      });
    }

    const passwordHash = await bcrypt.compare(password, user.password);

    if (!passwordHash) {
      return res.json({
        message: "Пароль не верный.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },

      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );
    res.json({
      token,
      user,
      message: "Вы успешно вошли в систему.",
    });
  } catch (error) {
    return res.json({
      message: "Ошибка входа. Попробуйте зайти позднее",
    });
  }
};

// Получение пользователя чтобы после перезагрузки страницы не логиниться заново
export const userme = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({
        message: "Такого пользователя не существует.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },

      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );

    res.json({
      user,
      token,
    });
  } catch (error) {
    return res.json({
      message: "Ошибка доступа.",
    });
  }
};
