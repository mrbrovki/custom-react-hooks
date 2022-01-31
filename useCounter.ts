import { useState } from 'react';

const useCounter = (initialCounter:number) => {
 const [counter, setCounter] = useState(initialCounter);
  const changeCounter = (num:number) =>{
   setCounter(prev => prev + num)
  }
 return {counter, changeCounter}
};

export default useCounter;
