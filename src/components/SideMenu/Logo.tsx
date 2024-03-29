import { useEffect, useState } from 'react';
import * as React from 'react';

export default function RedoclyLogo(): JSX.Element | null {
  const [isDisplay, setDisplay] = useState(false);

  useEffect(() => {
    setDisplay(true);
  }, []);

  return null;
}
