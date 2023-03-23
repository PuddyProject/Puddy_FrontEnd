interface FooterButtonProps {
  children?: string;
  onClick?: () => void;
}
export default function FooterButton({ children, onClick }: FooterButtonProps) {
  return (
    <button className='footer-button' onClick={onClick}>
      {children}
    </button>
  );
}
