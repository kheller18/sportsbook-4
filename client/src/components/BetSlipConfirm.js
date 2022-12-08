import React from 'react';
// import React, { useEffect, useState } from 'react';
import '../styles/BetSlip.css';
// import API from '../utils/API';
// import Button from './Button';
// import Input from './Input';

const BetSlipConfirm = (props) => {

  const slip = props.data;
//<i class="far fa-check-circle"></i>

  switch (slip.type) {
    case 'Straight':
      return (
        <div className='slip-body'>
          <div className='slip-body-top'>
            <div className='slip-type'>Straight</div>
          </div>
          <div className='slip-body-main'>
            {slip.slips.keys[`${ slip.betUID[0] }`].betType === 'Moneyline' ?
              <div className='slip-bet-info'><i className={slip.slips.keys[`${ slip.betUID[0] }`].icon}></i>&nbsp;{slip.slips.keys[`${ slip.betUID[0] }`].team} ML ({slip.slips.keys[`${ slip.betUID[0] }`].odds.num})</div>
            : null
            }
            {slip.slips.keys[`${ slip.betUID[0] }`].betType === 'Spread' ?
              <div className='slip-bet-info'><i className={slip.slips.keys[`${ slip.betUID[0] }`].icon}></i>&nbsp;
                {slip.slips.keys[`${ slip.betUID[0] }`].team}&nbsp;{slip.slips.keys[`${ slip.betUID[0] }`].line} ({slip.slips.keys[`${ slip.betUID[0] }`].odds.num})
              </div>
              : null
            }
            {slip.slips.keys[`${ slip.betUID[0] }`].betType === 'TotalOver' ?
              <div className='slip-bet-info'><i className={slip.slips.keys[`${ slip.betUID[0] }`].icon}></i>&nbsp;
                {slip.slips.keys[`${ slip.betUID[0] }`].teams.away} / {slip.slips.keys[`${ slip.betUID[0] }`].teams.home} O/&nbsp;
                {slip.slips.keys[`${ slip.betUID[0] }`].line} ({slip.slips.keys[`${ slip.betUID[0] }`].odds.num})
              </div>
            : null
            }
            {slip.slips.keys[`${ slip.betUID[0] }`].betType === 'TotalUnder' ?
              <div className='slip-bet-info'><i className={slip.slips.keys[`${ slip.betUID[0] }`].icon}></i>&nbsp;
                {slip.slips.keys[`${ slip.betUID[0] }`].teams.away} / {slip.slips.keys[`${ slip.betUID[0] }`].teams.home} U/&nbsp;
                {slip.slips.keys[`${ slip.betUID[0] }`].line} ({slip.slips.keys[`${ slip.betUID[0] }`].odds.num})
              </div>
            : null
            }
          </div>
          <div className='slip-money'>
            <div className='slip-risk-money'>
              <div className='slip-to-lose'>${slip.payout.toLose}</div>
              <label>WAGER</label>
            </div>
            <div>
              <div className='slip-odds'>{slip.payout.odds.american}</div>
              <label>ODDS</label>
            </div>
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
          </div>
          <div className='slip-body-main'>
            {
              Object.values(slip.slips.keys).map((values, i) => {
                switch(values.betType) {
                  case 'Moneyline':
                    return (
                      <div key={i} className='slip-bet-info'><i className={values.icon}></i>&nbsp;
                        {values.team} ML ({values.odds.num})&nbsp;&nbsp;
                      </div>
                    )

                  case 'Spread':
                    return (
                      <div className='slip-bet-info'><i className={values.icon}></i>&nbsp;
                        {values.team}&nbsp; {values.line} ({values.odds.num})
                      </div>
                    )

                  case 'TotalOver':
                    return (
                      <div className='slip-bet-info'><i className={values.icon}></i>&nbsp;{values.teams.away} / {values.teams.home} O/&nbsp;
                        {values.line} ({values.odds.num})
                      </div>
                    )

                  case 'TotalUnder':
                    return (
                      <div className='slip-bet-info'><i className={values.icon}></i>&nbsp;{values.teams.away} / {values.teams.home} U/&nbsp;
                        {values.line} ({values.odds.num})
                      </div>
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
            <div>
              <div className='slip-odds'>{slip.payout.odds.american}</div>
              <label>ODDS</label>
            </div>
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
          </div>
          <div className='slip-body-main'>
            {
              Object.values(slip.slips.keys).map((values, i) => {
                switch(values.betType) {
                  case 'Moneyline':
                    return (
                      <div key={i} className='slip-bet-info'><i className={values.icon}></i>&nbsp;
                        {values.team} ML ({values.odds.num})&nbsp;&nbsp;
                      </div>
                    )

                  case 'Spread':
                    return (
                      <div className='slip-bet-info'><i className={values.icon}></i>&nbsp;
                        {values.team}&nbsp; {values.line} ({values.odds.num})
                      </div>
                    )

                  case 'TotalOver':
                    return (
                      <div className='slip-bet-info'><i className={values.icon}></i>&nbsp;{values.teams.away} / {values.teams.home} O/&nbsp;
                        {values.line} ({values.odds.num})
                      </div>
                    )

                  case 'TotalUnder':
                    return (
                      <div className='slip-bet-info'><i className={values.icon}></i>&nbsp;{values.teams.away} / {values.teams.home} U/&nbsp;
                        {values.line} ({values.odds.num})
                      </div>
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
            <div>
              <div className='slip-odds'>{slip.payout.odds.american}</div>
              <label>ODDS</label>
            </div>
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

export default BetSlipConfirm;
