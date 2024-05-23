import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  paddingBottom: '25px',
  backgroundColor: 'rgb(255,255,255)',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '80vh',
  width: '680px',
  borderRadius: '15px',
};

const MODAL_STYLES_MOBILE = {
  ...MODAL_STYLES,
  width: '325px',
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1000,
};

const CLOSE_BUTTON_STYLES = {
  width: '30px',
  height: '30px',
  marginLeft: '88%',
  marginTop: '3%',
  borderRadius: '50%',
  fontSize: '20px',
  fontWeight: '600',
  border: 'none',
  color: 'white',
  backgroundColor: 'black',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function Modal({ children, onClose }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 750);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 750);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={onClose} />
      <div style={isMobile ? MODAL_STYLES_MOBILE : MODAL_STYLES}>
        <button
          className='cancel-btn'
          style={CLOSE_BUTTON_STYLES}
          onClick={onClose}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  );
}

export default Modal;
