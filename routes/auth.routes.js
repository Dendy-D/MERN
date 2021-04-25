const { Router } = require('express') // Подключаем Router из express
const router = Router() // Создаем сам router
const config = require('config') // Библиотека наших констант (создаем json файл и оттуда берем наши константы с помощью метода config.get)
const jwt = require('jsonwebtoken') // Подключаем библиотеку jsonwebtoken предназначенную для безопастности при аунтефикации пользователя
const bcrypt = require('bcryptjs') // Подключаем библиотеку по хешированию паролей bcrypt
const User = require('../models/User') // Подключаем нашу модель User из файла User.js
const { check, validationResult } = require('express-validator') // Подклчаем метод check и функцию validationResult из библиотеки express-validator для валидации данных

// /api/auth/register
router.post(
  '/register',
  [
    // Массив midlwares для валидации наших данных
    check('email', 'Uncorrectly email').isEmail(), // Проверяем что наш email это именно email
    check('password', 'Minimum password length is 8 symbols').isLength({
      // Проверяем длину пароля
      min: 8,
      max: 16,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req) // Обрабатываем нашу валидацию

      if (!errors.isEmpty) {
        // Проверка на успешное завершение валидации
        return res.status(400).json({
          // Отправляем ошибку на front-end
          errors: errors.array(),
          message: 'Uncorretly registration data',
        })
      }

      const { email: email, password: password } = req.body // Получаем email и password из объекта req.body

      const candidate = await User.findOne({ email: email }) // Проверяем есть ли email в базе

      if (candidate) {
        return res.status(400).json({ message: 'This User already existing' }) // Если такой email уже есть мы викидываем ошибку и стопаем скрипт
      }

      const hashedPassword = await bcrypt.hash(password, 12) // Хешируем пароль, который мы получили из фронтенда
      const user = new User({ email, password: hashedPassword }) // Создаем нового пользователя с email: email и password: наш захешированный пароль

      await user.save() // Ждем пока пользователь сохранится

      res.status(201).json({ message: 'User is created' }) // Возвращаем фронтенду сообщение что пользователь создан
    } catch (e) {
      res.status(500).json({ message: 'Something wrong' }) // Если что то пошло не так то выкинется ошибка
    }
  }
)

// /api/auth/login
router.post(
  '/login',
  [
    // Массив midlwares для валидации данных
    check('email', 'Input correct email').normalizeEmail().isEmail(), // Проверям email
    check('password', 'Input passwort').exists(), // С помощью метода exists() проверяем, существет ли пароль
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req) // Обрабатываем нашу валидацию

      if (!errors.isEmpty) {
        // Проверка на успешное завершение валидации
        return res.status(400).json({
          // В случае ошибки, выкидываем ее в front-end
          errors: errors.array(),
          message: 'Uncorretly login details',
        })
      }

      const { email, password } = req.body // Получаем email и password из объекта req.body

      const user = await User.findOne({ email }) // Проверяем если ли такой пользователь по email

      if (!user) {
        // Если такого пользователя нет, то выкмдываем ошибку в front-end
        return res.status(400).json({ message: 'User is not found' })
      }

      //Проверяем совпадают ли пароли, метод compare позволяет сравнивать захешированные пароли
      const isMatch = await bcript.compare(password, user.password)

      if (!isMatch) {
        // В случае неверного пароля выкидываем ошибку в front-end
        return res.status(400).json({ message: 'Wrong password, try again' })
      }

      const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
        // Создаем наш jwt с userId, секретной строкой и временем до конца существования (желательно указывать плюс минус 1 час)
        expiresIn: '1h',
      })

      res.json({ token, userId: user.id }) // Отвечаем пользователю (статус не указываем, так как по умолчанию он 200) и передаем token и userId

      res.status(500).json({ message: 'Something wrong' })
    } catch (e) {
      res.status(500).json({ message: 'Something wrong' }) // Если что то пошло не так, выкенется ошибка
    }
  }
)

module.exports = router // Из модуля экспортируем наш объект router
