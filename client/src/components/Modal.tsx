import Backdrop from "./Backdrop";
import "./Modal.scss";

const Modal = (props: any): JSX.Element => {
  const closeModal = () => {
    props.closeModal();
  };

  const submitModal = () => {
    props.submitModal();
  };

  return (
    <>
      {props.open ? (
        <>
          <div className="modal-container">
            <div className="modal-title">{props.title}</div>
            <div className="modal-body">{props.children}</div>
            <div className="modal-buttons">
              <button className="modal-cancel" onClick={closeModal}>
                {props.cancel}
              </button>
              <button className="modal-submit" onClick={submitModal}>
                {props.submit}
              </button>
            </div>
          </div>
          <Backdrop closeModal={closeModal} />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
