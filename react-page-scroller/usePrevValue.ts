// eslint-disable-next-line no-unused-vars
import { useEffect, useRef } from 'react';

export default function usePrevious(value: { [key: string]: any }) {
  const ref = useRef({});

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
