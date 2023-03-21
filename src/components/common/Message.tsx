interface MessageProps {
  message?: string;
  isWarning?: boolean;
}

export default function Message({ message, isWarning }: MessageProps) {
  return <strong className={`${isWarning ? 'warning-message' : ''}`}>{message}</strong>;
}
