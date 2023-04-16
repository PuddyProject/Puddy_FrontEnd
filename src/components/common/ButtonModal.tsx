import Button from './Button';
import Modal from './Modal';

interface ButtonModalProps {
  text: string;
  subText: string;
  cancleText: string;
  confirmText: string;
  closeModal: () => void;
  onCancle: () => void; // 왼쪽 버튼
  onConfirm: () => void; // 오른쪽 버튼
}

export default function ButtonModal({
  text,
  subText,
  cancleText,
  confirmText,
  onCancle,
  onConfirm,
  closeModal,
}: ButtonModalProps) {
  return (
    <Modal closeModal={closeModal}>
      <div className='button-modal-container'>
        <h3 className='title-text'>{text}</h3>
        <p className='sub-text'>{subText}</p>
        <div className='btn-container'>
          <Button onClick={onCancle} width='120px' outline>
            {cancleText}
          </Button>
          <Button onClick={onConfirm} width='120px'>
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
