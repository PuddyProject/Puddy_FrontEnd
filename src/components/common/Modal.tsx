import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  closeModal: () => void;
}

export default function Modal({ children, closeModal }: ModalProps) {
  const onClickModalBox = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return createPortal(
    <div className='modal-bg' onClick={closeModal}>
      <div className='modal-container'>
        <div className='modal-box' onClick={onClickModalBox}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
