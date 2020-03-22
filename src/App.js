import React, {useState, useEffect} from 'react';
import LoginPage from './Pages/Login';
import ResultsPage from './Pages/Results';
import {parseUrlHash} from './Utils/helpers'
import {TOKEN_LOCALSTORE_KEY} from './Utils/constants'
import './App.css';

const checkLoggedIn = () => {
  if (window.location.hash) {
    const {access_token, token_type, expires_in} = parseUrlHash(window.location.hash)
    if (access_token && token_type && expires_in) {
      return true;
    }
  }
  const tokenInfo = window.localStorage.getItem(TOKEN_LOCALSTORE_KEY)
  if (tokenInfo !== null) {
    const {accessToken, expiryTimestamp} = JSON.parse(tokenInfo)
    if (accessToken && expiryTimestamp > Date.now()) {
      return true;
    }
  }
  return false;
}

const updateLocalStoreToken = accessTokenInfo => {
  const currentTokenInfo = window.localStorage.getItem(TOKEN_LOCALSTORE_KEY)
  if (currentTokenInfo === null || currentTokenInfo.accessToken !== accessTokenInfo.accessToken) {
    window.localStorage.setItem(TOKEN_LOCALSTORE_KEY, JSON.stringify(accessTokenInfo))
  }
}

const getTokenInfo = () => {
  if (window.location.hash) {
    const {access_token, expires_in} = parseUrlHash(window.location.hash)
    return {
      accessToken: access_token,
      expiryTimestamp: Date.now() + expires_in * 1000
    }
  } else {
    return JSON.parse(window.localStorage.getItem(TOKEN_LOCALSTORE_KEY))
  }
}

const cleanHashFromHistory = () => {
  if (window.location.hash) {
    window.history.replaceState({}, 'title', '/')
  }
}


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [accessToken, setAccessToken] = useState(null)

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

  return isLoggedIn ? <ResultsPage accessToken={accessToken} /> : <LoginPage />
}

export default App;
