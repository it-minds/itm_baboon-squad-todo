import { FC } from "react";
import * as React from 'react';

type Props = {
  OnRenameClick: () => void;
};


export const RenameSubtaskButton: React.FC<Props>=({ OnRenameClick})=>{
  return(
<button className="border-2 text-5xl mx-20 text-blue-900 "  onClick={OnRenameClick}
     >
Rename this subtask
</button>
  );
}
