import React, {useState} from 'react';
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import Link from '../atoms/Link'

const onMuteButtonClick = (isMuted, setIsMuted, onClick) => {
    onClick(isMuted)
    setIsMuted(!isMuted)
}

function MuteButton({onClick}) {
    const [isMuted, setIsMuted] = useState(false)
    return <div className='mute-button'><Link onClick={() => onMuteButtonClick(isMuted, setIsMuted, onClick)}><FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp}/></Link></div>
}

MuteButton.defaultProps = {
    onClick: () => {}
}

MuteButton.propTypes = {
    onClick: PropTypes.func,
}

export default MuteButton;
