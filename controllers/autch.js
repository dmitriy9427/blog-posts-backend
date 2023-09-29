import User from "../models/User.js";
import bcrypt, { hash } from "bcryptjs";

// Register
export const register = async (reg, res) => {
  try {
    const { username, password } = reg.body;

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

    const isUser = await User.findOne({ username });

    if (!isUser) {
      return res.json({
        message: "Пользователя с таким именем не существует.",
      });
    }

    const passwordHash = await bcrypt.compare(password, isUser.password);

    if(!passwordHash){
        return res.json({
            message: "Пароль не верный."
        })
    }

    const token = 
  } catch (error) {
    return res.json({
      message: "Ошибка при регистрации пользователя. Попробуйте зайти позднее",
    });
  }
};

// User me
export const userme = async (reg, res) => {
  try {
  } catch (error) {}
};
