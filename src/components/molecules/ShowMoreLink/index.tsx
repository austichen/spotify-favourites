import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import Link from '../../atoms/Link'

export interface Props {
    onClick?: () => void
}

const onLinkClick = (showLess : boolean, setShowLess: any, onClick : () => void) => {
    setShowLess(!showLess)
    onClick()
}

const ShowMoreLink = ({onClick = () => {}} : Props) => {
    const [showLess, setShowLess] = useState<boolean>(false)
    return <div className='show-more-link'><Link onClick={() => onLinkClick(showLess, setShowLess, onClick)}><FontAwesomeIcon icon={showLess ? faChevronUp : faChevronDown}/> {showLess ? 'Show less' : 'Show more'}</Link></div>
}


export default ShowMoreLink;
