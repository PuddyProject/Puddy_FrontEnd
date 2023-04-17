import { createPortal } from 'react-dom';

interface ModalProps {
  className?: string;
  children: React.ReactNode;
  closeModal: () => void;
}

export default function Modal({ children, closeModal, className }: ModalProps) {
  const onClickModalBox = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return createPortal(
    <div className='modal-bg' onClick={closeModal}>
      <div className='modal-container'>
        <div className={`modal-box ${className}`} onClick={onClickModalBox}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
