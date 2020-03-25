import React, {useState, useEffect} from 'react';
import { LoginPage, ResultsPage } from './pages';
import {parseUrlHash} from './utils/helpers'
import {IAccessTokenInfo} from './utils/constants'
import './App.css';


const getTokenInfo = (): IAccessTokenInfo => {
    const {access_token, expires_in} = parseUrlHash(window.location.hash)
    return {
      accessToken: access_token,
      expiryTimestamp: Date.now() + expires_in * 1000
    }
}

const cleanHashFromHistory = () => {
  if (window.location.hash) {
    window.history.replaceState({}, 'title', '/')
  }
}


const App : React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  useEffect(() => {
    if (window && window.opener) { // is a popup
      window.opener.onLogin()
    }
  }, [])

  const onLoginSuccess = (accessToken : IAccessTokenInfo) => {
    setIsLoggedIn(true)
    setAccessToken(accessToken.accessToken)
  }

  return isLoggedIn && accessToken ? <ResultsPage accessToken={accessToken} /> : <LoginPage loginSuccessCallback={onLoginSuccess}/>
}

export default App;
