import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Header({text, bgColor, textColor}) {
  const headerStyles = {
    backgroundColor: bgColor,
    color: textColor,
  }

/*
The exterior set of curly braces are letting JSX know you want a JS expression. 
The interior set of curly braces represent a JavaScript object, meaning 
you’re passing in a object to the style attribute.
*/
  return (
    <header style={headerStyles}>
      <div className='container'>
        <h2><Link to='/' style={{ textDecoration: 'none'}} >{text} </Link> </h2>
      </div>
    </header>
  )

}


Header.defaultProps = {
  text: "Your Feedback",
  bgColor: "rgba(0,0,0,0.4)",
  textColor: "#ff6a95",
}

Header.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
}

export default Header

