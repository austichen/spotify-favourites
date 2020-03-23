import * as React from 'react';
import LoginPage from './Pages/Login';
import ResultsPage from './Pages/Results';
import {parseUrlHash} from './Utils/helpers'
import {TOKEN_LOCALSTORE_KEY} from './Utils/constants'
import './App.css';

const {useState, useEffect} = React;

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
  const tokenInfo = window.localStorage.getItem(TOKEN_LOCALSTORE_KEY)
  if (tokenInfo !== null) {
    const {accessToken, expiryTimestamp} : IAccessTokenInfo = JSON.parse(tokenInfo)
    if (accessToken && expiryTimestamp > Date.now()) {
      return true;
    }
  }
  return false;
}

const updateLocalStoreToken = (accessTokenInfo : IAccessTokenInfo) => {
  const currentTokenInfo = window.localStorage.getItem(TOKEN_LOCALSTORE_KEY)
  if (currentTokenInfo === null) {
    window.localStorage.setItem(TOKEN_LOCALSTORE_KEY, JSON.stringify(accessTokenInfo))
    return;
  }
  if (currentTokenInfo === null || JSON.parse(currentTokenInfo).accessToken !== accessTokenInfo.accessToken) {
    window.localStorage.setItem(TOKEN_LOCALSTORE_KEY, JSON.stringify(accessTokenInfo))
  }
}

const getTokenInfo = (): IAccessTokenInfo => {
  if (window.location.hash) {
    const {access_token, expires_in} = parseUrlHash(window.location.hash)
    return {
      accessToken: access_token,
      expiryTimestamp: Date.now() + expires_in * 1000
    }
  } else {
    const tokenInfo = window.localStorage.getItem(TOKEN_LOCALSTORE_KEY)
    if (tokenInfo === null) {
      throw new Error('Unable to retrieve token from local storage')
    }
    return JSON.parse(tokenInfo)
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
      updateLocalStoreToken(accessTokenInfo)
      setAccessToken(accessTokenInfo.accessToken)
    }
  }, [])

  return isLoggedIn && accessToken ? <ResultsPage accessToken={accessToken} /> : <LoginPage />
}

export default App;
