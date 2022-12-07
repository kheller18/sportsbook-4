import React from 'react';

// mmodule for dynamic button creation
const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={props['className']}
      id={props['id']}
      style={props['style']}
      value={props['value']}
      data = {props['data']}
      type={props['type']}
      line = {props['line']}
      odds = {props['odds']}
      slipid = {props['slipid']}
      // key={props['key']}
    >
      {props.children}
    </button>
  );
};

export default Button;
