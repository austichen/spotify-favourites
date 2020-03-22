import React from 'react';
import SubLabel from '../atoms/SubLabel'
import Link from '../atoms/Link'
import './Footer.css'

const footerStyle = {
    marginBottom: '20px'
}


function Footer() {
    return (
        <div className='footer' style={footerStyle}>
                <Link url='https://github.com/austichen/spotify-favourites' hoverAction='opaque' newTab={true}>
                    <SubLabel>Made by Austin Chen in self isolation <span role='img' aria-label='Mask emoji'>😷</span></SubLabel>
                </Link>
        </div>
    )
}


export default Footer;
