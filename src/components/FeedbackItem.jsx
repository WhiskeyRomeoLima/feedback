import { useContext } from 'react'
import FeedbackContext from './context/FeedbackContext'
import { FaTimes, FaEdit} from 'react-icons/fa'
import Card from './shared/Card'

/*
  FeedbackItem is where the functionality of editing and deleting resides
  because that is where the item.id resides.  To update or delete an item,
  the item.id is needed by the application to identify the correct item.
  Access to deleteFeedback and editFeedback are provided in FeedbackContext.
*/
function FeedbackItem({item}) {
  const { deleteFeedback, editFeedback } = useContext(FeedbackContext)
  
  return (
    <Card >
      <div className='num-display'>{item.rating}</div>
        <button onClick= {() => deleteFeedback(item.id)} className='close'>
          <FaTimes color='purple' /> {/* renders an X icon with the color of purple */}
        </button>
        <button onClick={()=> editFeedback(item)} className='edit'>
          <FaEdit color='purple'/> {/* renders a pencil icon also purple */}
        </button>
      <div className='text-display'>{item.text}</div>
    </Card>
  )
}

export default FeedbackItem