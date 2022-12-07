// import React, { useEffect, useState, useContext } from 'react';
// import API from '../utils/API';
// import ActiveLines from './ActiveLines';
// import Nav from './Nav';
// import { SportsContext } from './ActiveSports';
// export const GamesContext = React.createContext();
// import RenderLines from './RenderLines';
// const moment = require('moment-timezone');


// const ActiveGames = (props) => {
//   const [games, setGames] = useState({ moneyline: null, spread: null, total: null });
//   const [lines, setLines] = useState([])
//   const [isLoading, setIsLoading] = useState(true);

//   // const sports = useContext(SportsContext);
//   console.log(isLoading)
//   console.log(props);
//   console.log(props.data.sport)

//   // const formatDate = (seconds) => {
//   //   const gmtDate = new Date(seconds * 1000);
//   //   const myTimeZone = 'America/Toronto';
//   //   const myDateTimeFormat = 'MM/DD YYYY h:mm a z';
//   //   const formattedDateTime = moment(gmtDate).tz(myTimeZone).format(myDateTimeFormat).split('2020 ');
//   //   const formattedDate = formattedDateTime[0];
//   //   const formattedTime = formattedDateTime[1];
//   //   return [formattedDate, formattedTime];
//   // };

//   // const gameInfo = (gameData) => {
//   //   const gameInfoArray = [];
//   //   console.log('inside game info')

//   //   const formatDate = (seconds) => {
//   //     const gmtDate = new Date(seconds * 1000);
//   //     const myTimeZone = 'America/Toronto';
//   //     const myDateTimeFormat = 'MM/DD YYYY h:mm a z';
//   //     const formattedDateTime = moment(gmtDate).tz(myTimeZone).format(myDateTimeFormat).split('2020 ');
//   //     const formattedDate = formattedDateTime[0];
//   //     const formattedTime = formattedDateTime[1];
//   //     return [formattedDate, formattedTime];
//   //   };
  
//   //   // function to push all lines data to an array
//   //   for (let i = 0; i < gameData.moneyline.length; i++) {
//   //     const formattedDate = formatDate(gameData.moneyline[i].commence_time);
//   //     const moneyLineData = gameData.moneyline[i];
//   //     const spreadData = gameData.spread[i];
//   //     const totalsData = gameData.total[i];

//   //     console.log('inside game data')
//   //     if (!moneyLineData.sites[0] || !spreadData.sites[0] || !totalsData.sites[0]) {
//   //     } else {
//   //       gameInfoArray.push({
//   //         key: `${ gameData.moneyline[i].home_team }-${ gameData.moneyline[i].commence_time }`,
//   //         league: gameData.moneyline[i].sport_nice,
//   //         awayTeam: gameData.moneyline[i].teams[0],
//   //         homeTeam: gameData.moneyline[i].teams[1],
//   //         awayMoneyLine: gameData.moneyline[i].sites[0].odds.h2h[0],
//   //         homeMoneyLine: gameData.moneyline[i].sites[0].odds.h2h[1],
//   //         awaySpread: gameData.spread[i].sites[0].odds.spreads.points[0],
//   //         homeSpread: gameData.spread[i].sites[0].odds.spreads.points[1],
//   //         awaySpreadOdds: gameData.spread[i].sites[0].odds.spreads.odds[0],
//   //         homeSpreadOdds: gameData.spread[i].sites[0].odds.spreads.odds[1],
//   //         overUnder: gameData.total[i].sites[0].odds.totals.points[0],
//   //         overOdds: gameData.total[i].sites[0].odds.totals.odds[0],
//   //         underOdds: gameData.total[i].sites[0].odds.totals.odds[1],
//   //         lastUpdated: gameData.moneyline[i].sites[0].last_update,
//   //         siteRetrieved: gameData.moneyline[i].sites[0].site_key,
//   //         gameDate: formattedDate[0],
//   //         gameTimeEst: formattedDate[1]
//   //       });
//   //     }
//   //   };
//   //   console.log(gameInfoArray)
//   //   return gameInfoArray;
//   // };



//   useEffect(() => {
//     // console.log(props);
//     // gets moneyline data
//     console.log('useeffect')
//     const getAllData = async () => {

//       const getMoneyLineData = async () => {
//         console.log('ue1')
//         const response = await API.getLines(props.data.sport, 'moneyline');
//         return response.data.data;
//       };

//       // gets spread data
//       const getSpreadData = async () => {
//         console.log('ue2')
//         const response = await API.getLines(props.data.sport, 'spread');
//         return response.data.data;
//       };

