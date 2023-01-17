import React from 'react';

// module for dynamic input creation
const Input = (props) => {
  return (
    <input
      onClick={props.onClick}
      onChange={props.onChange}
      // onRemove={props.onRemove}
      className={props['className']}
      id={props['id']}
      type={props['type']}
      placeholder={props['placeholder']}
      // value={props['value']}
      value={!isNaN(props['value']) ? props['value'] : '0'}
      data = {props['data']}
    />
  );
};

export default Input;
