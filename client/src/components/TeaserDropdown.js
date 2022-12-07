import react, { useState } from 'react';
import Button from './Button';
import '../styles/TeaserDropdown.css';

const TeaserDropdown = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentLine, setCurrentLine] = useState({line: props.activeLine.line, odds: props.activeLine.odds})
  const altLines = props.altLines;


  const handleTargetClick = () => {
    if (showDropdown) {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  }

  return (
    <div className='teaser-edit-container'>
      <Button
        onClick={handleTargetClick}
        className='target-button'
      >
      <span className='target-button-contents'>{currentLine.line} ({currentLine.odds})&nbsp;<i className="fas fa-chevron-circle-down"></i></span>
      </Button>

      {
        showDropdown ? (
          <div className='dropdown-buttons'>
            {
              altLines.map((altLine, i) => {
                // return (
                //   altLine.line
                // )
                if (parseFloat(altLine.line) !== 0) {
                  return (
                    // <Button className='dropdown-button' onClick={(e) => props.passLine(e, props.data, props.slipID)} line={altLine.line} odds={altLine.odds} data={altLine.line}>{altLine.line} {altLine.odds > 0 ? `(+${ altLine.odds })` : (altLine.odds)}</Button>
                    <Button key={i} className='dropdown-button' onClick={(e) => handleClick(e, props.data, props.index)} line={altLine.line} odds={altLine.odds} data={altLine.line}>{altLine.line} ({altLine.odds})</Button>
                  )
                }
              })
            }
          </div>
        ) : null
      }
    </div>
  )
}