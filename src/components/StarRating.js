import {useState} from "react";

function StarRating({userRating, setUserRating}) {
  const [temp, setTemp] = useState();

  let valueForColor = (temp === 0) ? userRating : temp

   return <div>
      {Array.from({length: 10}, (_, idx) =>
           <Star key={idx}
                 fillColor={valueForColor > idx ? "orange" : 'white'}
                 width='2.8rem'
                 onclick={() => setUserRating(idx + 1)}
                 mouseEnter={() => setTemp(idx + 1)}
                 mouseLeave={() => setTemp(0)}
           />)}
   </div>
}

export default StarRating;

function Star({fillColor, stroke='none', width, onclick, mouseEnter, mouseLeave }) {
   return <span style={{display: 'inline-block', width: `${width}`}}
                onClick={onclick} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
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