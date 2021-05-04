const express = require('express') // Подключаем express
const config = require('config') // Библиотека наших констант (создаем json файл и оттуда берем наши константы с помощью метода config.get)
const mongoose = require('mongoose') // Подключаемся к mongodb

const app = express() // Создаем наш сервер

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes')) // Подключаем наши роуты

const PORT = config.get('port') || 5000 // Берем наш порт из json где хранятся константы (config) и с помощью метода get берем нашу необходимую константу и если ее там нет то по дефолту ставим 5000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      // Подкючаемся к mongodb, берем переменную из нашего конфига с помощью метода get, и вторым параметром передаем объект с необходимыми опциями для успешной работы метода connect
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    app.get('/', (req, res) => {
      // Тестовая функция
      res.send('<h1>Server is running</h1>')
    })
    app.listen(PORT, () => {
      // Запускаем сервер на PORT
      console.log(`App has been started on port ${PORT}...`) // Выводим оповещение в консоль
    })
  } catch (e) {
    console.log('Server Error', e.message) // Выводим сообщение об ошибке
    process.exit(1) // Завершаем наш процесс, если что то пошло не так
  }
}

start() // Запускаем нашу функцию
