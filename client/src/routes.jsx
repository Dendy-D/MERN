import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LinksPage from './pages/links-page/LinksPage'
import CreatePage from './pages/create-page/CreatePage'
import DetailPage from './pages/detail-page/DetailPage'
import AuthPage from './pages/auth-page/AuthPage'

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path='/links' exact>
          <LinksPage />
        </Route>
        <Route path='/create' exact>
          <CreatePage />
        </Route>
        <Route path='/detail/:id'>
          <DetailPage />
        </Route>
        <Redirect to='/create' /> {/* Если по какой то причине мы не попали на какой то определенный Route то делаем редирект на страницу /create */}
      </Switch>
    )
  }

  return (
  <Switch>
    <Route path='/' exact>
      <AuthPage/>
    </Route>
    <Redirect to='/' />
  </Switch>
  )
}
