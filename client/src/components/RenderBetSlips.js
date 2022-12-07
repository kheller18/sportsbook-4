// import React, { useEffect, useState } from 'react';
// // import '../styles/BetSlip.css';
// import API from '../utils/API';
// import BetSlip from './BetSlip';
// import Button from './Button';
// import BetSlipConfirm from './BetSlipConfirm'

// const RenderBetSlips = (props) => {
//   const [toLose, setToLose] = useState(0);
//   const [toWin, setToWin] = useState();
//   let newSlips = props.data;
//   // let tempSlipList = [];
//   const slipSend = [];
//   let totalToWin = 0;
//   let totalToLose = 0.00;
//   // const [submitSlips, setSubmitSlips] = useState([]);
//   const [slipList, setSlipList] = useState([]);
//   const [submittedSlips, setSubmittedSlips] = useState([])
//   // const [isSubmitted, setIsSubmitted] = useState(false)
//   // const [loading, IsLoading] = useState(true);

//   const handleDelete = (e) => {
//     let newList = slipList.filter((slip, id) => id != e.target.id);
//     setSlipList(newList);
//     newSlips = {};
//   }

//   const handleClear = () => {
//     newSlips = {};
//     setSlipList([]);
//   }

//   const handleChange = (e, data) => {
//     switch (data.odds.toString()[0]) {
//       case '-':
//         let tempCalc = Math.abs(e.target.value * data.odds * .01);
//         let finalCalc = tempCalc - e.target.value;
//         setToLose(e.target.value)
//         data.toLose = e.target.value;
//         setToWin((e.target.value - finalCalc).toFixed(2));
//         data.toWin=(e.target.value - finalCalc).toFixed(2);
//         break;
//       default:
//         setToLose(e.target.value);
//         data.toLose = e.target.value;
//         setToWin((e.target.value * data.odds * .01).toFixed(2));
//         data.toWin = (e.target.value * data.odds * .01).toFixed(2)
//         break;
//     };
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     event.persist();
//     const userData = JSON.parse(localStorage.getItem('user'));

//     const slipData = async () => {
//       let send = true;
//       slipList.map(slip => {
//         if (slip.slipData.toLose === '' || slip.slipData.toLose < 5) {
//           send = false;
//         } else {
//           slipSend.push({
//             userId: userData._id,
//             gameKey: slip.data.gameUID,
//             betKey: slip.slipData.id,
//             betType: slip.slipData.type,
//             team: slip.slipData.team,
//             line: parseFloat(slip.slipData.line),
//             odds: slip.slipData.odds,
//             toLose: slip.slipData.toLose,
//             toWin: slip.slipData.toWin,
//             status: slip.slipData.status,
//             outcome: slip.slipData.outcome,
//             payout: slip.slipData.payout
//           })
//         }
//       })

//       if (send) {
//         return Promise.all(slipSend.map(slip => API.submitBetSlip(slip)))
//       }
//     }

//     slipData()
//       .then(data => {
//         console.log(data)
//         setSubmittedSlips(slipList)
//         setTimeout(() => {
//           setSlipList([])
//           setSubmittedSlips([])
//         }, 4000);

//       })
//       .catch(err => {
//         console.log(err)
//       })
//   };

//   useEffect(() => {
//     if (newSlips === undefined || newSlips === {} || newSlips === null || newSlips===[] || newSlips.length === 0) {
//       // console.log('inside the correct')
//     } else {
//       setSlipList(slipList => [...slipList, newSlips])
//       console.log(newSlips)
//       // console.log("added")
//     }
//   }, [props.data]);

//   console.log(slipList)
//   return (
//     <div className='slip'>
//       {/* {submittedSlips.length} */}
//       {slipList.length === 0 && submittedSlips.length === 0 ?
//         <div className='empty-slip-container'>
//           <span><i id='empty-slip-image' className='fa fa-shopping-cart' aria-hidden="true"></i></span>
//         </div>
//       :
//       ''}

//       {submittedSlips.length > 0 ?
//         <BetSlipConfirm data={submittedSlips} />
//       :
//       ''
//       }

//       {(slipList !== undefined && slipList.length !== 0 && submittedSlips.length === 0) ?
//         // (slipList === undefined || slipList.length === 0) ? '' :
//           slipList.map((slip, i) => {
//             // if (slip.slipData.toLose <= 0) {
//             //   totalToLose = parseFloat(totalToLose)
//             // } else {
//             //   totalToLose += parseFloat(totalToLose + slip.slipData.toLose).toFixed(2);
//             // }
//             totalToLose = parseFloat(totalToLose + slip.slipData.toLose).toFixed(2);
//             return (
//               <div key={slip.data.key}>
//                 <BetSlip data={slip} id={i} onRemove={handleDelete} onSubmit={handleSubmit} onChange={handleChange} toWin={toWin}/>
//               </div>
//             )
//           })
//         :
//         ''
//       }

//       {/* {(slipList === undefined || slipList.length === 0 || slipList === []) ? '' :
//           <div className='slip-total-money'>
//             {totalToLose}
//           </div>
//       } */}

//       {(slipList === undefined || slipList.length === 0 || slipList === []) || submittedSlips.length > 0 ? '' :
//         <div className='slip-buttons'>
//           <Button
//             onClick={handleClear}
//             id={props.id}
//             type='button'
//             className='slip-button'
//           >
//             CANCEL
//           </Button>
//           <Button
//             onClick={handleSubmit}
//             className='slip-button'
//             id='submit-slip'
//           >
//             PLACE BET(S)
//           </Button>
//         </div>
//       }
//     </div>
//   )
// };

// // take the value from the slip, set it to the array here, then re render the whole page using useffect dependency
// export default RenderBetSlips;


//         // let index = slipList.findIndex(x => console.log(x));
//         // if (slipList.length === 1) {
//         //   slipList.map(slip => {
//         //     // console.log(slip)
//         //   })
//         // } else {

//         // }
//         // let slice = slipList.slice(0, parseInt(e.target.id));
//         // console.log(slice);
//         // console.log(slipList)
//         // console.log('slice', slice)


//   // const updateSlip = (id, attributes) => {
//   //   // let index = slipList.findIndex(x => x.id == id);
//   //   // let updateList = slipList.slice()
//   //   // console.log(index);
//   //   // if (index == -1) {

//   //   // } else {
//   //   //   // setSlipList([...])
//   //   // }
//   // }
