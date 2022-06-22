import {useCallback} from 'react';
import {useSharedValue} from 'react-native-reanimated';

export function useLayout() {
  const y = useSharedValue(0);
  const x = useSharedValue(0);
  const width = useSharedValue(0);
  const height = useSharedValue(0);

  const onLayout = useCallback((e: any) => {
    const {
      nativeEvent: {
        layout: {height: _height, width: _width, x: _x, y: _y},
      },
    } = e;
    x.value = _x;
    y.value = _y;
    width.value = _width;
    height.value = _height;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    x,
    y,
    width,
    height,
    onLayout,
  };
}
