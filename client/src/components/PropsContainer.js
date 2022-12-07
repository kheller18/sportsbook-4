import React, { useContext, useEffect, useState } from 'react';
import Button from './Button';
import Props from './Props';
import API from '../utils/API';
import '../styles/LinesContainer.css';
import '../styles/Props.css';
import SubHeader from './SubHeader';

const PropsContainer = (props) => {
  const games = props.games;
  const slipType = props.slipType;
  // const straightArr = props.straightArr;
  // const parlayArr = props.parlayArr;
  // const teaserArr = props.teaserArr;
  // const [showDropdown, setShowDropdown] = useState(props.show)
  // const [activeTab, setActiveTab] = useState('')
  const [activeGames, setActiveGames] = useState([])
  // const numCategories = Object.keys(game.game.props.player).length;
  // console.log(numCategories)
{/* <i className="fas fa-plus"></i> */}

  const propRelations = {
    'points': 'POINTS',
    'assists': 'ASSISTS',
    'rebounds': 'REBOUNDS',
    'par': 'POINTS + ASSISTS + REBOUNDS',
    'blocks': 'BLOCKS',
    'turnovers': 'TURNOVERS',
    'threes': 'THREE POINTERS',
  }

  // console.log(game.game.props.player)
  // Object.keys(game.game.props.player).map((propKey) => {
  //   Object.values(game.game.props.player[`${ propKey }`]).map((values) => {
  //     // console.log(values)
  //   })
  //   // console.log(propKey)
  // })
  const handleDropdownClick = () => {
    if (showDropdown) {
      setShowDropdown(false)
    } else {
      setShowDropdown(true)
    }
  }

  return (
    <div className='player-prop-container'>
      {games.map((game) => {
        if (typeof game.game.props != 'undefined') {
          if (typeof game.game.props.player != 'undefined') {
            return (
              <Props game={game} handlePropClick={props.handlePropClick} slipType={props.slipType} straightArr={props.straightArr} parlayArr={props.parlayArr} teaserArr={props.teaserArr} />
            )
          }
        }
      })}
      {/* <div className='player-prop-header'>
        <Button type='button' className={showDropdown ? 'player-prop-header-button activeBtn' : 'player-prop-header-button'} onClick={handleDropdownClick}>{game.game.odds.full.description}</Button>
      </div>
      {
        showDropdown ? 
          <div className='player-prop-game-body'>
            {
              Object.keys(game.game.props.player).map((propKey, i) => {
                return (
                  <div key={propKey} className='prop-type-header'>
                    <Button className={showDropdown ? 'prop-type-button propActiveBtn' : 'prop-type-button'} onClick={handleDropdownClick}>{propRelations[`${ propKey }`]}</Button>
                  </div>
                )
                // if (i === 0) {
                //   return (
                //     <SubHeader title={propRelations[`${ propKey }`]} players={game.game.props.player[`${ propKey }`]} game={props.game} slipType={props.slipType} straightArr={props.straightArr} parlayArr={props.parlayArr} teaserArr={props.teaserArr} handlePropClick={props.handlePropClick} show={true} />
                //   )
                // } else {
                //   return (
                //     <SubHeader title={propRelations[`${ propKey }`]} players={game.game.props.player[`${ propKey }`]} game={props.game} slipType={props.slipType} straightArr={props.straightArr} parlayArr={props.parlayArr} teaserArr={props.teaserArr} handlePropClick={props.handlePropClick} show={false} />
                //   )
                // }
              })
            }
          </div>

        : null
      } */}
      {/* <div className='player-prop-game-body'>
        {
          Object.keys(game.game.props.player).map((propKey, i) => {
            return (
              <SubHeader title={propRelations[`${ propKey }`]} players={game.game.props.player[`${ propKey }`]} show={i}/>
            )
          })
        }
      </div> */}
    </div>
  );
}

export default PropsContainer;
