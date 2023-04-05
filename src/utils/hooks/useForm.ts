import { useState } from "react";
import { TInputEvent } from '../../types/types';

// type TInputValues = {
//   name?: string,
//   email?: string,
//   password?: string,
//   token?: string,
// }

const useForm = (inputValues: any) => {
  const [values, setValues] = useState(inputValues);
  const handleChange = (e:TInputEvent) => {
    const { value, name } = e.target as Partial<{value: string, name: string}>;
    if (name) {
      setValues({ ...values, [name]: value });
    }
  };

  return { values, handleChange, setValues };
};

export default useForm;
