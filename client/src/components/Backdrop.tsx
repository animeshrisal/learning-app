
import "./Backdrop.scss";

const Backdrop = (props: any): JSX.Element => {

  const handleClose = () => {
    props.closeModal();
  }
  return (
    <div onClick={handleClose} className="modal-backdrop" />
  );
};

export default Backdrop;
