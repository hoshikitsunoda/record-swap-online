import React from 'react'
import { withRouter } from 'react-router-dom'

const Detail = props => {
  console.log(props)
  return (
    <div className="detailBox" key={props.recordInfo._id}>
      <p>{props.recordInfo.artist}</p>
      <button onClick={props.closeOnClick}>Close</button>
    </div>
  )
}

export default withRouter(Detail)
