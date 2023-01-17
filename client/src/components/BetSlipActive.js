import React from 'react';
import '../styles/BetSlip.css';
import '../styles/BetSlipActive.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const BetSlipActive = (props) => {

  const slip = props.data;
  switch (slip.type) {
    case 'Straight':
      return (
        <div className='slip-body'>
          <div className='slip-body-top'>
            <div className='slip-type'>Straight</div>
            {/* <div className='slip-exit'><FontAwesomeIcon className='success' icon={faCircleCheck} /></div> */}
          </div>
          <div className='slip-body-main'>
            {slip.slips.keys[`${ slip.betUID[0] }`].betType === 'Moneyline' ?
              <div className='slip-bet-info'><i className={slip.slips.keys[`${ slip.betUID[0] }`].icon}></i>&nbsp;{slip.slips.keys[`${ slip.betUID[0] }`].team}&nbsp;<b>ML ({slip.slips.keys[`${ slip.betUID[0] }`].odds.num})</b></div>
            : null
            }
            {slip.slips.keys[`${ slip.betUID[0] }`].betType === 'Spread' ?
              <div className='slip-bet-info'><i className={slip.slips.keys[`${ slip.betUID[0] }`].icon}></i>&nbsp;
                {/* {slip.slips.keys[`${ slip.betUID[0] }`].team}&nbsp;{slip.slips.keys[`${ slip.betUID[0] }`].line[0] === '-' ? slip.slips.keys[`${ slip.betUID[0] }`].line : `+${slip.slips.keys[`${ slip.betUID[0] }`].line}`} ({slip.slips.keys[`${ slip.betUID[0] }`].odds.num}) */}
                {slip.slips.keys[`${ slip.betUID[0] }`].team}&nbsp;<b>{slip.slips.keys[`${ slip.betUID[0] }`].line} ({slip.slips.keys[`${ slip.betUID[0] }`].odds.num})</b>
              </div>
              : null
            }
            {slip.slips.keys[`${ slip.betUID[0] }`].betType === 'TotalOver' ?
              <div className='slip-bet-info'><i className={slip.slips.keys[`${ slip.betUID[0] }`].icon}></i>&nbsp;
                {slip.slips.keys[`${ slip.betUID[0] }`].teams.away} / {slip.slips.keys[`${ slip.betUID[0] }`].teams.home}&nbsp;<b>Over&nbsp;
                {slip.slips.keys[`${ slip.betUID[0] }`].line} ({slip.slips.keys[`${ slip.betUID[0] }`].odds.num})</b>
              </div>
            : null
            }
            {slip.slips.keys[`${ slip.betUID[0] }`].betType === 'TotalUnder' ?
              <div className='slip-bet-info'><i className={slip.slips.keys[`${ slip.betUID[0] }`].icon}></i>&nbsp;
                {slip.slips.keys[`${ slip.betUID[0] }`].teams.away} / {slip.slips.keys[`${ slip.betUID[0] }`].teams.home}&nbsp;<b>Under&nbsp;
                {slip.slips.keys[`${ slip.betUID[0] }`].line} ({slip.slips.keys[`${ slip.betUID[0] }`].odds.num})</b>
              </div>
            : null
            }
          </div>
          <div className='slip-money'>
            <div className='slip-risk-money'>
              <div className='slip-to-lose'>${slip.payout.toLose}</div>
              <label>WAGER</label>
            </div>
            {/* <div>
              <div className='slip-odds'>{slip.payout.odds.american}</div>
              <label>ODDS</label>
            </div> */}
            <div className='slip-win-money'>
              <div className='slip-to-win'>${slip.payout.toWin}</div>
              <label>PAYOUT</label>
            </div>
          </div>
        </div>
      );

    case 'Parlay':
      return (
        <div className='slip-body'>
          <div className='slip-body-top'>
            <div className='slip-type'>Parlay ({Object.keys(slip.slips.keys).length})</div>
            {/* <div className='slip-exit'><FontAwesomeIcon className='success' icon={faCircleCheck} /></div> */}
          </div>
          <div className='slip-body-main'>
            {
              Object.values(slip.slips.keys).map((values, i) => {
                switch(values.betType) {
                  case 'Moneyline':
                    return (
                      <div key={i} className='slip-bet-info'><i className={values.icon}></i>&nbsp;
                        {/* {values.team} ML ({values.odds.num})&nbsp;&nbsp; */}
                        {values.team}&nbsp;<b>ML ({values.odds.num})</b>
                      </div>
                    )

                  case 'Spread':
                    return (
                      <div className='slip-bet-info'><i className={values.icon}></i>&nbsp;
                        {values.team}&nbsp;<b>{values.line} ({values.odds.num})</b>
                        {/* {values.team}&nbsp; {values.line} ({values.odds.num}) */}
                      </div>
                    )

                  case 'TotalOver':
                    return (
                      <div className='slip-bet-info'><i className={values.icon}></i>&nbsp;{values.teams.away} / {values.teams.home}&nbsp;<b>Over&nbsp;
                        {values.line} ({values.odds.num})</b>
                      </div>
                    )

                  case 'TotalUnder':
                    return (
                      <div className='slip-bet-info'><i className={values.icon}></i>&nbsp;{values.teams.away} / {values.teams.home}&nbsp;<b>Under&nbsp;
                        {values.line} ({values.odds.num})</b>
                      </div>
                    )

                  default:
                    return (
                      <div></div>
                    )
                }
              })
            }
          </div>
          <div className='slip-money'>
            <div className='slip-risk-money'>
              <div className='slip-to-lose'>${slip.payout.toLose}</div>
              <label>WAGER</label>
            </div>
            {/* <div>
              <div className='slip-odds'>{slip.payout.odds.american}</div>
              <label>ODDS</label>
            </div> */}
            <div className='slip-win-money'>
              <div className='slip-to-win'>${slip.payout.toWin}</div>
              <label>PAYOUT</label>
            </div>
          </div>
        </div>
      )

    case 'Teaser':
      return (
        <div className='slip-body'>
          <div className='slip-body-top'>
            <div className='slip-type'>Teaser ({Object.keys(slip.slips.keys).length})</div>
            {/* <div className='slip-exit'><FontAwesomeIcon className='success' icon={faCircleCheck} /></div> */}
          </div>
          <div className='slip-body-main'>
            {
              Object.values(slip.slips.keys).map((values, i) => {
                switch(values.betType) {
                  case 'Moneyline':
                    return (
                      <div key={i} className='slip-bet-info'><i className={values.icon}></i>&nbsp;
                        {values.team}&nbsp;<b>ML ({values.odds.num})</b>&nbsp;&nbsp;
                      </div>
                    )

                  case 'Spread':
                    return (
                      <div className='slip-bet-info'><i className={values.icon}></i>&nbsp;
                        {values.team}&nbsp;<b>{values.line} ({values.odds.num})</b>
                      </div>
                    )

                  case 'TotalOver':
                    return (
                      <div className='slip-bet-info'><i className={values.icon}></i>&nbsp;{values.teams.away} / {values.teams.home}&nbsp;<b>Over&nbsp;
                        {values.line} ({values.odds.num})</b>
                      </div>
                    )

                  case 'TotalUnder':
                    return (
                      <div className='slip-bet-info'><i className={values.icon}></i>&nbsp;{values.teams.away} / {values.teams.home}&nbsp;<b>Under&nbsp;
                        {values.line} ({values.odds.num})</b>
                      </div>
                    )

                  default:
                    return (
                      <div></div>
                    )
                }
              })
            }
          </div>
          <div className='slip-money'>
            <div className='slip-risk-money'>
              <div className='slip-to-lose'>${slip.payout.toLose}</div>
              <label>WAGER</label>
            </div>
            {/* <div>
              <div className='slip-odds'>{slip.payout.odds.american}</div>
              <label>ODDS</label>
            </div> */}
            <div className='slip-win-money'>
              <div className='slip-to-win'>${slip.payout.toWin}</div>
              <label>PAYOUT</label>
            </div>
          </div>
        </div>
      )

    default:
      break;
  }
};

export default BetSlipActive;
