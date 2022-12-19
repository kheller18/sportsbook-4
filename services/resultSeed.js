const mongoose = require('mongoose');
const puppeteer = require('puppeteer')
const axios = require('axios');


const getResults = async () => {
  // const browser = await puppeteer.launch({
  //   headless: false,
  // })
  // const ag = axios({
  //   method: 'GET',
  //   url: 'https://api-football-v1.p.rapidapi.com/v3/leagues',
  //   params: {season: '2020', country: 'France'},
  //   headers: {
  //     'x-rapidapi-key': '10e60d49f2msh589d4bb3db44213p1157e2jsn1da5bcca0c7c',
  //   }
  // }).then(data => {
  //   console.log(data.data.response)
  // })

  //// EPL
  // const ag = axios({
  //   method: 'GET',
  //   url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
  //   params: {league: 39, date: '2021-04-21', season: 2020},
  //   headers: {
  //     'x-rapidapi-key': '10e60d49f2msh589d4bb3db44213p1157e2jsn1da5bcca0c7c',
  //   }
  // }).then(data => {
  //   console.log(data.data.response[0])
  // })


  //// bundesliga
  // const ag = axios({
  //   method: 'GET',
  //   url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
  //   params: {league: 78, date: '2021-04-21', season: 2020},
  //   headers: {
  //     'x-rapidapi-key': '10e60d49f2msh589d4bb3db44213p1157e2jsn1da5bcca0c7c',
  //   }
  // }).then(data => {
  //   console.log(data.data.response[0])
  // })

  //// la Liga
  // const ag = axios({
  //   method: 'GET',
  //   url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
  //   params: {league: 140, date: '2021-04-21', season: 2020},
  //   headers: {
  //     'x-rapidapi-key': '10e60d49f2msh589d4bb3db44213p1157e2jsn1da5bcca0c7c',
  //   }
  // }).then(data => {
  //   console.log(data.data.response[0])
  // })

  //// league 1
  // const ag = axios({
  //   method: 'GET',
  //   url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
  //   params: {league: 61, date: '2021-04-18', season: 2020},
  //   headers: {
  //     'x-rapidapi-key': '10e60d49f2msh589d4bb3db44213p1157e2jsn1da5bcca0c7c',
  //   }
  // }).then(data => {
  //   console.log(data.data.response[0])
  // })

  //// nba
  const ag = axios({
    method: 'GET',
    url: 'https://api-basketball.p.rapidapi.com/leagues',
    params: {season: '2020', name: 'NBA'},
    headers: {
      'x-rapidapi-key': '10e60d49f2msh589d4bb3db44213p1157e2jsn1da5bcca0c7c',
    }
  }).then(data => {
    console.log(data)
  })


  // const page= await browser.newPage();
  // await page.goto('https://www.espn.com/nba/boxscore/_/gameId/401307665')
  // console.log('page added')
  // let urls = await page.evaluate(() => {
  //   let results = [];
  //   // console.log(results)
  //   // let items = document.querySelector('section.sb-score live');
  //   let items = document.querySelector('#main-container');
  //   return items;
  //   // console.log(items)
  //   // items.map((item) => {
  //   //   console.log(item)
  //   // })
  // })
  // // let elements = await urls.getProperties();

  // console.log(urls)

  // await browser.close();
  //   // page.evaluate(() => {
  //   //   return $('section.sb-score final').text()
  //   // }).then((result) => {
  //   //   console.log(result)
  //   // })
}

getResults();
// const page = await browser.newPage();
// await page.setRequestInterception(true)
// await page.goto('https://www.espn.com/nba/scoreboard').then(() => {
//   page.evaluate(() => {
//     return $('section.sb-score final').text()
//   }).then((result) => {
//     console.info(result)
//     browser.close()
//   })
// })

// puppeteer.launch().then(function(browser) {
//     browser.newPage().then(function(page) {
//         page.goto('https://www.espn.com/nba/scoreboard').then(function() {
//             page.evaluate(function() {
//                 return $('section.sb-score final').text();
//             }).then(function(result) {
//                 // console.info(result);
//                 console.log(result);
//                 // browser.close();
//             });
//         });
//     });
// });

// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost:27017/sportsbook",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
//   }
// ).then(async () => {



// }
