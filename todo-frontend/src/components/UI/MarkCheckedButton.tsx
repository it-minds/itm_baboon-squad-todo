import { FC } from 'react';
import { BsFillCircleFill, BsFillRecordCircleFill } from 'react-icons/bs';
type Props = {
  checked: boolean;
  onChange: () => void;
};

export const MarkCheckedButton: FC<Props> = ({ checked, onChange }) => {
  return (
    <button className="w-5" onClick={onChange}>
      {checked ? <BsFillCircleFill /> : <BsFillRecordCircleFill />}
    </button>
  );
};
