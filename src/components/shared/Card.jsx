

function Card({children, reverse}) { //reverse is a boolean
  return (
    <div className= 'card' style={{
      backgroundColor: reverse ?'rgba(0, 0, 0, 0.4)' : '#fff',
      color: reverse ? '#fff' : '#000'
    }}>{children}
    </div>
  )
}
export default Card

// background-color: rgba(0, 0, 0, 0.4); color: #fff;

/*
original:         <div className='card reverse'
conditional class: <div className= {`card ${reverse && 'reverse'}`}>{children}</div>
conditional style: style={{
                            backgroundColor: reverse ?'rgba(0, 0, 0, 0.4)' : '#fff',
                            color: reverse ? '#fff' : '#000'
                          }}
*/