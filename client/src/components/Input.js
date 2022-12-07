import React from 'react';

// mmodule for dynamic input creation
const Input = (props) => {
  // console.log(props);
  return (
    <input
      onClick={props.onClick}
      onChange={props.onChange}
      // onRemove={props.onRemove}
      className={props['className']}
      id={props['id']}
      type={props['type']}
      placeholder={props['placeholder']}
      value={props['value']}
      data = {props['data']}
    />
  );
};

export default Input;
