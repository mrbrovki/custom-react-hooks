import { useState } from 'react';

type Mode = 'light' | 'dark';
interface HookReturn<T> {mode: T, changeMode: Function};
type HookFn<T> = (initialMode: T) => (HookReturn<T>);

const useColorMode:HookFn<Mode> = (initialMode) => {
  const [mode, setMode] = useState(initialMode);

  const changeMode = () =>{
   setMode(prev =>  prev = prev === 'light' ? 'dark' : 'light');
  };
 return {mode, changeMode};
};

export default useColorMode;
