import React from 'react';
import '../styles/Scores.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-regular-svg-icons';
import { faFootballBall, faHockeyPuck, faBasketballBall, faFutbol, faChevronCircleUp, faChevronCircleDown, faSquareCheck } from '@fortawesome/free-solid-svg-icons';

const Scores = (props) => {
  const iconClasses = {
    'Baseball': 'fa-baseball-ball',
    'Football': faFootballBall,
    'Soccer': faFutbol,
    'Hockey': faHockeyPuck,
    'Golf': 'fa-golf-ball',
    'Tennis': 'fa-table-tennis',
    'MMA': 'fa-user-ninja',
    'Basketball': faBasketballBall
  }

  console.log(props)
  if (props.score.game.results !== undefined) {
    return (
      <div className='scores-container'>
        <table className='scores-teams'>
          <td>
            <tr>
              <td className='scores-team'>
                <FontAwesomeIcon icon={iconClasses[props.score.sport]} /> {props.score.game.results.full.scores[0].name}
              </td>
              <td className='score'>
                {props.score.game.results.full.scores[0].score}
              </td>
            </tr>
            <tr>
              <td className='scores-team'>
                <FontAwesomeIcon icon={iconClasses[props.score.sport]} /> {props.score.game.results.full.scores[1].name}
              </td>
              <td className='score'>
                {props.score.game.results.full.scores[1].score}
              </td>
            </tr>
          </td>
        </table>
        <table className='scores-status'>
          <td>
            <tr>LIVE</tr>
          </td>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        {props.score.awayTeam}
        {props.score.homeTeam}
      </div>
    );
  }
};

export default Scores;
