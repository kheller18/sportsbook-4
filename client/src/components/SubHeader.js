import React, { useEffect, useState } from 'react';
import Button from './Button';
import '../styles/SubHeader.css';
import '../styles/LinesContainer.css'


const SubHeader = (props) => {
  // console.log(props.title)
  // const title = props.title;
  const game = props.game;
  const players = props.players;
  const [showDropdown, setShowDropdown] = useState(props.show)
  const slipType = props.slipType;
  const straightArr = props.straightArr;
  const parlayArr = props.parlayArr;
  // const teaserArr = props.teaserArr;
  const propType = props.activeTab;
  // const game = props.game;
  const playerPropsHeader = ['PLAYER', 'UNDER', 'LINE', 'OVER'];


  // console.log(props.players)
  // Object.entries(players).map((player, i) => {
  //   if (i === 0) {
  //     console.log(player)
  //   }
  // })

  const handleDropdownClick = () => {
    if (showDropdown) {
      setShowDropdown(false)
    } else {
      setShowDropdown(true)
    }
  }

  useEffect(() => {

  }, [])

  return (
    <div className='player-prop-container'>
      <div className='player-prop-header'>
          <table className='table'>
            <thead>
              <tr className='table-headers'>
                <th className='th' id='header-player'>{playerPropsHeader[0]}</th>
                <th className='th' id='header-under'>{playerPropsHeader[1]}</th>
                <th className='th' id='header-line'>{playerPropsHeader[2]}</th>
                <th className='th' id='header-over'>{playerPropsHeader[3]}</th>
              </tr>
            </thead>
           </table>
          {Object.entries(players).map((player, i) => {
            return (
              <table key={player[1].Over.id} className='prop-body'>
                <tbody>
                  <tr>
                    <td className='render-player-row'>
                      <table className='render-sub-body'>
                        <tbody>
                          <tr>
                            <td className='render-player'>{player[0]}</td>
                            {slipType.type === 'Straight' ?
                              <td className='render-button'>
                                <Button
                                  onClick={(e) => props.handlePropClick(e, player, propType, game)}
                                  className={straightArr.includes(player[1][`Under`]['id']) ? 'activeBtn lineBtn' : 'lineBtn'}
                                  id='player-under'
                                  value='player-under'
                                >
                                  {player[1].Under.odds}
                                </Button>
                              </td>
                            : null
                            }
                            {slipType.type === 'Parlay' ?
                              <td className='render-button'>
                                <Button
                                  onClick={(e) => props.handlePropClick(e, player, propType, game)}
                                  className={parlayArr.includes(player[1][`Under`]['id']) ? 'activeBtn lineBtn' : 'lineBtn'}
                                  id='player-under'
                                  value='player-under'
                                >
                                  {player[1].Under.odds}
                                </Button>
                              </td>
                            : null
                            }
                            <td className='render-button'>
                              <Button
                                // onClick={(e) => handleClick(e, player)}
                                className='lineBtn'
                                id='player-line'
                                value='player-line'
                              >
                                {player[1].Over.line}
                              </Button>
                            </td>
                            {slipType.type === 'Straight' ?
                              <td className='render-button'>
                                <Button
                                  onClick={(e) => props.handlePropClick(e, player, propType, game)}
                                  className={straightArr.includes(player[1][`Over`]['id']) ? 'activeBtn lineBtn' : 'lineBtn'}
                                  id='player-over'
                                  value='player-over'
                                >
                                  {player[1].Over.odds}
                                </Button>
                              </td>
                            : null
                            }
                            {slipType.type === 'Parlay' ?
                              <td className='render-button'>
                                <Button
                                  onClick={(e) => props.handlePropClick(e, player, propType, game)}
                                  className={parlayArr.includes(player[1][`Over`]['id']) ? 'activeBtn lineBtn' : 'lineBtn'}
                                  id='player-over'
                                  value='player-over'
                                >
                                  {player[1].Over.odds}
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
          })
        }
      </div>
    </div>
  )
}

export default SubHeader;
