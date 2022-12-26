import ReactModal from 'react-modal';
import classes from './Modal.module.scss';

ReactModal.setAppElement('#root');

interface ModalProps {
  isOpen: boolean;
  close?: () => void;
  children?: React.ReactNode;
  title?: string;
  border?: string;
}

export default function Modal(props: ModalProps) {
  const styles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      minWidth: '300px',
      width: '30%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '5px',
      padding: '30px',
      fontFamily: 'Nunito',
      backgroundColor: '#050505',
      border: props.border ? props.border : 'solid 1px #00FFC2',
    },
    overlay: {
      backgroundColor: 'rgba(10, 10, 10, .8)',
      backdropFilter: 'blur(4px)',
    },
  };

  return (
    <ReactModal isOpen={props.isOpen} style={styles} onRequestClose={props.close && props.close}>
      <div className={props.title ? `${classes.header}` : `${classes.d_none}`}>
        <p className={classes.modalTitle}>{props.title}</p>
      </div>
      <div className={classes.content}>{props.children}</div>
    </ReactModal>
  );
}
