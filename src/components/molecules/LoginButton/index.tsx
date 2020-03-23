import React from 'react';
import Link from '../../atoms/Link'
import {CLIENT_ID} from '../../../utils/constants'

import './LoginButton.css'

const LOGIN_URL_BASE = 'https://accounts.spotify.com/authorize'
const RESPONSE_TYPE = 'token'
const REDIRECT_URI = process.env.REACT_APP_ENV === 'prod' ? process.env.REACT_APP_PROD_URL : 'http://localhost:3000/'
const SCOPE = 'user-top-read'

const loginUrl = encodeURI(`${LOGIN_URL_BASE}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`)

const LoginButton = () => {
  return <Link className='login-button' url={loginUrl}>Login</Link>
}


export default LoginButton;
