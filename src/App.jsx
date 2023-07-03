import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import FeedbackForm from './components/FeedbackForm'
import FeedbackStats from './components/FeedbackStats'
import FeedbackList from './components/FeedbackList'
import AboutPage from './pages/AboutPage'
import AboutIconLink from './components/AboutIconLink'
import {FeedbackProvider} from './components/context/FeedbackContext'

/*In lesson 6-1 Create a Context and Provider we remove state from individual components
and centralized access to state via Context.

We wrap all components needing access to the context with the provider component of FeedbackContext

*/
function App() {
//added


  return (
    <FeedbackProvider>
      <Router>
          <Header/>             
          <div className='container'>
            <Routes>
              <Route exact path='/' element = {
                <>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />  
                </>
              }>
              </Route>
              <Route path='/about' element={<AboutPage/>}/>          
            </Routes>
            <AboutIconLink /> 
          </div>      
      </Router>      
    </FeedbackProvider>
 
  )
}

export default App





