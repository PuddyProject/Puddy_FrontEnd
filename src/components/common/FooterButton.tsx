interface FooterButtonProps {
  children?: string;
}
export default function FooterButton({ children }: FooterButtonProps) {
  return <button className='footer-button'>{children}</button>;
}
