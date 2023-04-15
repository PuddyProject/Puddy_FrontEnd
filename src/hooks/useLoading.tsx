import { useState } from 'react';

export default function useLoading() {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => {
    setIsLoading(() => true);
  };

  const hideLoading = () => {
    setIsLoading(() => false);
  };

  return { isLoading, showLoading, hideLoading };
}
