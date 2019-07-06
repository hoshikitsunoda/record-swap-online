import React, { Component } from 'react'
import InfoBox from './InfoBox'
import Detail from './Detail'

import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

import * as Styled from './styled'

class ItemPanel extends Component {
  state = { url: '' }
  componentDidMount() {
    this.setState({ url: 'http://localhost:3000/inventory/' }, () => {
      this.props.getData(this.state.url)
    })
  }
  render() {
    const ListView = this.props.recordInfo.map((record, i) => (
      <InfoBox info={record} key={i} />
    ))
    const DetailView = <Detail {...this.props} />
    return (
      <Styled.ItemPanel className="itemPanel">
        <Router>
          <Route path="/" exact render={() => ListView} />
          <Route path="/detail" render={() => DetailView} />
        </Router>
      </Styled.ItemPanel>
    )
  }
}

export default ItemPanel
