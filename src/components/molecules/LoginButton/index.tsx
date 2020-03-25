import React from 'react';
import Link from '../../atoms/Link'
import {CLIENT_ID, IAccessTokenInfo} from '../../../utils/constants'
import {parseUrlHash} from '../../../utils/helpers'

import './LoginButton.css'

const LOGIN_URL_BASE = 'https://accounts.spotify.com/authorize'
const RESPONSE_TYPE = 'token'
const REDIRECT_URI = process.env.REACT_APP_ENV === 'prod' ? `https://${window.location.host}/` : 'http://localhost:3000/'
const SCOPE = 'user-top-read'
const SHOW_DIALOG = 'true'

const loginUrl = encodeURI(`${LOGIN_URL_BASE}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&show_dialog=${SHOW_DIALOG}`)

let popup : Window | null

declare global {
  interface Window {
    onLogin : () => void
  }
}

interface Props {
  loginCallback : (success: boolean, accessToken?: IAccessTokenInfo) => void
}

const checkLoggedIn = (): boolean => {
  if (popup && popup.location.hash) {
    const {access_token, token_type, expires_in} : {access_token: string | null, token_type: string | null, expires_in : number | null} = parseUrlHash(popup.location.hash)
    if (access_token && token_type && expires_in) {
      return true;
    }
  }
  return false;
}

const getTokenInfo = (popup: Window): IAccessTokenInfo => {
  const {access_token, expires_in} = parseUrlHash(popup.location.hash)
  return {
    accessToken: access_token,
    expiryTimestamp: Date.now() + expires_in * 1000
  }
}


const LoginButton = ({loginCallback} : Props) => {
  const openLoginPopup = () => {
    popup = window.open(loginUrl, 'Login with Spotify', 'width=800,height=600')
    window.onLogin = () => {
      const isLoggedIn = checkLoggedIn()
      if (popup && isLoggedIn) {
        popup.close()
        loginCallback(isLoggedIn, getTokenInfo(popup))
      } else {
        loginCallback(false)
      }
    }
  }

  return <Link className='login-button' onClick={openLoginPopup}>Login</Link>
}


export default LoginButton;
