import React from 'react';
// import React, { useContext, useEffect, useState } from 'react';
import '../styles/LinesContainer.css'
// import BetSlip from './BetSlip';
import Button from './Button';
// import API from '../utils/API';

const Lines = (props) => {
  const game = props.game;
  const slipType = props.slipType;
  const straightArr = props.straightArr;
  const parlayArr = props.parlayArr;
  const teaserArr = props.teaserArr;
  //console.log(game.game)

  return (
    <table key={game.gameUID} className='render-main-body'>
      <tbody>
        <tr key={game.gameUID}>
          <td className='render-away-row'>
            <table className='render-sub-body'>
              <tbody>
                <tr>
                  <td className='render-team'>{game.game.odds.full.away_team}</td>
                  {slipType.type === 'Straight' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={straightArr.includes(game.game.keys.gameMoneylineAway.id) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='away-moneyline'
                        value='away-moneyline'
                      >
                        {game.game.keys.gameMoneylineAway.currVal}
                      </Button>
                    </td>
                  : null
                  }
                  {slipType.type === 'Parlay' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={parlayArr.includes(game.game.keys.gameMoneylineAway.id) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='away-moneyline'
                        value='away-moneyline'
                      >
                        {game.game.keys.gameMoneylineAway.currVal}
                      </Button>
                    </td>
                  : null
                  }
                  {slipType.type === 'Teaser' ?
                    <td className='render-button'></td>
                  : null
                  }
                  {slipType.type === 'Straight' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={straightArr.includes(game.game.keys.gameSpreadAway.id) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='away-spread'
                        value='away-spread'
                      >
                        {game.game.keys.gameSpreadAway.currVal} ({game.game.keys.gameSpreadAway.currPrice})
                      </Button>
                    </td>
                  : null
                  }
                  {slipType.type === 'Parlay' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={parlayArr.includes(game.game.keys.gameSpreadAway.id) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='away-spread'
                        value='away-spread'
                      >
                        {game.game.keys.gameSpreadAway.currVal} ({game.game.keys.gameSpreadAway.currPrice})
                      </Button>
                    </td>
                  : null
                  }
                  {slipType.type === 'Teaser' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={teaserArr.includes(game.game.keys.gameSpreadAway.id) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='away-spread'
                        value='away-spread'
                      >
                        {game.game.keys.gameSpreadAway.currVal} ({game.game.keys.gameSpreadAway.currPrice})
                      </Button>
                    </td>
                  : null
                  }
                  {slipType.type === 'Straight' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={straightArr.includes(game.game.keys.gameTotalOver.id) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='over'
                        value='over'
                      >
                        O/{game.game.keys.gameTotalOver.currVal} ({game.game.keys.gameTotalOver.currPrice})
                      </Button>
                    </td>
                  : null
                  }
                  {slipType.type === 'Parlay' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={parlayArr.includes(game.game.keys.gameTotalOver.id) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='over'
                        value='over'
                      >
                        O/{game.game.keys.gameTotalOver.currVal} ({game.game.keys.gameTotalOver.currPrice})
                      </Button>
                    </td>
                  : null
                  }
                  {slipType.type === 'Teaser' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={teaserArr.includes(game.game.keys.gameTotalOver.id) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='over'
                        value='over'
                      >
                        O/{game.game.keys.gameTotalOver.currVal} ({game.game.keys.gameTotalOver.currPrice})
                      </Button>
                    </td>
                  : null
                  }
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td className='render-gametime-row'>
            <table className='render-gametime'>
              <tbody>
                <tr>
                  <td>{game.game.odds.full.commence_time}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <table className='render-sub-body'>
              <tbody>
                <tr>
                  <td className='render-team'>{game.game.odds.full.home_team}</td>
                  {slipType.type === 'Straight' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={straightArr.includes(game.game.keys.gameMoneylineHome.id) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='home-moneyline'
                        value='home-moneyline'
                      >
                        {game.game.keys.gameMoneylineHome.currVal}
                      </Button>
                    </td>
                  : null
                  }
                  {slipType.type === 'Parlay' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={parlayArr.includes(game.game.keys.gameMoneylineHome.id) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='home-moneyline'
                        value='home-moneyline'
                      >
                        {game.game.keys.gameMoneylineHome.currVal}
                      </Button>
                    </td>
                  : null
                  }
                  {slipType.type === 'Teaser' ?
                    <td className='render-button'></td>
                  : null
                  }
                  {slipType.type === 'Straight' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={straightArr.includes(game.game.keys.gameSpreadHome.id) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='home-spread'
                        value='home-spread'
                      >
                        {game.game.keys.gameSpreadHome.currVal} ({game.game.keys.gameSpreadHome.currPrice})
                      </Button>
                    </td>
                  : null
                  }
                  {slipType.type === 'Parlay' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={parlayArr.includes(game.game.keys.gameSpreadHome.id) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='home-spread'
                        value='home-spread'
                      >
                        {game.game.keys.gameSpreadHome.currVal} ({game.game.keys.gameSpreadHome.currPrice})
                      </Button>
                    </td>
                  : null
                  }
                  {slipType.type === 'Teaser' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={teaserArr.includes(game.game.keys.gameSpreadHome.id) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='home-spread'
                        value='home-spread'
                      >
                        {game.game.keys.gameSpreadHome.currVal} ({game.game.keys.gameSpreadHome.currPrice})
                      </Button>
                    </td>
                  : null
                  }
                  {slipType.type === 'Straight' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={straightArr.includes(game.game.keys.gameTotalUnder.id) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='under'
                        value='under'
                      >
                        U/{game.game.keys.gameTotalOver.currVal} ({game.game.keys.gameTotalOver.currPrice})
                      </Button>
                    </td>
                  : null
                  }
                  {slipType.type === 'Parlay' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={parlayArr.includes(game.game.keys.gameTotalUnder.id) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='under'
                        value='under'
                      >
                        U/{game.game.keys.gameTotalOver.currVal} ({game.game.keys.gameTotalOver.currPrice})
                      </Button>
                    </td>
                  : null
                  }
                  {slipType.type === 'Teaser' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={teaserArr.includes(game.game.keys.gameTotalUnder.id) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='under'
                        value='under'
                      >
                        U/{game.game.keys.gameTotalOver.currVal} ({game.game.keys.gameTotalOver.currPrice})
                      </Button>
                    </td>
                  : null
                  }
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default Lines;
