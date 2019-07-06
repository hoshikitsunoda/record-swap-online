import React from 'react'

import { withRouter, BrowserRouter as Router } from 'react-router-dom'

const Detail = props => {
  return (
    <div>
      <p>{props.recordInfo.artist}</p>
    </div>
  )
}

export default withRouter(Detail)