//       // gets totals data
//       const getTotalsData = async () => {
//         console.log('ue3')
//         const response = await API.getLines(props.data.sport, 'totals');
//         return response.data.data;
//       };

//       const gameInfo = (gameData) => {
//         const gameInfoArray = [];
//         console.log('inside game info')

//         const formatDate = (seconds) => {
//           const gmtDate = new Date(seconds * 1000);
//           const myTimeZone = 'America/Toronto';
//           const myDateTimeFormat = 'MM/DD YYYY h:mm a z';
//           const formattedDateTime = moment(gmtDate).tz(myTimeZone).format(myDateTimeFormat).split('2020 ');
//           const formattedDate = formattedDateTime[0];
//           const formattedTime = formattedDateTime[1];
//           return [formattedDate, formattedTime];
//         };

//         // function to push all lines data to an array
//         for (let i = 0; i < gameData.moneyline.length; i++) {
//           const formattedDate = formatDate(gameData.moneyline[i].commence_time);
//           const moneyLineData = gameData.moneyline[i];
//           const spreadData = gameData.spread[i];
//           const totalsData = gameData.total[i];

//           console.log('inside game data')
//           if (!moneyLineData.sites[0] || !spreadData.sites[0] || !totalsData.sites[0]) {
//           } else {
//             gameInfoArray.push({
//               key: `${ gameData.moneyline[i].home_team }-${ gameData.moneyline[i].commence_time }`,
//               league: gameData.moneyline[i].sport_nice,
//               awayTeam: gameData.moneyline[i].teams[0],
//               homeTeam: gameData.moneyline[i].teams[1],
//               awayMoneyLine: gameData.moneyline[i].sites[0].odds.h2h[0],
//               homeMoneyLine: gameData.moneyline[i].sites[0].odds.h2h[1],
//               awaySpread: gameData.spread[i].sites[0].odds.spreads.points[0],
//               homeSpread: gameData.spread[i].sites[0].odds.spreads.points[1],
//               awaySpreadOdds: gameData.spread[i].sites[0].odds.spreads.odds[0],
//               homeSpreadOdds: gameData.spread[i].sites[0].odds.spreads.odds[1],
//               overUnder: gameData.total[i].sites[0].odds.totals.points[0],
//               overOdds: gameData.total[i].sites[0].odds.totals.odds[0],
//               underOdds: gameData.total[i].sites[0].odds.totals.odds[1],
//               lastUpdated: gameData.moneyline[i].sites[0].last_update,
//               siteRetrieved: gameData.moneyline[i].sites[0].site_key,
//               gameDate: formattedDate[0],
//               gameTimeEst: formattedDate[1]
//             });
//           }
//         };
//         console.log(gameInfoArray)
//         return gameInfoArray;
//       };


//       console.log('oo')
//       // promise all for all functions to run
//       // const example = getMoneyLineData();
//       // console.log(example)
//       let final = await Promise.all([getMoneyLineData(), getSpreadData(), getTotalsData()])

//         .then(values => {
//           console.log('ue4')
//           console.log(values);
//           // setGames({
//           //   ...games,
//           //   moneyline: values[0],
//           //   spread: values[1],
//           //   total: values[2],
//           // })
//           // setLines(values[0])
//           console.log('hey')
//           const examp = gameInfo({
//             ...games,
//             moneyline: values[0],
//             spread: values[1],
//             total: values[2],
//           })
//           console.log(examp)
//           // setLines(gameInfo({
//           //   ...games,
//           //   moneyline: values[0],
//           //   spread: values[1],
//           //   total: values[2],
//           // }))
//           // setIsLoading(false)
//           console.log(lines)
//           // setLines(examp)
//           console.log(lines)
//           // setLines(() => )
//           console.log('hey there')
//           setLines(examp)
//         })
//         .catch(err => {
//           console.log(err);
//           setIsLoading(false)
//         });
//         // console.log(examp)
//     }

//     getAllData().then(() => {setIsLoading(false)})
//       // .then((res) => {
//       //   console.log(res)
//       //   console.log('.then')
//       // })


//   }, [props.data.sport]); // props

//   // console.log(lines);
//   console.log('botom')
//   console.log(lines)
//   return (
//     <div className='test2'>
//      {isLoading ? '' :
//         // lines.length
//         <RenderLines data={lines} passClickData={props.passClickData}/>
//     }
//     </div>
//   );
// };

// export default ActiveGames;
