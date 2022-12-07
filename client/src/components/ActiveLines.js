import React, { useEffect, useState, useContext } from 'react';
import { GamesContext } from './ActiveGames';
import RenderLines from './RenderLines';
export const ActiveLinesContext = React.createContext();
const moment = require('moment-timezone');

const ActiveLines = () => {
  const [lines, setLines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const games = useContext(GamesContext);

  useEffect(() => {
    setLines(gameInfo(games));
    setIsLoading(false);
  }, [games]);

  // function to format the data
  const formatDate = (seconds) => {
    const gmtDate = new Date(seconds * 1000);
    const myTimeZone = 'America/Toronto';
    const myDateTimeFormat = 'MM/DD YYYY h:mm a z';
    const formattedDateTime = moment(gmtDate).tz(myTimeZone).format(myDateTimeFormat).split('2020 ');
    const formattedDate = formattedDateTime[0];
    const formattedTime = formattedDateTime[1];
    return [formattedDate, formattedTime];
  };

  const gameInfo = (gameData) => {
    const gameInfoArray = [];

    // function to push all lines data to an array
    for (let i = 0; i < gameData.moneyline.length; i++) {
      const formattedDate = formatDate(gameData.moneyline[i].commence_time);
      const moneyLineData = gameData.moneyline[i];
      const spreadData = gameData.spread[i];
      const totalsData = gameData.total[i];

      if (!moneyLineData.sites[0] || !spreadData.sites[0] || !totalsData.sites[0]) {
      } else {
        gameInfoArray.push({
          key: `${ gameData.moneyline[i].home_team }-${ gameData.moneyline[i].commence_time }`,
          league: gameData.moneyline[i].sport_nice,
          awayTeam: gameData.moneyline[i].teams[0],
          homeTeam: gameData.moneyline[i].teams[1],
          awayMoneyLine: gameData.moneyline[i].sites[0].odds.h2h[0],
          homeMoneyLine: gameData.moneyline[i].sites[0].odds.h2h[1],
          awaySpread: gameData.spread[i].sites[0].odds.spreads.points[0],
          homeSpread: gameData.spread[i].sites[0].odds.spreads.points[1],
          awaySpreadOdds: gameData.spread[i].sites[0].odds.spreads.odds[0],
          homeSpreadOdds: gameData.spread[i].sites[0].odds.spreads.odds[1],
          overUnder: gameData.total[i].sites[0].odds.totals.points[0],
          overOdds: gameData.total[i].sites[0].odds.totals.odds[0],
          underOdds: gameData.total[i].sites[0].odds.totals.odds[1],
          lastUpdated: gameData.moneyline[i].sites[0].last_update,
          siteRetrieved: gameData.moneyline[i].sites[0].site_key,
          gameDate: formattedDate[0],
          gameTimeEst: formattedDate[1]
        });
      }
    };
    return gameInfoArray;
  };

  return (
    <div className='test'>
      {isLoading ? '' :
        <ActiveLinesContext.Provider value={lines}>
          <RenderLines />
        </ActiveLinesContext.Provider>
      }
    </div>
  );
};

export default ActiveLines;
