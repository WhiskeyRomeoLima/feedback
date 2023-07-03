import { createContext, useState, useEffect } from 'react'
import {v4 as uuidv4} from 'uuid'
//import FeedbackData from '../../data/FeedbackData'  replaced by fetchFeedback()

const FeedbackContext = createContext()
//FeedbackProvider is used to wrap components - see App.jsx
export const FeedbackProvider = ({ children }) => { 
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([]) //set feedback = FeedbackData.  Used below in the 'value' object in FeedbackProvider
  const [feedbackEdit, setFeedbackEdit] = useState({item: {}, edit: false}) //edit: false used to indicate whether the item passed in is in edit mode

  useEffect(() => {
    fetchFeedback() }, []
  )

  const fetchFeedback = async () => {
    //const response = await fetch('http://localhost:5000/feedback?_sort=id&_order=desc') //shorten because of proxy in package.json
    const response = await fetch('/feedback?_sort=id&_order=desc')
    const data = await response.json()
    console.log(`data from context FetchFeedback: ${data}`);
    setFeedback(data)
    setIsLoading(false)
  }


const addFeedback = async (newFeedback) => {
  const response = await fetch('/feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback)
    })
 
    const data = await response.json()


  //newFeedback.id = uuidv4() the backend takes care of this
  setFeedback([data, ...feedback ])
}

const editFeedback = (item) => {
  setFeedbackEdit({item, edit:true})
}

const updateFeedback = async (id, updatedItem) => {
  const response = await fetch(`/feedback/${id}`, {
    method: 'PUT',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify(updatedItem)
  })

  const data = await response.json()

  setFeedback(feedback.map(
    (item)=> item.id === id ?
    {...item, ...data} : item

    ))
}


const deleteFeedback = async (id) => {
  if(window.confirm('Are you sure you want to delete?')) {
    await fetch(`/feedback/${id}`, {method: 'DELETE'})

    setFeedback(feedback.filter((item) => item.id !== id))
  }
}


return (
  <FeedbackContext.Provider 
    value= {        //value is a plain object
      {feedback,    //short for feedback: feedback
      feedbackEdit, //this is Item object being edited
      isLoading,
      deleteFeedback, 
      addFeedback, 
      editFeedback, //this is the function editFeedback
      updateFeedback,
      }
    }> 
    {children}
  </FeedbackContext.Provider>
)

} //FeedbackProvider

export default FeedbackContext

/*
From API:

//* Creating context 
Context lets components pass information deep down without explicitly passing props.

Four steps to using Context
1-Create context using the createContext method.
2-Take your created context and wrap the context provider around your component tree.
3-Put any value you like on your context provider using the value prop.
4-Read that value within any component by using the useContext

Call createContext outside any components to create one or more contexts.

import { createContext } from 'react';

const ThemeContext = createContext('light');
const AuthContext = createContext(null);

//*createContext returns a context object. Components can read context by passing it to useContext():
//* within a component . . .
function Button() {
  const theme = useContext(ThemeContext);
  // ...
}

function Profile() {
  const currentUser = useContext(AuthContext);
  // ...
}


//*Importing and exporting context from a file 
Often, components in different files will need access to the same context. This is why it’s common to declare contexts in a separate file. Then you can use the export statement to make context available for other files:

//* Contexts.js
import { createContext } from 'react';

export const ThemeContext = createContext('light');
export const AuthContext = createContext(null);
Components declared in other files can then use the import statement to read or provide this context:

//* Button.js
import { ThemeContext } from './Contexts.js'; //* importing

function Button() {
  const theme = useContext(ThemeContext); //* destructure off of useConstext(ThemeContext)
  // ...
}
//* App.js (we wrap component with the context.provider object)
import { ThemeContext, AuthContext } from './Contexts.js';

function App() {
  ...
  return (
    <ThemeContext.Provider value={theme}>
      <AuthContext.Provider value={currentUser}>
        <Page />
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}

//* better definition of Provider
Every Context object comes with a Provider React component that allows 
consuming components to subscribe to context changes.

The Provider component accepts a value prop to be passed to 
consuming components that are descendants of this Provider. 
One Provider can be connected to many consumers. 
Providers can be nested to override values deeper within the tree.

All consumers that are descendants of a Provider will re-render whenever 
the Provider’s value prop changes. The propagation from Provider to 
its descendant consumers (including .contextType and useContext) is not 
subject to the shouldComponentUpdate method, 
so the consumer is updated even when an ancestor component skips an update.

Changes are determined by comparing the new and old values using the same algorithm as Object.is.


*/