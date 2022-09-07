import { FC } from "react";

type Props = {
    checked: boolean
    onChange: () => void;
};

export const MarkCheckedButton: FC<Props> = ({ checked, onChange }) => {
  return <input type="checkbox" className="rounded-full"  checked={checked} onChange={onChange}></input>;
};
