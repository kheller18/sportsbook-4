import React, { useState } from 'react';
import Button from './Button';
import '../styles/DropdownButton.css';

const DropdownButton = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  // const [currentLine, setCurrentLine] = useState({line: props.activeLine.line, odds: props.activeLine.odds})
  const altLines = props.altLines;
  let currentLine = props.activeLine

  const handleClick = (e, slip, id) => {
    props.passLine(e, slip, id)
    // setCurrentLine({line: e.target.attributes['line'].value, odds: e.target.attributes['odds'].value})
    setShowDropdown(false)
  }

  // const handleTsrClick = (e, slip, id) => {
  //   props.passTeaserLine(e, slip, id)
  //   // setCurrentLine({line: e.target.attributes['line'].value, odds: e.target.attributes['odds'].value})
  //   setShowDropdown(false);
  // }

  const handleTargetClick = () => {
    showDropdown ? setShowDropdown(false) : setShowDropdown(true);
  }

  return (
    <div className='line-edit-container'>
      <Button
        onClick={handleTargetClick}
        className='target-button'
      >
        <span>{(currentLine.line[0] === '-' || currentLine.line[0] === '+') ? currentLine.line : `+${currentLine.line}`} ({currentLine.odds})&nbsp;<i className="fas fa-chevron-circle-down"></i></span>
      </Button>

      {
        showDropdown ? (
          <div className='dropdown-buttons-slip'>
            {
              altLines.map((altLine, i) => {
                if (parseFloat(altLine.line) !== 0 && props.type !== 'Teaser') {
                  return (
                    <Button key={i} className='dropdown-button-slip' onClick={(e) => handleClick(e, props.data, props.index)} line={altLine.line} odds={altLine.odds} data={altLine.line}>{altLine.line} ({altLine.odds})</Button>
                  )
                } else {
                  return (
                    <Button key={i} className='dropdown-button-slip' onClick={(e) => handleClick(e, props.data)} line={altLine.line} odds={altLine.odds} data={altLine.line}>{altLine.line} ({altLine.odds})</Button>
                  )
                }
              })
            }
          </div>
        ) : null
      }
    </div>
  );
}

export default DropdownButton;
