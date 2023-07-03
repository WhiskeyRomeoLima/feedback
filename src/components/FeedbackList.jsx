import { useContext } from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import FeedbackItem from './FeedbackItem'
import FeedbackContext from './context/FeedbackContext'
/*

Renders FeedBackItem components and delete icon 
builds the list of feedbacks using access provided by FeedbackContext: const [feedback, setFeedback] = useState(FeedbackData)
passes 'handleDelete' through to the FeedbackItem component (prop drilling)

*/
//Fixed empty object
function FeedbackList() { //removed feedback, handleDelete destructured from props
  const {feedback, isLoading} = useContext(FeedbackContext) //retrieved from <FeedbackContext.Provider value= {{feedback, }}> feedbackContext.js

  if (!isLoading && (!feedback || feedback.length === 0)) {
    return <p>No feedback yet.</p>
  }

/*
  In the animation below:
  The exterior set of curly braces are letting JSX know you want a JS expression. 
  The interior set of curly braces represent a JavaScript object, meaning 
  you’re passing in a object to the property.
  e.g. 
  initial = {item.id}      -- passing a number
  animate = {{opacity: 0}} -- passing an object
*/
  return (
    <div className='feeback-list'>
    <AnimatePresence>
      {feedback.map((item) =>(
        <motion.div 
          key={item.id} 
          initial = {{opacity: 0}}
          animate = {{opacity: 1}}
          transition = {{delay: .25}}
          exit    = {{opacity: 0}}
          >
          <FeedbackItem 
            key={item.id} 
            item={item}
          /> 
        </motion.div>

      ))}     
    </AnimatePresence>

    </div>
  )
  // return (
  //   <div className='feeback-list'>
  //     {feedback.map((item) =>(
  //         <FeedbackItem 
  //           key={item.id} 
  //           item={item}
  //           handleDelete = {handleDelete}
  //         />
  //       ))}
  //   </div>
  // )
}
export default FeedbackList