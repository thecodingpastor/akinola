import dynamic from "next/dynamic";

import classes from "./Confirm.module.scss";

const Modal = dynamic(
  () => {
    return import("../Modals/Modal");
  },
  { ssr: false }
);

const Confirm = ({ show, resourceId, message, onClick, onClose }) => {
  const handleGoAhead = () => {
    if (resourceId) {
      onClick(resourceId);
      onClose();
    } else {
      onClick();
      onClose();
    }
  };
  if (show)
    return (
      <Modal
        onClose={onClose}
        onSubmit={onClick}
        show={show}
        headerContent="Warning!"
        footerclass={classes.Footer}
        footer={
          <div className={classes.Inside}>
            <span onClick={() => onClose()}>Changed my mind</span>
            <span onClick={handleGoAhead}>Go ahead</span>
          </div>
        }
      >
        <div className={classes.Container}>
          <div className={classes.Message}>{message}</div>
        </div>
      </Modal>
    );

  return null;
};

export default Confirm;
