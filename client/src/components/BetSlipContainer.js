import React, { useState, useEffect } from 'react';
import BetSlipConfirm from './BetSlipConfirm';
import Button from './Button';
import API from '../utils/API';
import BetSlip from './BetSlip';
import BetSlipActive from './BetSlipActive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import '../styles/BetSlipContainer.css';

// have to control the slips here otherwise you can't pass back and forth correctly.. pass to RenderBetSlips for the list
const BetSlipContainer = (props) => {
  const clickData = props.data
  const [slipState, setSlipState] = useState('cart')
  const [error, setError] = useState(false)
  // const [slipData, setSlipData] = useState();;
  const [slips, setSlips] = useState([]);
  const [submittedSlips, setSubmittedSlips] = useState([])
  const [toWin, setToWin] = useState();
  const [slipTotalMoney, setSlipTotalMoney] = useState({wager: 0.00, payout: 0.00})
  const [isLoading, setIsLoading] = useState(true)
  const slipLength = slips.length;

  const sportClasses = {
    'Baseball': 'fas fa-baseball-ball',
    'Football': 'fas fa-football-ball',
    'Soccer': 'fas fa-futbol',
    'Hockey': 'fas fa-hockey-puck',
    'Golf': 'fas fa-golf-ball',
    'Tennis': 'fas fa-table-tennis',
    'MMA': 'fas fa-user-ninja',
    'Basketball': 'fas fa-basketball-ball'
  }

  const handleAddRetroactive = (e, slip, id) => {
    console.log(id)
    switch (slip.type) {
      case 'Parlay':
        console.log('Parlay')
        console.log(slip)
        props.passRemovalData({target: '', type: '', operation: '', retroactive: {targets: slip.betUID, type: 'Parlay', slipID: id}})
        break;

      case 'Teaser':
        props.passRemovalData({target: '', type: '', operation: '', retroactive: {targets: slip.betUID, type: 'Teaser', slipID: id}})
        console.log('Teaser')
        console.log(slip)
        break;

      default:
        console.log('no retroactive found')
        break;
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.attributes['id'].value)
    if (e.target.attributes['id'].value === 'slip-tab-cart') {
      if (slipState === 'active') {
         setSlipState('cart')
      }
    } else {
      if (slipState === 'cart') {
        const userData = JSON.parse(localStorage.getItem('user'));
        setSlipState('active')
        API.getBets(userData.user_id)
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err )
          })
      }
    }
  }

  const generateTeaserAltLines = (initialTeaserVal, numBets) => {
    let oddsArr = [{}, {}, {}]
    switch (numBets) {
      case 2:
        switch(initialTeaserVal) {
          case '4':
            oddsArr = [{line: '4', odds: '+100'}, {line: '4.5', odds: '-120'}, {line: '5', odds: '-130'}]
            break;

          case '6':
            oddsArr = [{line: '6', odds: '-110'}, {line: '6.5', odds: '-120'}, {line: '7', odds: '-130'}]
            break;

          default:
            console.log('invalid teaser line')
            break;
        }
        break;

      case 3:
        switch(initialTeaserVal) {
          case '4':
            oddsArr = [{line: '4', odds: '+180'}, {line: '4.5', odds: '+160'}, {line: '5', odds: '+140'}]
            break;

          case '6':
            oddsArr = [{line: '6', odds: '+180'}, {line: '6.5', odds: '+160'}, {line: '7', odds: '+140'}]
            break;

          default:
            console.log('invalid teaser line')
            break;
        }
        break;

      case 4:
        switch(initialTeaserVal) {
          case '4':
            oddsArr = [{line: '4', odds: '+300'}, {line: '4.5', odds: '+250'}, {line: '5', odds: '+200'}]
            break;

          case '6':
            oddsArr = [{line: '6', odds: '+300'}, {line: '6.5', odds: '+250'}, {line: '7', odds: '+200'}]
            break;

          default:
            console.log('invalid teaser line')
            break;
        }
        break;

      case 5:
        switch(initialTeaserVal) {
          case '4':
            oddsArr = [{line: '4', odds: '+450'}, {line: '4.5', odds: '+400'}, {line: '5', odds: '+350'}]
            break;

          case '6':
            oddsArr = [{line: '6', odds: '+450'}, {line: '6.5', odds: '+400'}, {line: '7', odds: '+350'}]
            break;

          default:
            console.log('invalid teaser line')
            break;
        }
        break;

      case 6:
        switch(initialTeaserVal) {
          case '4':
            oddsArr = [{line: '4', odds: '+600'}, {line: '4.5', odds: '+550'}, {line: '5', odds: '+500'}]
            break;

          case '6':
            oddsArr = [{line: '6', odds: '+600'}, {line: '6.5', odds: '+550'}, {line: '7', odds: '+500'}]
            break;

          default:
            console.log('invalid teaser line')
            break;
        }
        break;

      case 7:
        switch(initialTeaserVal) {
          case '4':
            oddsArr = [{line: '4', odds: '+1000'}, {line: '4.5', odds: '+900'}, {line: '5', odds: '+800'}]
            break;

          case '6':
            oddsArr = [{line: '6', odds: '+1000'}, {line: '6.5', odds: '+900'}, {line: '7', odds: '+800'}]
            break;

          default:
            console.log('invalid teaser line')
            break;
        }
        break;

      case 8:
        switch(initialTeaserVal) {
          case '4':
            oddsArr = [{line: '4', odds: '+1500'}, {line: '4.5', odds: '+1200'}, {line: '5', odds: '+1000'}]
            break;

          case '6':
            oddsArr = [{line: '6', odds: '+1500'}, {line: '6.5', odds: '+1200'}, {line: '7', odds: '+1000'}]
            break;

          default:
            console.log('invalid teaser line')
            break;
        }
        break;

      case 9:
        switch(initialTeaserVal) {
          case '4':
            oddsArr = [{line: '4', odds: '+2000'}, {line: '4.5', odds: '+1500'}, {line: '5', odds: '+1200'}]
            break;

          case '6':
            oddsArr = [{line: '6', odds: '+2000'}, {line: '6.5', odds: '+1500'}, {line: '7', odds: '+1200'}]
            break;

          default:
            console.log('invalid teaser line')
            break;
        }
        break;

      case 10:
        switch(initialTeaserVal) {
          case '4':
            oddsArr = [{line: '4', odds: '+2500'}, {line: '4.5', odds: '+2000'}, {line: '5', odds: '+1500'}]
            break;

          case '6':
            oddsArr = [{line: '6', odds: '+2500'}, {line: '6.5', odds: '+2000'}, {line: '7', odds: '+1500'}]
            break;

          default:
            console.log('invalid teaser line')
            break;
        }
        break;

      default:
        console.log('invalid number of bets')
        break;
    }
    return oddsArr;
  }

  const calculateOdds = (oddsArr, type, teaserVal) => {
    let totalOdds = 1;
    console.log('hellop')
    switch(type) {
      case 'Straight':
        oddsArr.map((odds, i) => {
          if (odds[0] === '-') {
            let decOdds = Math.abs(parseFloat(odds))
            let decCalc = ((decOdds + 100) / decOdds).toFixed(2)
            totalOdds *= decCalc
            console.log(totalOdds)
          } else {
            let decOdds = parseFloat(odds)
            let decCalc = ((decOdds + 100) / 100).toFixed(2)
            totalOdds *= decCalc
          }
          // return totalOdds - 1;
        })
        return totalOdds - 1;

      case 'Parlay':
        oddsArr.map((odds, i) => {
          if (odds[0] === '-') {
            let decOdds = Math.abs(parseFloat(odds))
            let decCalc = ((decOdds + 100) / decOdds).toFixed(2)
            totalOdds *= decCalc
          } else {
            let decOdds = parseFloat(odds)
            let decCalc = ((decOdds + 100) / 100).toFixed(2)
            totalOdds *= decCalc
          }
          return totalOdds - 1;
        })
        return totalOdds - 1;
        break;

      case 'Teaser':
        const numBets = oddsArr.length;
        console.log(numBets)
        switch (numBets) {
          case 2:
            switch(teaserVal) {
              case '4':
                break;

              case '4.5':
              case '6.5':
                totalOdds *= (10/12)
                break;

              case '5':
              case '7':
                totalOdds *= (10/13);
                break;

              case '6':
                totalOdds *= (10/11);
                break;

              default:
                console.log('invalid teaser line')
                break;
            }
            break;

          case 3:
            switch(teaserVal) {
              case '4':
              case '6':
                totalOdds *= (9/5)
                break;

              case '4.5':
              case '6.5':
                totalOdds *= (8/5)
                break;

              case '5':
              case '7':
                totalOdds *= (7/5);
                break;

              default:
                console.log('invalid teaser line')
                break;
            }
            break;

          case 4:
            switch(teaserVal) {
              case '4':
              case '6':
                totalOdds *= (3/1)
                break;

              case '4.5':
              case '6.5':
                totalOdds *= (5/2)
                break;

              case '5':
              case '7':
                totalOdds *= (2/1);
                break;

              default:
                console.log('invalid teaser line')
                break;
            }
            break;

          case 5:
            switch(teaserVal) {
              case '4':
              case '6':
                totalOdds *= (9/2)
                break;

              case '4.5':
              case '6.5':
                totalOdds *= (4/1)
                break;

              case '5':
              case '7':
                totalOdds *= (7/2);
                break;

              default:
                console.log('invalid teaser line')
                break;
            }
            break;

          case 6:
            switch(teaserVal) {
              case '4':
              case '6':
                totalOdds *= (6/1)
                break;

              case '4.5':
              case '6.5':
                totalOdds *= (11/2)
                break;

              case '5':
              case '7':
                totalOdds *= (5/1);
                break;

              default:
                console.log('invalid teaser line')
                break;
            }
            break;

          case 7:
            switch(teaserVal) {
              case '4':
              case '6':
                totalOdds *= (10/1)
                break;

              case '4.5':
              case '6.5':
                totalOdds *= (9/1)
                break;

              case '5':
              case '7':
                totalOdds *= (8/1);
                break;

              default:
                console.log('invalid teaser line')
                break;
            }
            break;

          case 8:
            switch(teaserVal) {
              case '4':
              case '6':
                totalOdds *= (15/1)
                break;

              case '4.5':
              case '6.5':
                totalOdds *= (12/1)
                break;

              case '5':
              case '7':
                totalOdds *= (10/1);
                break;

              default:
                console.log('invalid teaser line')
                break;
            }
            break;

          case 9:
            switch(teaserVal) {
              case '4':
              case '6':
                totalOdds *= (20/1)
                break;

              case '4.5':
              case '6.5':
                totalOdds *= (15/1)
                break;

              case '5':
              case '7':
                totalOdds *= (12/1);
                break;

              default:
                console.log('invalid teaser line')
                break;
            }
            break;

          case 10:
            switch(teaserVal) {
              case '4':
              case '6':
                totalOdds *= (25/1)
                break;

              case '4.5':
              case '6.5':
                totalOdds *= (20/1)
                break;

              case '5':
              case '7':
                totalOdds *= (15/1);
                break;

              default:
                console.log('invalid teaser line')
                break;
            }
            break;

          default:
            console.log('invalid number of bets')
            break;
        }
        return totalOdds;

      default:
        console.log('no bet type encountered')
    }
  }

  const calculateSlipTotals = (slips) => {
    let totalWager = 0.00;
    let totalPayout = 0.00;

    slips.map(slip => {
      totalWager += parseFloat(slip.payout.toLose)
      if (slip.payout.toLose < 5) {
        totalPayout += 0
      } else {
        totalPayout += parseFloat(slip.payout.toWin)
      }
    })
    setSlipTotalMoney({wager: totalWager.toFixed(2).toString(), payout: totalPayout.toFixed(2).toString()})
  }

  const generateActiveTeaserLine = (line, type, teaserVal) => {
    let activeLine = '';
    switch(type) {
      case 'Spread':
      case 'TotalUnder':
        activeLine = (parseFloat(line) + parseFloat(teaserVal)).toString()
        break;

      case 'TotalOver':
        activeLine = (parseFloat(line) - parseFloat(teaserVal)).toString()
        break;

      default:
        console.log('unable to perform active teaser line')
    }
    return activeLine;
  }

  const handleTeaserAdjustment = (e, data, id) => {
    for (let i=0; i < Object.keys(data.slips.keys).length; i++) {
      data.slips.keys[`${ data.betUID[i] }`]['line'] = generateActiveTeaserLine(data.slips.keys[`${ data.betUID[i] }`].initialLine, data.slips.keys[`${ data.betUID[i] }`].betType, e.target.attributes['line'].value) 
      console.log(data.slips.keys[`${ data.betUID[i] }`]['line'])
    }
    console.log(e.target.attributes['line'].value)
    data.teaserVal = e.target.attributes['line'].value
    data.payout['odds']['american'] = e.target.attributes['odds'].value
    data.payout['decOdds'] = calculateOdds(data.payout.oddsArr, 'Teaser', e.target.attributes['line'].value)
    console.log()
    if (parseFloat(data.payout.toLose) >= 5) {
      console.log('inside parse float')
      data.payout['toWin'] = (parseFloat(data.payout.toLose) * data.payout.decOdds).toFixed(2).toString()
    } else {
      console.log('did not make it')
      data.payout['toWin'] = 0
    }

    calculateSlipTotals(slips)
    // data.slips.keys[``]
  }

  const handleLineAdjustment = (e, data, id) => {
    // console.log(e)
    // console.log(data)
    // console.log(id)

    switch(data.type) {
      case 'Straight':
        data.slips.keys[`${ data.betUID[0] }`]['line'] = e.target.attributes['line'].value
        data.slips.keys[`${ data.betUID[0] }`]['odds'] = {
          num: e.target.attributes['odds'].value,
          dec: calculateOdds(data.payout.oddsArr, 'Straight')
        }
        data.payout['totalOdds'] = e.target.attributes['odds'].value
        data.payout['oddsArr'] = [e.target.attributes['odds'].value]
        data.payout['odds']['american'] = e.target.attributes['odds'].value
        data.payout['odds']['dec'] = calculateOdds([e.target.attributes['odds'].value], 'Straight')
        console.log(data.payout.odds.dec)
        data.payout['odds']['oddsArr'] = [e.target.attributes['odds'].value]
        data.payout['decOdds'] = calculateOdds([e.target.attributes['odds'].value], 'Straight')
        if (parseFloat(data.payout.toLose) >= 5) {
          console.log('inside parse float')
          data.payout['toWin'] = (parseFloat(data.payout.toLose) * data.payout.decOdds).toFixed(2).toString()
        } else {
          console.log('did not make it')
          data.payout['toWin'] = 0
        }
        break;

      case 'Parlay':
        data.slips.keys[`${ data.betUID[id] }`]['line'] = e.target.attributes['line'].value
        data.slips.keys[`${ data.betUID[id] }`]['odds'] = {
          num: e.target.attributes['odds'].value,
          dec: calculateOdds(data.payout.oddsArr, 'Parlay')
        }
        data.payout['oddsArr'][id] = e.target.attributes['odds'].value
        data.payout['totalOdds'] = calculateOdds(data.payout.oddsArr, "Parlay")
        data.payout['odds']['american'] = parseInt((calculateOdds(data.payout.oddsArr, 'Parlay') * 100))
        console.log(data.payout.odds.american)
        // data.payout['odds']['american'] = (calculateOdds(data.payout.oddsArr, 'Parlay') * 100)
        // data.payout['odds']['american'] = e.target.attributes['odds'].value
        data.payout['odds']['dec'] = calculateOdds(data.payout.oddsArr, 'Parlay')
        data.payout['odds']['oddsArr'][id] = e.target.attributes['odds'].value
        data.payout['decOdds'] = calculateOdds(data.payout.oddsArr, 'Parlay')
        if (parseFloat(data.payout.toLose) >= 5) {
          data.payout['toWin'] = (parseFloat(data.payout.toLose) * data.payout.decOdds).toFixed(2).toString()
        } else {
          data.payout['toWin'] = 0
        }
        break;

      case 'Teaser':
        for (let i=0; i < Object.keys(data.slips.keys).length; i++) {
          data.slips.keys[`${ data.betUID[i] }`]['line'] = generateActiveTeaserLine(data.slips.keys[`${ data.betUID[i] }`].initialLine, data.slips.keys[`${ data.betUID[i] }`].betType, e.target.attributes['line'].value)
        }
        data.teaserVal = e.target.attributes['line'].value
        data.payout['odds']['american'] = e.target.attributes['odds'].value
        data.payout['decOdds'] = calculateOdds(data.payout.oddsArr, 'Teaser', e.target.attributes['line'].value)
        if (parseFloat(data.payout.toLose) >= 5) {
          data.payout['toWin'] = (parseFloat(data.payout.toLose) * data.payout.decOdds).toFixed(2).toString()
        } else {
          data.payout['toWin'] = 0
        }
        break;

      default:
        console.log('didn make it default')
        break;
    }
    calculateSlipTotals(slips)
  }

  const handleDelete = (e, target, data, sID) => {
    console.log(e.target)
    console.log(e)
    console.log(data)
    console.log(target)
    let slipLength = slips.length - 1;
    switch (data.type) {
      case 'Straight':
        props.passRemovalData({target: target, type: 'Straight', emptyAll: false, retroactive: {targets: [], type: '', slipID: ''}})
        break;

      case 'Parlay':
        if (slipLength === sID) {
          props.passRemovalData({target: target, type: 'Parlay', operation: 'delete', emptyAll: false, retroactive: {targets: [], type: '', slipID: ''}})
        }
        break;

      case 'Teaser':
        if (slipLength === sID) {
          props.passRemovalData({target: target, type: 'Teaser', operation: 'delete', emptyAll: false, retroactive: {targets: [], type: '', slipID: ''}})
        }
        break;

      default:
        console.log('invalid handle delete')
        break;
    }
    console.log(slips)
    // old way of finding
      // const newList = slips.filter((slip, id) => id !== e.target.id);
    const newList = slips.filter((slip, id) => id !== sID);
    calculateSlipTotals(newList)
    setSlips(newList);
  }

  const handleDeleteMulti = (e, sID, tID, data) => {
    console.log(sID)
    // console.log(tID)
    // console.log(data.type)
    let slipLength = slips.length - 1;
    switch (data.type) {
      case 'Parlay':
        if (Object.keys(data.slips.keys).length === 1) {
          if (slipLength === sID) {
            props.passRemovalData({target: data.betUID[tID], type: 'Parlay', operation: 'delete', emptyAll: false, retroactive: {targets: [], type: '', slipID: ''}})
          }
          let newList = slips.filter((slip, id) => id !== sID)
          calculateSlipTotals(newList);
          setSlips(newList);
        } else {
          if (slipLength === sID) {
            props.passRemovalData({target: data.betUID[tID], type: 'Parlay', operation: '', emptyAll: false, retroactive: {targets: [], type: '', slipID: ''}})
          }
          delete data['slips']['keys'][`${data.betUID[tID]}`]
          data.betUID = data.betUID.filter((slip, id) => id !== tID)
          console.log(data.betUID);
          data.payout.oddsArr = data.payout.oddsArr.filter((slip, id) => id !== tID)
          data.payout['totalOdds'] = calculateOdds(data.payout.oddsArr, "Parlay")
          data.payout['odds']['american'] = parseInt((calculateOdds(data.payout.oddsArr, 'Parlay') * 100))
          data.payout['odds']['dec'] = calculateOdds(data.payout.oddsArr, 'Parlay')
          data.payout['odds']['oddsArr'] = data.payout.odds.oddsArr.filter((slip, id) => id !== tID)
          data.payout['decOdds'] = calculateOdds(data.payout.oddsArr, 'Parlay')
          data.quantity['total'] -= 1
          console.log(data)
          if (parseFloat(data.payout.toLose) >= 5) {
            data.payout['toWin'] = (parseFloat(data.payout.toLose) * data.payout.decOdds).toFixed(2).toString()
          } else {
            data.payout['toWin'] = 0
          }
          // calculateSlipTotals(slips)
        }
        break;

      case 'Teaser':
        console.log('inside teaser')
        if (Object.keys(data.slips.keys).length === 1) {
          if (slipLength === sID) {
            props.passRemovalData({target: data.betUID[tID], type: 'Teaser', operation: 'delete', emptyAll: false, retroactive: {targets: [], type: '', slipID: ''}})
          }
          let newList = slips.filter((slip, id) => id !== sID)
          calculateSlipTotals(newList);
          setSlips(newList);
        } else {
          if (slipLength === sID) {
            props.passRemovalData({target: data.betUID[tID], type: 'Teaser', operation: '', emptyAll: false, retroactive: {targets: [], type: '', slipID: ''}})
          }
          data.payout.oddsArr = data.payout.oddsArr.filter((slip, id) => id !== tID)
          let newOdds = calculateOdds(data.payout.oddsArr, 'Teaser', data.teaserVal)
          data.alternateLines = generateTeaserAltLines(data.initialTeaserVal, data.payout.oddsArr.length)
          console.log(newOdds)
          delete data['slips']['keys'][`${data.betUID[tID]}`]
          data.betUID = data.betUID.filter((slip, id) => id !== tID)
          data.quantity['total'] -= 1
          data.payout['totalOdds'] = newOdds
          data.payout['odds']['american'] = parseInt(newOdds * 100)
          data.payout['odds']['dec'] = newOdds
          data.payout['odds']['oddsArr'] = data.payout.odds.oddsArr.filter((slip, id) => id !== tID)
          data.payout['decOdds'] = newOdds
        }
        if (parseFloat(data.payout.toLose) >= 5) {
          data.payout['toWin'] = (parseFloat(data.payout.toLose) * data.payout.decOdds).toFixed(2).toString()
        } else {
          data.payout['toWin'] = 0
        }
        break;

      default:
        console.log('inside default')
    }
    calculateSlipTotals(slips)
  }

  const handleClear = () => {
    props.passRemovalData({target: '', type: '', emptyAll: true, retroactive: {targets: [], type: '', slipID: ''}})
    setSlips([]);
    setSlipTotalMoney({wager: 0.00, payout: 0.00});
    setError(false);
  }

  const handleChange = (e, data) => {
    data.payout.toLose = e.target.value;
    console.log(data)
    data.payout.toWin=(parseFloat(data.payout.toLose) * data.payout.decOdds).toFixed(2).toString()
    calculateSlipTotals(slips)
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    // event.persist();
    const slipData = async () => {
      let slipSend = []
      let send = true;
      const userData = JSON.parse(localStorage.getItem('user'));
      slips.map((slip, index) => {
        console.log(slip)
        slip['userID'] = userData.user_id
        // if (slip.payout.toLose === '' || slip.payout.toLose < 5) {
        // if (slip.payout.toLose === '' || slip.payout.toLose < .01 ) {
        slip.payout.toLose = parseFloat(slip.payout.toLose)
        // console.log(typeof slip.payout.toLose)
        if (slip.payout.toLose < .01 || isNaN(slip.payout.toLose)) {
          slip['error'] = true;
          // setSlips(slips);
          console.log('dont send')
          send = false;
        } else {
          slip['error'] = false;
          slipSend.push(slip)
        }
        // return slips;
      })
      //setSlips(slips);
      // let newSlips = slips.map((slip, index) => {
      //   console.log(slip)
      //   slip['userID'] = userData.user_id
      //   // if (slip.payout.toLose === '' || slip.payout.toLose < 5) {
      //   // if (slip.payout.toLose === '' || slip.payout.toLose < .01 ) {
      //   slip.payout.toLose = parseFloat(slip.payout.toLose)
      //   // console.log(typeof slip.payout.toLose)
      //   if (slip.payout.toLose < .01 || isNaN(slip.payout.toLose)) {
      //     slip['error'] = true;
      //     // setSlips(slips);
      //     console.log('dont send')
      //     send = false;
      //   } else {
      //     slip['error'] = false;
      //     slipSend.push(slip)
      //   }
      //   return slips;
      // })

      if (send) {
        console.log('slipSend')
        // if (slipSend.length > 1) {
        //   return await Promise.all(slipSend.map(async slip => await API.submitBetSlip(slip)))
        // } else {
        //   return await Promise.all(slipSend.map(async slip => await API.submitBetSlip(slip)))
        // }
        // return await Promise.all(slipSend.map(async slip => await API.submitBetSlip(slip)))
        return await API.submitBetSlip(slipSend)

        // setError(false)
      } else {
        console.log('no slipSend')
        // setSlips(slips);
        // setSlips(slips);
        // setError(true);
        // return null;
      }
    }

    slipData().then((data) => {
      console.log(data)
      if (data.status === 200) {
        // if (data !== undefined) {
        props.passRemovalData({target: '', type: '', emptyAll: true, retroactive: {targets: [], type: '', slipID: ''}})
        // props.setUser(data[data.length - 1].data.user)
        let tempSlips = props.slips.active;
        const join = data.data.slip.forEach((slip) => {
          tempSlips.push(slip)
        })
        console.log(join)
        // props.setUser({user: data.data.user, bets: tempSlips})
        props.setUser({user: data.data.user, bets: {active: tempSlips, completed: props.slips.completed}})
        // props.setUser(data.data.user)
        setSubmittedSlips(slips)
        setTimeout(() => {
          setSlips([])
          setSubmittedSlips([])
          setSlipTotalMoney({wager: 0.00, payout: 0.00});
          setError(false)
        }, 5000);
      } else {
        console.log(slips)
        setSlips(slips);
        setError(true)
        console.log('did not send')
      }
    }).catch(err => {
      console.log(err)
    })
    // return slips;
  };

  // console.log(slips);
  useEffect(() => {
    console.log('hello')
    setIsLoading(true)
    const currSlip = async () => {
      const generateTeaserAltLines = (initialTeaserVal, numBets) => {
        console.log(numBets)
        let oddsArr = [{}, {}, {}]
        switch (numBets) {
          case 2:
            switch(initialTeaserVal) {
              case '4':
                console.log('inside 4')
                oddsArr = [{line: '4', odds: '+100'}, {line: '4.5', odds: '-120'}, {line: '5', odds: '-130'}]
                break;

              case '6':
                oddsArr = [{line: '6', odds: '-110'}, {line: '6.5', odds: '-120'}, {line: '7', odds: '-130'}]
                break;

              default:
                console.log('invalid teaser line')
                break;
            }
            break;

          case 3:
            switch(initialTeaserVal) {
              case '4':
                oddsArr = [{line: '4', odds: '+180'}, {line: '4.5', odds: '+160'}, {line: '5', odds: '+140'}]
                break;

              case '6':
                oddsArr = [{line: '6', odds: '+180'}, {line: '6.5', odds: '+160'}, {line: '7', odds: '+140'}]
                break;

              default:
                console.log('invalid teaser line')
                break;
            }
            break;

          case 4:
            switch(initialTeaserVal) {
              case '4':
                oddsArr = [{line: '4', odds: '+300'}, {line: '4.5', odds: '+250'}, {line: '5', odds: '+200'}]
                break;

              case '6':
                oddsArr = [{line: '6', odds: '+300'}, {line: '6.5', odds: '+250'}, {line: '7', odds: '+200'}]
                break;

              default:
                console.log('invalid teaser line')
                break;
            }
            break;

          case 5:
            switch(initialTeaserVal) {
              case '4':
                oddsArr = [{line: '4', odds: '+450'}, {line: '4.5', odds: '+400'}, {line: '5', odds: '+350'}]
                break;

              case '6':
                oddsArr = [{line: '6', odds: '+450'}, {line: '6.5', odds: '+400'}, {line: '7', odds: '+350'}]
                break;

              default:
                console.log('invalid teaser line')
                break;
            }
            break;

          case 6:
            switch(initialTeaserVal) {
              case '4':
                oddsArr = [{line: '4', odds: '+600'}, {line: '4.5', odds: '+550'}, {line: '5', odds: '+500'}]
                break;

              case '6':
                oddsArr = [{line: '6', odds: '+600'}, {line: '6.5', odds: '+550'}, {line: '7', odds: '+500'}]
                break;

              default:
                console.log('invalid teaser line')
                break;
            }
            break;

          case 7:
            switch(initialTeaserVal) {
              case '4':
                oddsArr = [{line: '4', odds: '+1000'}, {line: '4.5', odds: '+900'}, {line: '5', odds: '+800'}]
                break;

              case '6':
                oddsArr = [{line: '6', odds: '+1000'}, {line: '6.5', odds: '+900'}, {line: '7', odds: '+800'}]
                break;

              default:
                console.log('invalid teaser line')
                break;
            }
            break;

          case 8:
            switch(initialTeaserVal) {
              case '4':
                oddsArr = [{line: '4', odds: '+1500'}, {line: '4.5', odds: '+1200'}, {line: '5', odds: '+1000'}]
                break;

              case '6':
                oddsArr = [{line: '6', odds: '+1500'}, {line: '6.5', odds: '+1200'}, {line: '7', odds: '+1000'}]
                break;

              default:
                console.log('invalid teaser line')
                break;
            }
            break;

          case 9:
            switch(initialTeaserVal) {
              case '4':
                oddsArr = [{line: '4', odds: '+2000'}, {line: '4.5', odds: '+1500'}, {line: '5', odds: '+1200'}]
                break;

              case '6':
                oddsArr = [{line: '6', odds: '+2000'}, {line: '6.5', odds: '+1500'}, {line: '7', odds: '+1200'}]
                break;

              default:
                console.log('invalid teaser line')
                break;
            }
            break;

          case 10:
            switch(initialTeaserVal) {
              case '4':
                oddsArr = [{line: '4', odds: '+2500'}, {line: '4.5', odds: '+2000'}, {line: '5', odds: '+1500'}]
                break;

              case '6':
                oddsArr = [{line: '6', odds: '+2500'}, {line: '6.5', odds: '+2000'}, {line: '7', odds: '+1500'}]
                break;

              default:
                console.log('invalid teaser line')
                break;
            }
            break;

          default:
            console.log('invalid number of bets')
            break;
        }
        return oddsArr;
      }

      const generateActiveTeaserLine = (line, type, sport, initial, teaserVal) => {
        let activeLine = '';
        switch(type) {
          case 'Spread':
          case 'TotalUnder':
            activeLine = (parseFloat(line) + parseFloat(teaserVal)).toString()
            break;

          case 'TotalOver':
            activeLine = (parseFloat(line) - parseFloat(teaserVal)).toString()
            break;

          default:
            console.log('unable to perform active teaser line')
        }
        return activeLine;
      }


      const generateAltLines = (line, type, total) => {
        let altLinesArr = [{}, {}, {}, {}, {}]
        let newLinesArr = [];
        console.log(type)

        const calculateNewLine = (initialLine, index, operator, total) => {
          console.log('newlin')
          let tempLine = 0;
          let newLine;
          if (operator === 'plus') {
            tempLine = (parseFloat(initialLine) + (index / 2))
          } else {
            tempLine = (parseFloat(initialLine) - (index / 2))
          }

          if (tempLine > 0 && total !== 'total') {
            console.log('inside')
            tempLine.toString();
            newLine = `+${ tempLine }`
          } else {
            newLine = tempLine.toString();
          }
          return newLine;
        }

        const calculateNewOdds = (initialOdds, index) => {
          let newOdds = (parseFloat(initialOdds) - (index * 10))
          if (newOdds < 100 && initialOdds >= 100) {
            newOdds -= 200;
          }

          if (newOdds > 0) {
            newOdds.toString()
            let tempOdds = `+${newOdds}`
            newOdds = tempOdds
          } else {
            newOdds.toString();
          }
          return newOdds;
        }

        switch (type) {
          case 'Spread':
            newLinesArr = altLinesArr.map((altLine, i) => (
              altLine = {
                line: calculateNewLine(line.line, i, 'plus', 'spread'),
                odds: calculateNewOdds(line.odds, i)
              }
            ))
            return newLinesArr;

          case 'TotalOver':
            newLinesArr = altLinesArr.map((altLine, i) => (
              altLine = {
                line: calculateNewLine(line.line, i, 'minus', 'total'),
                odds: calculateNewOdds(line.odds, i)
              }
            ))
            return newLinesArr;

          case 'TotalUnder':
            newLinesArr = altLinesArr.map((altLine, i) => (
              altLine = {
                line: calculateNewLine(line.line, i, 'plus', 'total'),
                odds: calculateNewOdds(line.odds, i)
              }
            ))
            return newLinesArr;
          default:
            console.log('none selected')
            break;
        }
      }

      const calculateOdds = (oddsArr, type, teaserVal) => {
        let totalOdds = 1;
        console.log(oddsArr)
        switch(type) {
          case 'Straight':
            oddsArr.map((odds, i) => {
              console.log(odds)
              if (odds[0] === '-') {
                let decOdds = Math.abs(parseFloat(odds))
                let decCalc = ((decOdds + 100) / decOdds).toFixed(2)
                totalOdds *= decCalc
                console.log(totalOdds)
              } else {
                let decOdds = parseFloat(odds)
                let decCalc = ((decOdds + 100) / 100).toFixed(2)
                totalOdds *= decCalc
              }
            return totalOdds - 1;
            })
            // totalOdds -= 1;
            return totalOdds - 1;

          case 'Parlay':
            oddsArr.map((odds, i) => {
              if (odds[0] === '-') {
                let decOdds = Math.abs(parseFloat(odds))
                let decCalc = ((decOdds + 100) / decOdds).toFixed(2)
                totalOdds *= decCalc
              } else {
                let decOdds = parseFloat(odds)
                let decCalc = ((decOdds + 100) / 100).toFixed(2)
                totalOdds *= decCalc
              }
              return totalOdds - 1;
            })
            // totalOdds -= 1;
            return totalOdds - 1;

          case 'Teaser':
            const numBets = oddsArr.length;
            // console.log(numBets)
            // console.log(teaserVal)
            switch (numBets) {
              case 2:
                switch(teaserVal) {
                  case '4':
                    break;

                  case '4.5':
                  case '6.5':
                    totalOdds *= (10/12)
                    break;

                  case '5':
                  case '7':
                    totalOdds *= (10/13);
                    break;

                  case '6':
                    totalOdds *= (10/11);
                    break;

                  default:
                    console.log('invalid teaser line')
                    break;
                }
                break;

              case 3:
                switch(teaserVal) {
                  case '4':
                  case '6':
                    totalOdds *= (9/5)
                    break;

                  case '4.5':
                  case '6.5':
                    totalOdds *= (8/5)
                    break;

                  case '5':
                  case '7':
                    totalOdds *= (7/5);
                    break;

                  default:
                    console.log('invalid teaser line')
                    break;
                }
                break;

              case 4:
                switch(teaserVal) {
                  case '4':
                  case '6':
                    totalOdds *= (3/1)
                    break;

                  case '4.5':
                  case '6.5':
                    totalOdds *= (5/2)
                    break;

                  case '5':
                  case '7':
                    totalOdds *= (2/1);
                    break;

                  default:
                    console.log('invalid teaser line')
                    break;
                }
                break;

              case 5:
                switch(teaserVal) {
                  case '4':
                  case '6':
                    totalOdds *= (9/2)
                    break;

                  case '4.5':
                  case '6.5':
                    totalOdds *= (4/1)
                    break;

                  case '5':
                  case '7':
                    totalOdds *= (7/2);
                    break;

                  default:
                    console.log('invalid teaser line')
                    break;
                }
                break;

              case 6:
                switch(teaserVal) {
                  case '4':
                  case '6':
                    totalOdds *= (6/1)
                    break;

                  case '4.5':
                  case '6.5':
                    totalOdds *= (11/2)
                    break;

                  case '5':
                  case '7':
                    totalOdds *= (5/1);
                    break;

                  default:
                    console.log('invalid teaser line')
                    break;
                }
                break;

              case 7:
                switch(teaserVal) {
                  case '4':
                  case '6':
                    totalOdds *= (10/1)
                    break;

                  case '4.5':
                  case '6.5':
                    totalOdds *= (9/1)
                    break;

                  case '5':
                  case '7':
                    totalOdds *= (8/1);
                    break;

                  default:
                    console.log('invalid teaser line')
                    break;
                }
                break;

              case 8:
                switch(teaserVal) {
                  case '4':
                  case '6':
                    totalOdds *= (15/1)
                    break;

                  case '4.5':
                  case '6.5':
                    totalOdds *= (12/1)
                    break;

                  case '5':
                  case '7':
                    totalOdds *= (10/1);
                    break;

                  default:
                    console.log('invalid teaser line')
                    break;
                }
                break;

              case 9:
                switch(teaserVal) {
                  case '4':
                  case '6':
                    totalOdds *= (20/1)
                    break;

                  case '4.5':
                  case '6.5':
                    totalOdds *= (15/1)
                    break;

                  case '5':
                  case '7':
                    totalOdds *= (12/1);
                    break;

                  default:
                    console.log('invalid teaser line')
                    break;
                }
                break;

              case 10:
                switch(teaserVal) {
                  case '4':
                  case '6':
                    totalOdds *= (25/1)
                    break;

                  case '4.5':
                  case '6.5':
                    totalOdds *= (20/1)
                    break;

                  case '5':
                  case '7':
                    totalOdds *= (15/1);
                    break;

                  default:
                    console.log('invalid teaser line')
                    break;
                }
                break;

              default:
                console.log('invalid number of bets')
                break;
            }
            break;

          default:
            console.log('no bet type encountered')
        }
        return totalOdds;
      }


      if (clickData !== "") {
        // console.log(clickData.type.type)
        switch (clickData.type.type) {
          case 'Straight':
            if (clickData.operation !== 'remove') {
              setSlips((prevSlips) => ([...prevSlips, {
                betUID: [clickData.slipData.id],
                gameUID: [clickData.slipData.gameUID],
                type: clickData.type.type,
                quantity: {
                  completed: 0,
                  total: 1
                },
                payout: {
                  totalOdds: clickData.slipData.odds,
                  odds: {american: clickData.slipData.odds, dec: calculateOdds([clickData.slipData.odds], 'Straight'), oddsArr: [clickData.slipData.odds]},
                  oddsArr: [clickData.slipData.odds],
                  decOdds: calculateOdds([clickData.slipData.odds], 'Straight'),
                  toLose: 0,
                  toWin: "",
                  final: ""
                },
                slips: {
                  keys: {
                    [`${ clickData.slipData.id }`]: {
                      gameUID: clickData.data.gameUID,
                      betUID: clickData.slipData.id,
                      betType: clickData.slipData.type,
                      team: clickData.slipData.team,
                      line: clickData.slipData.line,
                      alternateLines: generateAltLines({line: clickData.slipData.line, odds: clickData.slipData.odds}, clickData.slipData.type),
                      odds: {num: clickData.slipData.odds, dec: calculateOdds([clickData.slipData.odds], 'Straight')},
                      status: 'Active',
                      teams: {away: clickData.data.game.odds.full.away_team, home: clickData.data.game.odds.full.home_team},
                      description: clickData.slipData.description,
                      icon: sportClasses[`${ clickData.slipData.sport }`]
                    }
                  }
                }
              }]))
            } else {
              const newList = slips.filter((slip, id) => slip.betUID[0] !== clickData.slipData.id);
              calculateSlipTotals(newList)
              setSlips(newList);
            }
            break;
          case 'Parlay':
            if (clickData.type.new === true) {
              console.log('inside parlay new')
              setSlips((prevSlips) => ([...prevSlips, {
                betUID: [clickData.slipData.id],
                gameUID: [clickData.slipData.gameUID],
                type: clickData.type.type,
                quantity: {
                  completed: 0,
                  total: 1
                },
                payout: {
                  totalOdds: clickData.slipData.odds,
                  odds: {american: clickData.slipData.odds, dec: calculateOdds([clickData.slipData.odds], 'Parlay'), oddsArr: [clickData.slipData.odds]},
                  decOdds: calculateOdds([clickData.slipData.odds], 'Parlay'),
                  oddsArr: [clickData.slipData.odds],
                  toLose: 0,
                  toWin: "",
                  final: ""
                },
                slips: {
                  keys: {
                    [`${ clickData.slipData.id }`]: {
                      gameUID: clickData.data.gameUID,
                      betUID: clickData.slipData.id,
                      betType: clickData.slipData.type,
                      team: clickData.slipData.team,
                      line: clickData.slipData.line,
                      alternateLines: generateAltLines({line: clickData.slipData.line, odds: clickData.slipData.odds}, clickData.slipData.type),
                      odds: {num: clickData.slipData.odds, dec: calculateOdds([clickData.slipData.odds], 'Parlay')},
                      status: 'Active',
                      teams: {away: clickData.data.game.odds.full.away_team, home: clickData.data.game.odds.full.home_team},
                      description: clickData.slipData.description,
                      icon: sportClasses[`${ clickData.slipData.sport }`]
                    }
                  }
                }
              }]))
            } else if (clickData.special.value === true) {
              if (clickData.operation.type === 'remove') {
                let allSlips = slips;
                let slip = {...slips[clickData.special.slipID]}
                if (slip.quantity.total === 1) {
                  let newSlips = slips.filter((slip, id) => id !== clickData.special.slipID)
                  calculateSlipTotals(newSlips)
                  setSlips(newSlips)
                } else {
                  slip.betUID = slip.betUID.filter((UID, id) => id !== clickData.operation.index)
                  slip.gameUID = slip.gameUID.filter((UID, id) => id !== clickData.operation.index)
                  slip.payout.oddsArr = slip.payout.oddsArr.filter((odds, id) => id !== clickData.operation.index)
                  slip.quantity.total -= 1
                  delete slip.slips.keys[`${clickData.slipData.id}`]
                  let newOdds = calculateOdds(slip.payout.oddsArr, 'Parlay')
                  slip.payout.odds.american = parseInt(newOdds * 100)
                  slip.payout.odds.dec = newOdds;
                  slip.payout.totalOdds = newOdds;
                  slip.payout.decOdds = newOdds;
                  if (parseFloat(slip.payout['toLose']) >= 5) {
                    slip.payout['toWin'] = (parseFloat(slip.payout.toLose) * slip.payout.decOdds).toFixed(2).toString()
                  } else {
                    slip.payout['toWin'] = 0
                  }
                  allSlips[clickData.special.slipID] = slip
                  calculateSlipTotals(allSlips)
                  setSlips(allSlips);
                }
              } else {
                let allSlips = slips;
                let slip = {...slips[clickData.special.slipID]}
                slip.betUID.push(clickData.slipData.id)
                slip.gameUID.push(clickData.slipData.gameUID)
                slip.slips.keys[`${ clickData.slipData.id }`] = {
                  gameUID: clickData.data.gameUID,
                  betUID: clickData.slipData.id,
                  betType: clickData.slipData.type,
                  team: clickData.slipData.team,
                  line: clickData.slipData.line,
                  alternateLines: generateAltLines({line: clickData.slipData.line, odds: clickData.slipData.odds}, clickData.slipData.type),
                  odds: {num: clickData.slipData.odds, dec: calculateOdds([clickData.slipData.odds], 'Parlay')},
                  status: 'Active',
                  teams: {away: clickData.data.game.odds.full.away_team, home: clickData.data.game.odds.full.home_team},
                  description: clickData.slipData.description,
                  icon: sportClasses[`${ clickData.slipData.sport }`]
                }
                slip.quantity['total'] = Object.keys(slip.slips.keys).length
                slip.payout.oddsArr.push(clickData.slipData.odds)
                let newOdds = calculateOdds(slip.payout.oddsArr, 'Parlay');
                slip.payout.odds.american = parseInt(newOdds * 100)
                slip.payout.odds.dec = newOdds
                slip.payout['totalOdds'] = newOdds
                slip.payout['decOdds'] = newOdds
                if (parseFloat(slip.payout['toLose']) >= 5) {
                  slip.payout['toWin'] = (parseFloat(slip.payout.toLose) * slip.payout.decOdds).toFixed(2).toString()
                } else {
                  slip.payout['toWin'] = 0
                }
                allSlips[clickData.special.slipID] = slip;
                setSlips(allSlips)
              }
            } else if (clickData.operation.type === 'remove' && clickData.special.value === false) {
              let allSlips = slips;
              let allSlipsLength = slips.length - 1;
              let slip = {...slips[allSlips.length - 1]}
              if (slip.quantity.total === 1) {
                let newSlips = slips.filter((slip, id) => id !== allSlipsLength)
                calculateSlipTotals(newSlips)
                setSlips(newSlips)
              } else {
                console.log(clickData.operation.index);
                let tempBetUID = slip.betUID.filter((UID, id) => id !== clickData.operation.index)
                let tempGameUID = slip.gameUID.filter((UID, id) => id !== clickData.operation.index)
                let tempOddsArr = slip.payout.oddsArr.filter((odds, id) => id !== clickData.operation.index)
                slip.betUID = tempBetUID;
                slip.gameUID = tempGameUID;
                slip.payout.oddsArr = tempOddsArr;
                slip.quantity.total -= 1
                delete slip.slips.keys[`${clickData.slipData.id}`]
                let newOdds = calculateOdds(slip.payout.oddsArr, 'Parlay')
                slip.payout.odds.american = parseInt(newOdds * 100)
                slip.payout.odds.dec = newOdds;
                slip.payout.totalOdds = newOdds;
                slip.payout.decOdds = newOdds;
                if (parseFloat(slip.payout['toLose']) >= 5) {
                  slip.payout['toWin'] = (parseFloat(slip.payout.toLose) * slip.payout.decOdds).toFixed(2).toString()
                } else {
                  slip.payout['toWin'] = 0
                }
                allSlips[allSlipsLength] = slip
                calculateSlipTotals(allSlips)
                setSlips(allSlips);
              }
            } else {
              let allSlips = slips;
              let slip = {...slips[allSlips.length - 1]}
              slip.betUID.push(clickData.slipData.id)
              slip.gameUID.push(clickData.slipData.gameUID)
              slip.slips.keys[`${ clickData.slipData.id }`] = {
                gameUID: clickData.data.gameUID,
                betUID: clickData.slipData.id,
                betType: clickData.slipData.type,
                team: clickData.slipData.team,
                line: clickData.slipData.line,
                alternateLines: generateAltLines({line: clickData.slipData.line, odds: clickData.slipData.odds}, clickData.slipData.type),
                odds: {num: clickData.slipData.odds, dec: calculateOdds([clickData.slipData.odds], 'Parlay')},
                status: 'Active',
                teams: {away: clickData.data.game.odds.full.away_team, home: clickData.data.game.odds.full.home_team},
                description: clickData.slipData.description,
                icon: sportClasses[`${ clickData.slipData.sport }`]
              }
              slip.quantity['total'] = Object.keys(slip.slips.keys).length
              slip.payout.oddsArr.push(clickData.slipData.odds)
              slip.payout.odds.american = parseInt((calculateOdds(slip.payout.oddsArr, 'Parlay') * 100))
              slip.payout.odds.dec = calculateOdds(slip.payout.oddsArr, 'Parlay')
              slip.payout['totalOdds'] = calculateOdds(slip.payout.oddsArr, 'Parlay')
              slip.payout['decOdds'] = calculateOdds(slip.payout.oddsArr, 'Parlay')
              if (parseFloat(slip.payout['toLose']) >= 5) {
                slip.payout['toWin'] = (parseFloat(slip.payout.toLose) * slip.payout.decOdds).toFixed(2).toString()
              } else {
                slip.payout['toWin'] = 0
              }
              // slip.type.new = false;
              allSlips[allSlips.length - 1] = slip;
              setSlips(allSlips)
              // console.log(slip)
            }
            break;

          case 'Teaser':
            if (clickData.type.new) {
              setSlips((prevSlips) => ([...prevSlips, {
                betUID: [clickData.slipData.id],
                gameUID: [clickData.slipData.gameUID],
                type: clickData.type.type,
                alternateLines: [],
                initialTeaserVal: clickData.teaserVal,
                teaserVal: clickData.teaserVal,
                // teaserVal: '4.5',
                quantity: {
                  completed: 0,
                  total: 1
                },
                payout: {
                  totalOdds: clickData.slipData.odds,
                  decOdds: calculateOdds([clickData.slipData.odds], 'Teaser', clickData.teaserVal),
                  odds: {american: clickData.slipData.odds, dec: calculateOdds([clickData.slipData.odds], 'Teaser'), oddsArr: [clickData.slipData.odds]},
                  oddsArr: [clickData.slipData.odds],
                  toLose: 0,
                  toWin: "",
                  final: ""
                },
                slips: {
                  keys: {
                    [`${ clickData.slipData.id }`]: {
                      gameUID: clickData.data.gameUID,
                      betUID: clickData.slipData.id,
                      betType: clickData.slipData.type,
                      team: clickData.slipData.team,
                      // line: clickData.slipData.line,
                      initialLine: clickData.slipData.line,
                      line: generateActiveTeaserLine(clickData.slipData.line, clickData.slipData.type, clickData.slipData.sport, true, clickData.teaserVal),
                      odds: {num: clickData.slipData.odds, dec: calculateOdds([clickData.slipData.odds], 'Teaser')}, 
                      status: 'Active',
                      teams: {away: clickData.data.game.odds.full.away_team, home: clickData.data.game.odds.full.home_team},
                      description: clickData.slipData.description,
                      icon: sportClasses[`${ clickData.slipData.sport }`]
                    }
                  }
                }
              }]))
            } else if (clickData.special.value === true) {
              console.log('special')
              if (clickData.operation.type === 'remove') {
                let allSlips = slips;
                let slip = {...slips[clickData.special.slipID]}
                if (slip.quantity.total === 1) {
                  let newSlips = slips.filter((slip, id) => id !== clickData.special.slipID)
                  calculateSlipTotals(newSlips)
                  setSlips(newSlips)
                } else {
                  slip.betUID = slip.betUID.filter((UID, id) => id !== clickData.operation.index)
                  slip.gameUID = slip.gameUID.filter((UID, id) => id !== clickData.operation.index)
                  slip.payout.oddsArr = slip.payout.oddsArr.filter((odds, id) => id !== clickData.operation.index)
                  slip.quantity.total -= 1
                  delete slip.slips.keys[`${clickData.slipData.id}`]
                  let newOdds = calculateOdds(slip.payout.oddsArr, 'Teaser', slip.teaserVal)
                  slip.alternateLines = generateTeaserAltLines(slip.initialTeaserVal, slip.quantity.total)
                  slip.payout.odds.american = parseInt(newOdds * 100)
                  slip.payout.odds.dec = newOdds;
                  slip.payout.totalOdds = newOdds;
                  slip.payout.decOdds = newOdds;
                  if (parseFloat(slip.payout['toLose']) >= 5) {
                    slip.payout['toWin'] = (parseFloat(slip.payout.toLose) * slip.payout.decOdds).toFixed(2).toString()
                  } else {
                    slip.payout['toWin'] = 0
                  }
                  allSlips[clickData.special.slipID] = slip
                  calculateSlipTotals(allSlips)
                  setSlips(allSlips);
                }
              } else {
                console.log('after special')
                let allSlips = slips;
                let slip = {...slips[clickData.special.slipID]};
                slip.betUID.push(clickData.slipData.id);
                slip.gameUID.push(clickData.slipData.gameUID);
                slip.payout.oddsArr.push(clickData.slipData.odds);
                const newOdds = calculateOdds(slip.payout.oddsArr, 'Teaser', slip.teaserVal);
                console.log(newOdds)
                slip.slips.keys[`${ clickData.slipData.id }`] = {
                  gameUID: clickData.data.gameUID,
                  betUID: clickData.slipData.id,
                  betType: clickData.slipData.type,
                  team: clickData.slipData.team,
                  // line: clickData.slipData.line,
                  initialLine: clickData.slipData.line,
                  line: generateActiveTeaserLine(clickData.slipData.line, clickData.slipData.type, clickData.slipData.sport, true, slip.teaserVal),
                  odds: {num: clickData.slipData.odds, dec: newOdds},
                  status: 'Active',
                  teams: {away: clickData.data.game.odds.full.away_team, home: clickData.data.game.odds.full.home_team},
                  description: clickData.slipData.description,
                  icon: sportClasses[`${ clickData.slipData.sport }`]
                }
                slip.payout.odds.american = parseInt(newOdds * 100)
                slip.payout.odds.dec = newOdds
                slip.quantity['total'] = Object.keys(slip.slips.keys).length
                slip.alternateLines = generateTeaserAltLines(slip.initialTeaserVal, slip.quantity.total)
                slip.payout['totalOdds'] = newOdds
                slip.payout['decOdds'] = newOdds
                if (parseFloat(slip.payout['toLose']) >= 5) {
                  slip.payout['toWin'] = (parseFloat(slip.payout.toLose) * slip.payout.decOdds).toFixed(2).toString()
                } else {
                  slip.payout['toWin'] = 0
                }
                allSlips[clickData.special.slipID] = slip;
                setSlips(allSlips)
              }
            } else if (clickData.operation.type === 'remove' && clickData.special.value === false) {
              let allSlips = slips;
              let allSlipsLength = slips.length - 1;
              let slip = {...slips[allSlips.length - 1]}
              if (slip.quantity.total === 1) {
                let newSlips = slips.filter((slip, id) => id !== allSlipsLength)
                calculateSlipTotals(newSlips)
                setSlips(newSlips)
              } else {
                let tempBetUID = slip.betUID.filter((UID, id) => id !== clickData.operation.index)
                let tempGameUID = slip.gameUID.filter((UID, id) => id !== clickData.operation.index)
                let tempOddsArr = slip.payout.oddsArr.filter((odds, id) => id !== clickData.operation.index)
                slip.betUID = tempBetUID;
                slip.gameUID = tempGameUID;
                slip.payout.oddsArr = tempOddsArr;
                console.log(clickData.operation.index);
                // slip.betUID.filter((UID, id) => id != clickData.operation.index)
                // slip.gameUID.filter((UID, id) => id != clickData.operation.index)
                slip.quantity.total -= 1
                // slip.payout.oddsArr.filter((odds, id) => id != clickData.operation.index)
                delete slip.slips.keys[`${clickData.slipData.id}`]
                let newOdds = calculateOdds(slip.payout.oddsArr, 'Teaser', slip.teaserVal)
                slip.alternateLines = generateTeaserAltLines(slip.initialTeaserVal, slip.quantity.total)
                slip.payout.odds.american = parseInt(newOdds * 100)
                slip.payout.odds.dec = newOdds;
                slip.payout.totalOdds = newOdds;
                slip.payout.decOdds = newOdds;
                if (parseFloat(slip.payout['toLose']) >= 5) {
                  slip.payout['toWin'] = (parseFloat(slip.payout.toLose) * slip.payout.decOdds).toFixed(2).toString()
                } else {
                  slip.payout['toWin'] = 0
                }
                allSlips[allSlipsLength] = slip
                calculateSlipTotals(allSlips)
                setSlips(allSlips);
              }
            } else {
              console.log('last resort')
              let allSlips = slips;
              let slip = {...slips[allSlips.length - 1]}
              slip.betUID.push(clickData.slipData.id)
              slip.gameUID.push(clickData.slipData.gameUID)
              slip.payout.oddsArr.push(clickData.slipData.odds)
              const newOdds = calculateOdds(slip.payout.oddsArr, 'Teaser', slip.teaserVal)
              console.log(newOdds)
              slip.slips.keys[`${ clickData.slipData.id }`] = {
                gameUID: clickData.data.gameUID,
                betUID: clickData.slipData.id,
                betType: clickData.slipData.type,
                team: clickData.slipData.team,
                // line: clickData.slipData.line,
                initialLine: clickData.slipData.line,
                line: generateActiveTeaserLine(clickData.slipData.line, clickData.slipData.type, clickData.slipData.sport, true, slip.teaserVal),
                odds: {num: clickData.slipData.odds, dec: newOdds},
                status: 'Active',
                teams: {away: clickData.data.game.odds.full.away_team, home: clickData.data.game.odds.full.home_team},
                description: clickData.slipData.description,
                icon: sportClasses[`${ clickData.slipData.sport }`]
              }
              console.log(slip.slips)
              slip.payout.odds.american = parseInt(newOdds * 100)
              slip.payout.odds.dec = newOdds
              slip.quantity['total'] = Object.keys(slip.slips.keys).length
              slip.alternateLines = generateTeaserAltLines(slip.initialTeaserVal, slip.quantity.total)
              slip.payout['totalOdds'] = newOdds
              slip.payout['decOdds'] = newOdds
              if (parseFloat(slip.payout['toLose']) >= 5) {
                slip.payout['toWin'] = (parseFloat(slip.payout.toLose) * slip.payout.decOdds).toFixed(2).toString()
              } else {
                slip.payout['toWin'] = 0
              }
              allSlips[allSlips.length - 1] = slip;
              setSlips(allSlips)
              // console.log(slip)
            }
            break;

          default:
            console.log("Invalid Type")
        }
      }
    }

    currSlip().then(() => {setIsLoading(false)})
  // }, [props.data])
  }, [props.data])

  // useEffect(() => {

  // }, [setError])
  // console.log('here')
  // console.log(slipState)
  // console.log(submittedSlips.length)
  // console.log(isLoading)
  // console.log(slips.length)
  // console.log(slips)
  console.log(props.slips)
  return (
    <div className='slip-container'>
      <div className='slip-header'>
        <div className='slip-title'>SLIPS</div>
      </div>
      <div className='slip-tabs'>
        <Button
          onClick={handleClick}
          id='slip-tab-cart'
          type='button'
          className={slipState === 'cart' ? 'slip-tab slip-tab-focus' : 'slip-tab slip-tab-unfocus'}
        >
        CART ({slips.length})
        </Button>
        <Button
          onClick={handleClick}
          id='slip-tab-active'
          type='button'
          className={slipState === 'active' ? 'slip-tab slip-tab-focus' : 'slip-tab slip-tab-unfocus'}
        >
        ACTIVE ({props.slips.active.length})
        </Button>
      </div>

      {
        (slipState === 'cart' && submittedSlips.length < 1 && isLoading === false && slips.length < 1) ?
            <div className='empty-slip-container'>
              <FontAwesomeIcon icon={faCartShopping} />
              {/* <span><i id='empty-slip-image' className='fa fa-shopping-cart' aria-hidden="true"></i></span> */}
            </div>
        : ''
      }

      {
        (slipState === 'cart' && submittedSlips.length < 1 && isLoading === false && slips.length > 0) ?
          <div className='slip-container-body'>
            {slips.map((slip, i) => {
              if ((slip.type !== 'Straight') && (i < slipLength - 1)) {
                return (
                  <BetSlip key={i} data={slip} id={i} slips={slips} addBet='true' onAddRetroactive={handleAddRetroactive} passSetLoading={setIsLoading} passSetSlips={setSlips} passLine={handleLineAdjustment} passTeaserLine={handleTeaserAdjustment} onRemoveMulti={handleDeleteMulti} onRemove={handleDelete} onSubmit={handleSubmit} onChange={handleChange} toWin={toWin} />
                )
              } else {
                return (
                  <BetSlip key={i} data={slip} id={i} slips={slips} addBet='false' passSetLoading={setIsLoading} passSetSlips={setSlips} passLine={handleLineAdjustment} passTeaserLine={handleTeaserAdjustment} onRemoveMulti={handleDeleteMulti} onRemove={handleDelete} onSubmit={handleSubmit} onChange={handleChange} toWin={toWin} />
                )
              }
            })}
          </div>
          : ''
      }

      {
        (slipState === 'cart' && submittedSlips.length < 1 && isLoading === false && slips.length > 0) ?
          <div className='slip-summary-section'>
            <div className='slip-total-money'>
              <div className='slip-total-money-wager'>
              ${!isNaN(slipTotalMoney.wager) ? slipTotalMoney.wager : '0'}
                <br />
                <label><b>Total Wager</b></label>
              </div>
              <div className='slip-total-money-payout'>
                ${!isNaN(slipTotalMoney.payout) ? slipTotalMoney.payout : '0'}
                <br />
                <label><b>Total Payout</b></label>
              </div>
            </div>
            <div className='slip-buttons'>
              <Button
                onClick={handleClear}
                id={props.id}
                type='button'
                className='slip-button'
              >
                CANCEL
              </Button>
              {
                <Button
                  onClick={handleSubmit}
                  className='slip-button'
                  type='button'
                  // id='submit-slip'
                >
                  {slips.length > 1 ? 'PLACE BETS' : 'PLACE BET'}
                </Button>
              }
            </div>
          </div>
        : ''
      }

      {/* {
        (submittedSlips.length > 0 && slipState === 'cart') ?
          slips.map((slip, i) => {
            return (
              <div className='slip-container-body'>
                <BetSlipConfirm data={slip} />
              </div>
            )
          })
        : null
      } */}
      {
        (submittedSlips.length > 0 && slipState === 'cart') ?
          <div className='slip-container-body'>
            {slips.map((slip, i) => {
              return (
                <BetSlipConfirm data={slip} />
              )
            })}
          </div>
        : null
      }


      {
        slipState === 'active' ?
          <div className='slip-container-body-active'>
          {props.slips.active.map((slip, i) => {
            if (slip.status === 'Active') {
              return (
                // <BetSlip key={i} data={slip} id={i} slips={slips} addBet='true' onAddRetroactive={handleAddRetroactive} passSetLoading={setIsLoading} passSetSlips={setSlips} passLine={handleLineAdjustment} passTeaserLine={handleTeaserAdjustment} onRemoveMulti={handleDeleteMulti} onRemove={handleDelete} onSubmit={handleSubmit} onChange={handleChange} toWin={toWin} />
                <BetSlipActive data={slip} />
              )
            }
            return ''
          })}
        </div>
          // <BetSlipActive data={slipData} passSlipState={setSlipState} passSlipData={setSlipData} />
        : ''
      }
    </div>
  );
};

export default BetSlipContainer;
