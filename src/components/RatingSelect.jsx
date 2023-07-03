//import {useState, useContext, useEffect} from 'react'
import FeedbackContext from './context/FeedbackContext'

function RatingSelect({select, selected}) {  //displayed in Feedback form
 //the below code from the video works but is unnecessary and it duplicates code in FeedbackForm
//const [selected, setSelected] = useState(10)

      //item object to be edited
//const {feedbackEdit} = useContext(FeedbackContext)

// useEffect(() => { //to sync rating with review item selected for edit
//   setSelected(feedbackEdit.item.rating)
// }, [feedbackEdit])

const handleChange = (e) => {
  //console.log(+e.currentTarget.value);
  //setSelected(+e.currentTarget.value)
  select(+e.currentTarget.value)
}

return (
  <ul className='rating'>
    {Array.from({ length: 10 }, (_, i) => (
      <li key={`rating-${i + 1}`}>
        <input
          type='radio'
          id={`num${i + 1}`}
          name='rating'
          value={i + 1}
          onChange={handleChange}
          checked={selected === i + 1}
        />
        <label htmlFor={`num${i + 1}`}>{i + 1}</label>
      </li>
    ))}
  </ul>
)
}
export default RatingSelect