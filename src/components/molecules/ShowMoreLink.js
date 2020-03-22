import React, {useState} from 'react';
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import Link from '../atoms/Link'
import './ShowMoreLink.css'

const onLinkClick = (showLess, setShowLess, onClick) => {
    setShowLess(!showLess)
    onClick()
}

function ShowMoreLink({onClick}) {
    const [showLess, setShowLess] = useState(false)
    return <div className='show-more-link'><Link onClick={() => onLinkClick(showLess, setShowLess, onClick)}><FontAwesomeIcon icon={showLess ? faChevronUp : faChevronDown}/> {showLess ? 'Show less' : 'Show more'}</Link></div>
}

ShowMoreLink.defaultProps = {
    onClick: () => {}
}

ShowMoreLink.propTypes = {
    onClick: PropTypes.func,
}

export default ShowMoreLink;
