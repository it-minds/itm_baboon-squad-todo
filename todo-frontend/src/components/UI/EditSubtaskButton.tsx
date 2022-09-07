import { FC } from "react";
import * as React from 'react';

type Props = {
    onClick: () => void;
};


export const EditSubtaskButton: React.FC<Props>=({ onClick})=>{
  return(
<button className="border-2 text-5xl mx-20 text-blue-900 align-text-botton height-"  onClick={onClick}
     >
Edit this subtask
</button>
  );
}
