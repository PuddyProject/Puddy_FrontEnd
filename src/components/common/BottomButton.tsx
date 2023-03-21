interface BottomButtonProps {
  children?: string;
}
export default function BottomButton({ children }: BottomButtonProps) {
  return <button className='bottom-button'>{children}</button>;
}
