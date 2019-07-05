import React from 'react'
import InfoBox from './InfoBox'

import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

import * as Styled from './styled'

const ItemPanel = props => {
  const ListView = props.recordInfo.map((record, i) => (
    <InfoBox info={record} key={i} />
  ))
  return (
    <Styled.ItemPanel className="itemPanel">
      <Router>
        <Route path="/" render={() => ListView} />
      </Router>
    </Styled.ItemPanel>
  )
}

export default ItemPanel
