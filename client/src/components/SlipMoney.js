import React from 'react';

// mmodule for dynamic button creation
const SlipMoney = (props) => {
  return (
    <div className='slip-money'>
      <div className='slip-risk-money'>
        <label>TO RISK</label>
        <br />
        <br />
        <input type='text' className='slip-to-lose' value={props.toLose} placeholder={props.toLose} onChange={(event) => props.onChange(event.target.value, props.slipData)} />
        {/* <Input
          // onChange={(event) => handleChange(event.target.value, props.data.slipData)}
          onChange={(e) => props.onChange(e, props.data)}
          // onChange={props.onChange}
          className='slip-to-lose'
          type='text'
          value={props.toLose}
          // placeholder={props.value}
        />  */}
      </div> 
      <div className='slip-win-money'>
        <label>TO WIN</label>
        <br />
        <br />
        {/* <Input
          className='slip-to-win'
          type='text'
          // value={props.onChange}
        /> */}
        <div className='slip-to-win'>{props.toWin}</div>
      </div>
    </div>
  );
};

export default SlipMoney;
