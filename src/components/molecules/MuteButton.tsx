import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import Link from '../atoms/Link'

type MuteButtonCallbackType = (isMuted : boolean) => void

export interface Props {
    hoverAction?: 'dim' | 'opaque'
    onClick?: MuteButtonCallbackType
}

const onMuteButtonClick = (isMuted : boolean, setIsMuted : any, onClick : MuteButtonCallbackType) => {
    onClick(isMuted)
    setIsMuted(!isMuted)
}

const MuteButton = ({onClick = () => {}, hoverAction = 'dim'} : Props) => {
    const [isMuted, setIsMuted] = useState<boolean>(false)
    return <div className='mute-button'><Link onClick={() => onMuteButtonClick(isMuted, setIsMuted, onClick)} hoverAction={hoverAction}><FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp}/></Link></div>
}

MuteButton.defaultProps = {
    hoverAction: 'dim',
    onClick: () => {}
}


export default MuteButton;
