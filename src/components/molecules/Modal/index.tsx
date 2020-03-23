import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './Modal.css'

interface Props {
    isOpen : boolean
    onClose? : (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void
    children: any
}

const _Modal = ({isOpen, onClose, children} : Props) => {
  return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className='modal'
        open={isOpen}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className='modal-content'>
            {children}
          </div>
        </Fade>
      </Modal>
  );
}

export default _Modal
