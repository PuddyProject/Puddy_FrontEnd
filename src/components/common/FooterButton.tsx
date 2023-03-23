interface FooterButtonProps {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function FooterButton({ children, onClick }: FooterButtonProps) {
  return (
    <button onClick={onClick} className='footer-button'>
      {children}
    </button>
  );
}
