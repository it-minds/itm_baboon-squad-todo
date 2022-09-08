import { FC } from 'react';

type Props = {
  checked: boolean;
  onChange: () => void;
};

export const MarkCheckedButton: FC<Props> = ({ checked, onChange }) => {
  return <input type="checkbox" checked={checked} onChange={onChange}></input>;
};
