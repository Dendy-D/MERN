import { createContext } from 'react'

function noop() {} // Создаем пустую функцию, чтобы присвоить ее login и logout

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
})
