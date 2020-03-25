import React from 'react';
import Link from '../../atoms/Link'
import {CLIENT_ID} from '../../../utils/constants'

import './LoginButton.css'

const LOGIN_URL_BASE = 'https://accounts.spotify.com/authorize'
const RESPONSE_TYPE = 'token'
const REDIRECT_URI = process.env.REACT_APP_ENV === 'prod' ? `https://${window.location.host}/` : 'http://localhost:3000/'
const SCOPE = 'user-top-read'
const SHOW_DIALOG = 'true'

const loginUrl = encodeURI(`${LOGIN_URL_BASE}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&show_dialog=${SHOW_DIALOG}`)

const LoginButton = () => {
  return <Link className='login-button' url={loginUrl}>Login</Link>
}


export default LoginButton;
