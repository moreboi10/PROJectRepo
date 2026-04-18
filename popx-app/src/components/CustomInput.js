import React from 'react';

const CustomInput = ({
  label,
  type = "text",
  name,
  value,
  onChange
}) => {
  return (
    <div className="floating-group">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "   // ⭐ IMPORTANT FIX
        required
      />
      <label>{label}</label>
    </div>
  );
};

export default CustomInput;