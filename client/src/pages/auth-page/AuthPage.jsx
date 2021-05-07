import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'

import './auth.css'

const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, request, error, clearError } = useHttp()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = (event) => {
    // Обрабатываем нашу форму
    setForm({ ...form, [event.target.name]: event.target.value }) // Из за того что это объект, мы сначала разворачиваем наш объект form с помощью оператора spred. И потом определяем какое именно поле мы меняем
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      message(data.message)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        {/*Если всего 12 столбцов, а содержимое 6 столбцов, то если мы сместим все на 3 столбца это приведет к центрированию содержимого*/}
        <h1>Shortening links</h1>
        <div className='card light-blue lighten-2'>
          <div className='card-content white-text'>
            <span className='card-title head'>Authorization</span>

            <div className='input-field'>
              <input
                placeholder='Input email'
                id='email'
                type='email'
                className='validate'
                name='email'
                // value={form.email}
                onChange={changeHandler}
              />
              <label htmlFor='email'>Email</label>
            </div>

            <div className='input-field'>
              <input
                placeholder='Input password'
                id='password'
                type='password'
                className='validate'
                name='password'
                // value={form.password}
                onChange={changeHandler}
              />
              <label htmlFor='email'>Password</label>
            </div>
          </div>
          <div className='card-action'>
            <button
              className='btn  sign-in'
              disabled={loading}
              onClick={loginHandler}
            >
              Sign in
            </button>
            <button
              className='btn light-blue lighten-2 black-text sign-up'
              onClick={registerHandler}
              disabled={loading}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
