import React, {useState, useEffect} from 'react';
import { LoginPage, ResultsPage } from './pages';
import {parseUrlHash} from './utils/helpers'
import {TOKEN_LOCALSTORE_KEY} from './utils/constants'
import './App.css';

interface IAccessTokenInfo {
  accessToken: string,
  expiryTimestamp: number
}

const checkLoggedIn = (): boolean => {
  if (window.location.hash) {
    const {access_token, token_type, expires_in} : {access_token: string | null, token_type: string | null, expires_in : number | null} = parseUrlHash(window.location.hash)
    if (access_token && token_type && expires_in) {
      return true;
    }
  }
  return false;
}

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
    const loggedIn = checkLoggedIn()
    setIsLoggedIn(loggedIn)
    if (loggedIn) {
      const accessTokenInfo = getTokenInfo()
      cleanHashFromHistory()
      // updateLocalStoreToken(accessTokenInfo) // disable auto-login
      setAccessToken(accessTokenInfo.accessToken)
    }
  }, [])

  return isLoggedIn && accessToken ? <ResultsPage accessToken={accessToken} /> : <LoginPage />
}

export default App;
