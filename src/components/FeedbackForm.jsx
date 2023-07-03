import { useState, useContext, useEffect } from 'react'
import RatingSelect from './RatingSelect'
import Card from './shared/Card'
import Button from './shared/Button'
import FeedbackContext from './context/FeedbackContext'

function FeedbackForm() { //handleAddFeedback prop removed changed to addFeedback in context
  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')
                      //item object to be edited
  const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

  //detects when an item is clicked on via the edit button (pencil)
  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating) //note setRating is in Rating Select.jsx, so we need feedbackEdit in that component.
    }
  }, [feedbackEdit])
  
  const handleTextChange = ({ target: { value } }) => { //  get the value of review input 
    if (value === '') {
      setBtnDisabled(true)
      setMessage(null)
      
  // prettier-ignore
    } else if (value.trim().length < 10) { // check for less than 10
      setMessage('Text must be at least 10 characters')
      setBtnDisabled(true)
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }
    setText(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    //use shorthand notation in object as property name and value name are the same
    if (text.trim().length >= 10) {
      const newFeedback = {
        text,
        rating
      }

      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback)
      } else {
          addFeedback(newFeedback)
      }
      // NOTE: reset to default state after submission
      setBtnDisabled(true) // reset disabled
      setRating(10) // set rating back to 10
      setText('')
    }
  }

  return (
    <Card>
      <form onSubmit = {handleSubmit} >
        <h2>How would your rate our service?</h2>
        <RatingSelect select={(rating) => setRating(rating) } selected={rating}/>
        <div className='input-group'>
          <input 
            name='review-input'
            onChange={handleTextChange} 
            type="text"   
            placeholder='Write a review' 
            value={text}/>
          <Button type='submit' isDisabled={btnDisabled}>Send</Button> {/* isDisabled set to false in Button.defaultProps */}
        </div>
        {message && <div className='message'> {message} </div>}
      </form>
    </Card>
  )
}
export default FeedbackForm