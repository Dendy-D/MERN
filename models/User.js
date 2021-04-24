const {Schema, model, Types} = require('mongoose') // Берем Schema, model и Types из mongoose

const schema = new Schema({ // Создаем schema через конструктор класса Schema
  email: {type: String, required: true, unique: true}, // Обязательное, уникальное поле email(не может быть одинаковым для разных пользователей) строкового типа
  password: {type: String, required: true}, // Обязательное поле password строгового типа
  links: [{type: Types.ObjectId, ref: 'Link'}] // Массив ссылок
})

module.export = model('User', schema) // Экспортируем из модуля результат работы функции model. Первым параметром передаем название нашей модели, а вторым схему по которой она работает