import React, {useEffect} from 'react';
import Button from './Button';
import Input from './Input';
// import SlipMoney from './SlipMoney';
import DropdownButton from './DropdownButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/BetSlip.css';

const BetSlip = (props) => {
  const [slipID, slip] = [props.id, props.data];
  const defaultIcon = 'fas fa-hockey-puck'
  console.log(slip)

  switch(slip.type) {
    case "Straight":
      return (
        <div className='slip-body' key={props.id} id={props.id}>
          <div className='slip-body-top'>
            <div className='slip-type'>Straight</div>
            <Button
              onClick={(e) => props.onRemove(e, slip.betUID[0], slip, props.id)}
              id={props.id}
              type='button'
              className='slip-exit'
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
          <div className='slip-body-main'>
            {slip.slips.keys[`${ slip.betUID[0] }`].betType === 'Moneyline' ?
              <div className='slip-bet-info'><i className={slip.slips.keys[`${ slip.betUID[0] }`].icon}></i>
                &nbsp;{slip.slips.keys[`${ slip.betUID[0] }`].team}&nbsp;<b>ML ({slip.slips.keys[`${ slip.betUID[0] }`].odds.num})</b>
                {/* &nbsp;{slip.slips.keys[`${ slip.betUID[0] }`].team}&nbsp;<b>ML ({slip.slips.keys[`${ slip.betUID[0] }`].odds.num[0] === '-' ? slip.slips.keys[`${ slip.betUID[0] }`].odds.num : `+${slip.slips.keys[`${ slip.betUID[0] }`].odds.num}`})</b> */}
              </div> :
            ''
            }
            {slip.slips.keys[`${ slip.betUID[0] }`].betType === 'Spread' ?
              <div className='slip-bet-info'><i className={slip.slips.keys[`${ slip.betUID[0] }`].icon}></i>&nbsp;{slip.slips.keys[`${ slip.betUID[0] }`].team}&nbsp;
                 <DropdownButton {...props} betType={slip.slips.keys[`${ slip.betUID[0] }`].betType} data={slip} activeLine={{line: slip.slips.keys[`${ slip.betUID[0] }`].line, odds: slip.slips.keys[`${ slip.betUID[0] }`].odds.num}} altLines={slip.slips.keys[`${ slip.betUID[0] }`].alternateLines} />
              </div>
              :
            ''
            }
            {slip.slips.keys[`${ slip.betUID[0] }`].betType === 'TotalOver' ?
              <div className='slip-bet-info'><i className={slip.slips.keys[`${ slip.betUID[0] }`].icon}></i>&nbsp;
              {slip.slips.keys[`${ slip.betUID[0] }`].teams.away} / {slip.slips.keys[`${ slip.betUID[0] }`].teams.home} Over&nbsp;
                 <DropdownButton {...props} betType={slip.slips.keys[`${ slip.betUID[0] }`].betType} data={slip} activeLine={{line: slip.slips.keys[`${ slip.betUID[0] }`].line, odds: slip.slips.keys[`${ slip.betUID[0] }`].odds.num}} altLines={slip.slips.keys[`${ slip.betUID[0] }`].alternateLines} />
              </div>
              :
            ''
            }
            {slip.slips.keys[`${ slip.betUID[0] }`].betType === 'TotalUnder' ?
              <div className='slip-bet-info'><i className={slip.slips.keys[`${ slip.betUID[0] }`].icon}></i>&nbsp;
               {slip.slips.keys[`${ slip.betUID[0] }`].teams.away} / {slip.slips.keys[`${ slip.betUID[0] }`].teams.home} Under&nbsp;
                 <DropdownButton {...props} betType={slip.slips.keys[`${ slip.betUID[0] }`].betType} data={slip} activeLine={{line: slip.slips.keys[`${ slip.betUID[0] }`].line, odds: slip.slips.keys[`${ slip.betUID[0] }`].odds.num}} altLines={slip.slips.keys[`${ slip.betUID[0] }`].alternateLines} />
               </div>
               :
            ''
            }
          </div>
          <div className='slip-money'>
            <div className='slip-risk-money'>$
            {/* <div className='slip-risk-money'><i className="fas fa-dollar-sign"></i> */}
              <Input
                  onChange={(event) => props.onChange(event, slip)}
                  className={!slip.error ? 'slip-to-lose': 'slip-to-lose error'}
                  id={props.id}
                  type='text'
                  value={slip.payout.toLose}
                  placeholder={slip.payout.toLose}
              />
              <br />
              <label>WAGER</label>
            </div>
            <div>
              {/* <div className='slip-odds'>{(slip.payout.odds.american).charAt(0) === '-' ? slip.payout.odds.american : `+${slip.payout.odds.american}`}</div> */}
              <div className='slip-odds'>{slip.payout.odds.american}</div>
              <label>ODDS</label>
            </div>
            <div className='slip-win-money'>
              {/* <div className='slip-to-win'>{`$${slip.payout.toWin}`}</div> */}
              <div className='slip-to-win'>{!isNaN(slip.payout.toWin) ? `$${slip.payout.toWin}` : `$0`}</div>
              <label>PAYOUT</label>
            </div>
          </div>
        </div>
      );

    case "Parlay":
      return (
        <div className='slip-body' key={props.id} id={props.id}>
          <div className='slip-body-top'>
            <div className='slip-type'>Parlay ({Object.keys(slip.slips.keys).length})</div>
            <Button
              onClick={(e) => props.onRemove(e, slip.betUID[0], slip, slipID)}
              id={props.id}
              type='button'
              className='slip-exit'
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
          <div className='slip-body-main'>
            {
              Object.values(slip.slips.keys).map((values, i) => {
                switch(values.betType) {
                  case 'Moneyline':
                    return (
                      <div key={i} className='slip-bet-info'><i className={values.icon}></i>&nbsp;
                        {values.team}&nbsp;<b>ML ({values.odds.num})</b>&nbsp;&nbsp;
                        <Button
                          key={i}
                          onClick={(e) => props.onRemoveMulti(e, slipID, i, slip)}
                          type='button'
                          className='multi-bet-exit'
                          id={i}
                          slipid={slipID}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>
                    );

                  case 'Spread':
                    return (
                      <div key={i} className='slip-bet-info'><i className={values.icon}></i>&nbsp;{values.team}&nbsp;
                        <DropdownButton {...props} betType={values.betType} index={i} data={slip} activeLine={{line: values.line, odds: values.odds.num}} altLines={values.alternateLines} />&nbsp;&nbsp;
                        <Button
                          key={i}
                          onClick={(e) => props.onRemoveMulti(e, slipID, i, slip)}
                          type='button'
                          className='multi-bet-exit'
                          id={i}
                          slipid={slipID}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>
                    );

                  case 'TotalOver':
                    return (
                      <div key={i} className='slip-bet-info'><i className={values.icon}></i>&nbsp;{values.teams.away} / {values.teams.home} Over&nbsp;
                        <DropdownButton {...props} betType={values.betType} index={i} data={slip} activeLine={{line: values.line, odds: values.odds.num}} altLines={values.alternateLines} />&nbsp;&nbsp;
                        <Button
                          key={i}
                          onClick={(e) => props.onRemoveMulti(e, slipID, i, slip)}
                          type='button'
                          className='multi-bet-exit'
                          id={i}
                          slipid={slipID}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>
                    );

                  case 'TotalUnder':
                    return (
                      <div key={i} className='slip-bet-info'><i className={values.icon}></i>&nbsp;{values.teams.away} / {values.teams.home} Under&nbsp;
                        <DropdownButton {...props} betType={values.betType} index={i} data={slip} activeLine={{line: values.line, odds: values.odds.num}} altLines={values.alternateLines} />&nbsp;&nbsp;
                        <Button
                          key={i}
                          onClick={(e) => props.onRemoveMulti(e, slipID, i, slip)}
                          type='button'
                          className='multi-bet-exit'
                          id={i}
                          slipid={slipID}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>
                    );

                  default:
                    console.log('incorrect')
                }
                return (
                  <div></div>
                )
              })
            }
            {(props.addBet === 'true') ?
              <div className='slip-bet-info' id='add-bet-retroactive' onClick={(e) => props.onAddRetroactive(e, slip, slipID)}><i className={defaultIcon}></i>&nbsp;<em>Add another bet</em></div>
            : null
            }
          </div>
          <div className='slip-money'>
            <div className='slip-risk-money'>
              $<Input
                  onChange={(event) => props.onChange(event, slip)}
                  className={!slip.error ? 'slip-to-lose': 'slip-to-lose error'}
                  id={props.id}
                  type='text'
                  value={slip.payout.toLose}
                  placeholder={slip.payout.toLose}
              />
              <br />
              <label>WAGER</label>
            </div>
            <div>
              {/* <div className='slip-odds'>{slip.payout.odds.american}</div> */}
              <div className='slip-odds'>{slip.payout.odds.american >= 0 ? `+${slip.payout.odds.american}` : slip.payout.odds.american}</div>
              <label>ODDS</label>
            </div>
            <div className='slip-win-money'>
              {/* <div className='slip-to-win'>{`$${slip.payout.toWin}`}</div> */}
              <div className='slip-to-win'>{!isNaN(slip.payout.toWin) ? `$${slip.payout.toWin}` : `$0`}</div>
              <label>PAYOUT</label>
            </div>
          </div>
        </div>
      );

    case 'Teaser':
      return (
        <div className='slip-body' key={props.id} id={props.id}>
          <div className='slip-body-top'>
            <div className='slip-type'>Teaser ({Object.keys(slip.slips.keys).length})</div>
            {(Object.keys(slip.slips.keys).length > 1) ?
              <DropdownButton {...props} type='Teaser' data={slip} activeLine={{line: slip.teaserVal, odds: slip.payout.odds.american}} altLines={slip.alternateLines} />
            : null
            }
            <Button
              onClick={(e) => props.onRemove(e, slip.betUID[0], slip, slipID)}
              id={props.id}
              type='button'
              className='slip-exit'
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
          <div className='slip-body-main'>
            {
              Object.values(slip.slips.keys).map((values, i) => {
                switch(values.betType) {
                  case 'Spread':
                    return (
                      <div key={i} className='slip-bet-info'><i className={values.icon}></i>&nbsp;{values.team} {parseFloat(values.line) > 0 ? `+${ values.line }` : values.line}&nbsp;&nbsp;
                        <Button
                          key={i}
                          onClick={(e) => props.onRemoveMulti(e, slipID, i, slip)}
                          type='button'
                          className='multi-bet-exit'
                          id={i}
                          slipid={slipID}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>
                    );
                  case 'TotalOver':
                    return (
                      <div key={i} className='slip-bet-info'><i className={values.icon}></i>&nbsp;{values.team} Over {values.line}&nbsp;&nbsp;
                        <Button
                          key={i}
                          onClick={(e) => props.onRemoveMulti(e, slipID, i, slip)}
                          type='button'
                          className='multi-bet-exit'
                          id={i}
                          slipid={slipID}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>
                    );
                  case 'TotalUnder':
                    return (
                      <div key={i} className='slip-bet-info'><i className={values.icon}></i>&nbsp;{values.team} Under {values.line}&nbsp;&nbsp;
                        <Button
                          key={i}
                          onClick={(e) => props.onRemoveMulti(e, slipID, i, slip)}
                          type='button'
                          className='multi-bet-exit'
                          id={i}
                          slipid={slipID}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>
                    );
                  default:
                    console.log('incorrect')
                }
                return (
                  <div></div>
                )
              })
            }
            {(props.addBet === 'true') ?
              <div className='slip-bet-info' id='add-bet-retroactive' onClick={(e) => props.onAddRetroactive(e, slip, slipID)}><i className={defaultIcon}></i>&nbsp;<em>Add another bet</em></div>
            : null
            }
          </div>
          <div className='slip-money'>
            <div className='slip-risk-money'>
              $<Input
                  onChange={(event) => props.onChange(event, slip)}
                  className={!slip.error ? 'slip-to-lose': 'slip-to-lose error'}
                  id={props.id}
                  type='text'
                  value={slip.payout.toLose}
                  placeholder={slip.payout.toLose}
              />
              <br />
              <label className='slip-money-label'>WAGER</label>
            </div>
            <div>
              <div className='slip-odds'>{slip.payout.odds.american}</div>
              {/* <div className='slip-odds'>{slip.payout.odds.american >= 0 ? `+${slip.payout.odds.american}` : slip.payout.odds.american}</div> */}
              <label className='slip-money-label'>ODDS</label>
            </div>
            <div className='slip-win-money'>
              {/* <div className='slip-to-win'>{`$${slip.payout.toWin}`}</div> */}
              <div className='slip-to-win'>{!isNaN(slip.payout.toWin) ? `$${slip.payout.toWin}` : `$0`}</div>
              <label className='slip-money-label'>PAYOUT</label>
            </div>
          </div>
        </div>
      );

    default:
      break;
  }
};

export default BetSlip;
