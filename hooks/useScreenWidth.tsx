import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export function useScreenWidth() {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const onChange = ({ window }: { window: { width: number; height: number } }) => {
      setScreenWidth(window.width);
    };

    const subscription = Dimensions.addEventListener('change', onChange);

    return () => {
      subscription.remove();
    };
  }, []);

  return screenWidth;
}
