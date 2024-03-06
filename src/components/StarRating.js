import {useState} from "react";
import PropTypes from "prop-types";

const starContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px'
}
StarRating.prototype = {
  maxRating: PropTypes.number,
  setUserRating: PropTypes.func,
  userRating: PropTypes.number,
}

function StarRating({userRating, setUserRating, maxRating}) {
  const [temp, setTemp] = useState(0);

  let valueForColor = (temp === 0) ? userRating : temp

  return <div style={starContainer}>
    {Array.from({length: maxRating}, (_, idx) =>
         <Star key={idx}
               fillColor={valueForColor > idx ? "orange" : 'white'}
               width='2.8rem'
               onRate={() => setUserRating(idx + 1)}
               onHoverIn={() => setTemp(idx + 1)}
               onHoverOut={() => setTemp(0)}
         />)}
    <p style={{fontSize: '1.8rem', marginLeft: '0.5rem', padding: 0}}>
      {temp || userRating || ""}</p>
  </div>
}

export default StarRating;

function Star({fillColor, stroke = 'none', onRate, onHoverIn, onHoverOut}) {
  return <span style={{width: '16rem'}}
               onClick={onRate} onMouseEnter={onHoverIn} onMouseLeave={onHoverOut}>
      <svg
           xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 20 20"
           fill={fillColor}
           stroke={stroke}
      >
        <path
             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        />
      </svg>
    </span>
}