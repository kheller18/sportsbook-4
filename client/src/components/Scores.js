import React from 'react';

const Scores = (props) => {

  console.log(props)
  if (props.score.game.results !== undefined) {
    return (
      <div>
        {props.score.game.results.full.scores[0].name}
        {props.score.game.results.full.scores[0].score}
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
