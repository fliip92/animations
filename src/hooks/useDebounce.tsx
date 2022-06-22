import {useEffect} from 'react';
import Animated, {useSharedValue} from 'react-native-reanimated';

export function useDebounceAnimatedValue<T>(
  value: T,
  delay: number,
): Animated.SharedValue<T> {
  // State and setters for debounced value
  const debouncedValue = useSharedValue<T>(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        debouncedValue.value = value;
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value, delay], // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}
