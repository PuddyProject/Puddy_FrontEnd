interface FooterButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function FooterButton({ children, disabled, onClick }: FooterButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className='footer-button'>
      {children}
    </button>
  );
}
