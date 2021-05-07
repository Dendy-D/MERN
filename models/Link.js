const {Schema, model, Types} = require('mongoose') // Берем Schema, model и Types из mongoose

const schema = new Schema({ // Создаем schema через конструктор класса Schema
 from: {type: String, required: true},
 to: {type: String, required: true, unique: true},
 code: {type: String, required: true, unique: true},
 date: {type: Date, default: Date.now},
 clicks: {type: Number, default: 0},
 owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Link', schema) // Экспортируем из модуля результат работы функции model. Первым параметром передаем название нашей модели, а вторым схему по которой она работает