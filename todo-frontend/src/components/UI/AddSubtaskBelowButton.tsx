import { FC } from "react";
import * as React from 'react';

type Props = {
    onClick: () => void;
};


export const AddSubtaskBelowButton: React.FC<Props>=({ onClick})=>{
  return(
<button className="border-2 text-5xl mx-20 text-blue-900 align-text-botton height-"  onClick={onClick}
     >
      Add a new subtask below
</button>
  );
}
