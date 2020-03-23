import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import Link from '../../atoms/Link'

export interface Props {
    isMuted: boolean
    hoverAction?: 'dim' | 'opaque'
    onClick?: () => void
}


const MuteButton = ({isMuted, onClick = () => {}, hoverAction = 'dim'} : Props) => {
    return <div className='mute-button'><Link onClick={onClick} hoverAction={hoverAction}><FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp}/></Link></div>
}

export default MuteButton;
