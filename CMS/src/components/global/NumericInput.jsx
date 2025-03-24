import React from "react";
import { Input } from "antd";

const NumericInput = (props) => {
  const { value, onChange, ref } = props;
  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^\d*(\.\d*)?$/;
    if (reg.test(inputValue)) {
      onChange(inputValue);
    } else {
      onChange("");
    }
  };

  return <Input {...props} onChange={handleChange} ref={ref} />;
};

export default NumericInput;
