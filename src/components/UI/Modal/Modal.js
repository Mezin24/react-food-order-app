import classes from './Modal.module.css';
import ReactDOM from 'react-dom';

const Backdrop = (props) => <div className={classes.backdrop}></div>;
const ModalOverlay = (props) => (
  <div className={classes.modal}>
    <div className={classes.content}>{props.children}</div>
  </div>
);

const Modal = (props) => {
  const portalElement = document.getElementById('modal-root');
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
