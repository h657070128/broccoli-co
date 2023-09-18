import './Modal.css';

function Modal({children, isOpen}) {

    return (
        <div className={`popup-wrapper fade-in-down ${isOpen ? 'open' : 'hide'}`}>
            <div className="popup">
                <div className="popup-content">
                    {children}
                </div>
            </div>
            <div className='popup-backdrop'></div>
        </div>
    );
}

export default Modal;
