import React, { useContext, useEffect, useState } from 'react';
import Button from './Button';
import API from '../utils/API';
import '../styles/LinesContainer.css';
import '../styles/Props.css';
import SubHeader from './SubHeader';

const Props = (props) => {
  const game = props.game;
  const slipType = props.slipType;
  const straightArr = props.straightArr;
  const parlayArr = props.parlayArr;
  const teaserArr = props.teaserArr;
  const [showPropsDropdown, setShowPropsDropdown] = useState(props.show)
  const [showPropDropdown, setShowPropDropdown] = useState(false)
  const [activeTab, setActiveTab] = useState('points')
  const numCategories = Object.keys(game.game.props.player).length;
  console.log(numCategories)
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
    if (showPropsDropdown) {
      setShowPropsDropdown(false)
    } else {
      setShowPropsDropdown(true)
    }
  }

  const handlePropClick = (e) => {
    if (activeTab === e.target.value) {
      setActiveTab('')
    } else {
      setActiveTab(e.target.value)
    }
  }

  return (
    <div className='player-prop-container'>
      <div className='player-prop-header'>
        <Button type='button' className={showPropsDropdown ? 'player-prop-header-button activeBtn' : 'player-prop-header-button'} onClick={handleDropdownClick}>{game.game.odds.full.description}</Button>
      </div>
      {
        showPropsDropdown ? 
          <div>
            <div className='player-prop-game-body'>
              {
                Object.keys(game.game.props.player).map((propKey, i) => {
                  return (
                    <div key={propKey} className='prop-type-header'>
                      <Button className={activeTab === propKey ? 'prop-type-button propActiveBtn' : 'prop-type-button'} value={propKey} onClick={handlePropClick}>{propRelations[`${ propKey }`]}</Button>
                    </div>
                  )
                })

              }
            </div>

            <div className='player-prop-game-body'>
              {activeTab.length > 1 ?
                <SubHeader players={game.game.props.player[`${ activeTab }`]} game={game} activeTab={activeTab} handlePropClick={props.handlePropClick} slipType={props.slipType} straightArr={props.straightArr} parlayArr={props.parlayArr} teaserArr={props.teaserArr} />
              : null
              }
            </div>
          </div>
        : null
      }
      {/* {activeTab.length > 1 ?
        <div className='player-prop-game-body'>
          <SubHeader players={game.game.props.player[`${ activeTab }`]} slipType={props.slipType} straightArr={props.straightArr} parlayArr={props.parlayArr} teaserArr={props.teaserArr} />
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

export default Props;
