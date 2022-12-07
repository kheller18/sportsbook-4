import React, { useContext, useEffect, useState } from 'react';
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

  console.log(game)

  return (
    <table key={game.gameUID} className='render-main-body'>
      <tbody>
        <tr key={game.gameUID}>
          <td className='render-away-row'>
            <table className='render-sub-body'>
              <tbody>
                <tr>
                  <td className='render-team'>{game.game.odds.full.awayTeam}</td>
                  {slipType.type === 'Straight' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={straightArr.includes(game.game.odds.keys.gameMoneylineAwayID) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='away-moneyline'
                        value='away-moneyline'
                      >
                        {game.game.odds.full.gameMoneylineAwayPrice}
                      </Button>
                    </td>
                  : null
                  }
                  {slipType.type === 'Parlay' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={parlayArr.includes(game.game.odds.keys.gameMoneylineAwayID) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='away-moneyline'
                        value='away-moneyline'
                      >
                        {game.game.odds.full.gameMoneylineAwayPrice}
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
                        className={straightArr.includes(game.game.odds.keys.gameSpreadAwayID) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='away-spread'
                        value='away-spread'
                      >
                        {game.game.odds.full.gameSpreadAwayHandicap} ({game.game.odds.full.gameSpreadAwayPrice})
                      </Button>
                    </td>
                  : null
                  }
                  {slipType.type === 'Parlay' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={parlayArr.includes(game.game.odds.keys.gameSpreadAwayID) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='away-spread'
                        value='away-spread'
                      >
                        {game.game.odds.full.gameSpreadAwayHandicap} ({game.game.odds.full.gameSpreadAwayPrice})
                      </Button>
                    </td>
                  : null
                  }
                  {slipType.type === 'Teaser' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={teaserArr.includes(game.game.odds.keys.gameSpreadAwayID) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='away-spread'
                        value='away-spread'
                      >
                        {game.game.odds.full.gameSpreadAwayHandicap} ({game.game.odds.full.gameSpreadAwayPrice})
                      </Button>
                    </td>
                  : null
                  }
                  {slipType.type === 'Straight' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={straightArr.includes(game.game.odds.keys.gameTotalOverID) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='over'
                        value='over'
                      >
                        O/{game.game.odds.full.gameTotalPoints} ({game.game.odds.full.gameTotalOverPrice})
                      </Button>
                    </td>
                  : null
                  }
                  {slipType.type === 'Parlay' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={parlayArr.includes(game.game.odds.keys.gameTotalOverID) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='over'
                        value='over'
                      >
                        O/{game.game.odds.full.gameTotalPoints} ({game.game.odds.full.gameTotalOverPrice})
                      </Button>
                    </td>
                  : null
                  }
                  {slipType.type === 'Teaser' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={teaserArr.includes(game.game.odds.keys.gameTotalOverID) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='over'
                        value='over'
                      >
                        O/{game.game.odds.full.gameTotalPoints} ({game.game.odds.full.gameTotalOverPrice})
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
                  <td>{game.game.odds.full.startDate}</td>
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
                  <td className='render-team'>{game.game.odds.full.homeTeam}</td>
                  {slipType.type === 'Straight' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={straightArr.includes(game.game.odds.keys.gameMoneylineHomeID) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='home-moneyline'
                        value='home-moneyline'
                      >
                        {game.game.odds.full.gameMoneylineHomePrice}
                      </Button>
                    </td>
                  : null
                  }
                  {slipType.type === 'Parlay' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={parlayArr.includes(game.game.odds.keys.gameMoneylineHomeID) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='home-moneyline'
                        value='home-moneyline'
                      >
                        {game.game.odds.full.gameMoneylineHomePrice}
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
                        className={straightArr.includes(game.game.odds.keys.gameSpreadHomeID) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='home-spread'
                        value='home-spread'
                      >
                        {game.game.odds.full.gameSpreadHomeHandicap} ({game.game.odds.full.gameSpreadHomePrice})
                      </Button>
                    </td>
                  : null
                  }
                  {slipType.type === 'Parlay' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={parlayArr.includes(game.game.odds.keys.gameSpreadHomeID) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='home-spread'
                        value='home-spread'
                      >
                        {game.game.odds.full.gameSpreadHomeHandicap} ({game.game.odds.full.gameSpreadHomePrice})
                      </Button>
                    </td>
                  : null
                  }
                  {slipType.type === 'Teaser' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={teaserArr.includes(game.game.odds.keys.gameSpreadHomeID) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='home-spread'
                        value='home-spread'
                      >
                        {game.game.odds.full.gameSpreadHomeHandicap} ({game.game.odds.full.gameSpreadHomePrice})
                      </Button>
                    </td>
                  : null
                  }
                  {slipType.type === 'Straight' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={straightArr.includes(game.game.odds.keys.gameTotalUnderID) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='under'
                        value='under'
                      >
                        U/{game.game.odds.full.gameTotalPoints} ({game.game.odds.full.gameTotalUnderPrice})
                      </Button>
                    </td>
                  : null
                  }
                  {slipType.type === 'Parlay' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={parlayArr.includes(game.game.odds.keys.gameTotalUnderID) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='under'
                        value='under'
                      >
                        U/{game.game.odds.full.gameTotalPoints} ({game.game.odds.full.gameTotalUnderPrice})
                      </Button>
                    </td>
                  : null
                  }
                  {slipType.type === 'Teaser' ?
                    <td className='render-button'>
                      <Button
                        onClick={(e) => props.handleClick(e, game)}
                        className={teaserArr.includes(game.game.odds.keys.gameTotalUnderID) ? 'activeBtn lineBtn' : 'lineBtn'}
                        id='under'
                        value='under'
                      >
                        U/{game.game.odds.full.gameTotalPoints} ({game.game.odds.full.gameTotalUnderPrice})
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
