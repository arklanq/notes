import {Dispatch, SetStateAction, useCallback, useMemo, useRef, useState, MutableRefObject} from 'react';

export type BooleanState = [
  boolean,
  {
    setTrue: () => void;
    setFalse: () => void;
    toggle: () => void;
    setValue: Dispatch<SetStateAction<boolean>>;
    setValueTemporarily: (tempValue: boolean, timeout: number) => void;
  }
];

function useBoolean(defaultValue?: boolean): BooleanState {
  const [value, setValue]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(!!defaultValue);
  const tempValueTimeoutId: MutableRefObject<NodeJS.Timeout | null> = useRef<NodeJS.Timeout>(null);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((value: boolean) => !value), []);

  const setValueTemporarily = useCallback(
    (tempValue: boolean, timeout: number): void => {
      // Clear previous timeout
      tempValueTimeoutId.current && clearTimeout(tempValueTimeoutId.current);
      // Set temporary value
      setValue(tempValue);
      // Setup new timeout to revert temporary value
      tempValueTimeoutId.current = setTimeout(() => setValue(value), timeout);
    },
    [tempValueTimeoutId, setValue, value]
  );

  return useMemo(
    () => [value, {setValue, setTrue, setFalse, toggle, setValueTemporarily}],
    [setFalse, setTrue, toggle, value, setValueTemporarily]
  );
}

export default useBoolean;
