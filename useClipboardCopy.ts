import { useState } from 'react';

type CopiedText = string | undefined;
type Copy = (value: string) => Promise<boolean>

const useClipboardCopy = ():[CopiedText, Copy] => {
  const [copiedText, setCopiedText] = useState<CopiedText>(undefined);

  const copy:Copy = async (value) => {
    try{
      await navigator.clipboard.writeText(value);
      setCopiedText(value);
      return true;
    }catch(err){
      console.log(err);
     return false;
    }
   };
  return [copiedText, copy];
};
export default useClipboardCopy;
