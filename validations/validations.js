import { body } from "express-validator";

export const registerValidator = [
  body("username", "Имя должно содержать не менее 2 символов").isLength({
    min: 2,
  }),
  body("email", "Введите корректный email").isEmail(),
  body("passwordHash", "Пароль должен содержать минимум 4 символа").isLength({
    min: 4,
  }),
  body("avatarUrl", "Введите корректный URl").optional().isURL(),
];

export const loginValidation = [
  body("email", "Введите корректный email").isEmail(),
  body("passwordHash", "Пароль должен содержать минимум 4 символа").isLength({
    min: 4,
  }),
];
export const postValidation = [
  body("title", "Введите заголовок статьи.").isLength({ min: 3 }).isString(),
  body("text", "Введите текст статьи.").isLength({ min: 5 }).isString(),
  body("tags", "Неверный формат тэгов (укажите массив)").optional().isString(),
  body("imageUrl", "Неверная ссылка на изображение.").optional().isString(),
];
