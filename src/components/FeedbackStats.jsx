import {useContext } from 'react'
import FeedbackContext from './context/FeedbackContext'

function FeedbackStats() { //removed feedback prop
  const {feedback} = useContext(FeedbackContext)
  //caculate average rating
  console.log(feedback);
 let average =
  feedback.length === 0
    ? 0
    : feedback.reduce((acc,  cur ) => 
       acc + cur.rating, 0) / feedback.length

    return (
      <div className='feedback-stats'>
        <h4>{feedback.length} Reviews</h4>
        <h4>Average Rating: {average.toFixed(1).replace(/[.,]0$/, '')}</h4>
      </div>
    )
}
export default FeedbackStats