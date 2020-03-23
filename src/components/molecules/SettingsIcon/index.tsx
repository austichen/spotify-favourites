import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import Link from '../../atoms/Link'

interface Props {
    hoverAction?: 'dim' | 'opaque'
    onClick?: () => void
}


const SettingsIcon = ({onClick = () => {}, hoverAction = 'dim'} : Props) => {
    return <div className='settings-icon'><Link onClick={onClick} hoverAction={hoverAction}><FontAwesomeIcon icon={faCog}/></Link></div>
}

export default SettingsIcon;
