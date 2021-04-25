import React from 'react'

import './auth.css'

const AuthPage = () => {
  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        {/*Если всего 12 столбцов, а содержимое 6 столбцов, то если мы сместим все на 3 столбца это приведет к центрированию содержимого*/}
        <h1>Hello</h1>
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
              />
              <label htmlFor='email'>Password</label>
            </div>
          </div>
          <div className='card-action'>
            <button className='btn  sign-in'>Sign in</button>
            <button className='btn light-blue lighten-2 black-text sign-up'>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
