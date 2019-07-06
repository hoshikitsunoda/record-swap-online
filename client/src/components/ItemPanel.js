import React, { Component } from 'react'
import InfoBox from './InfoBox'
import Detail from './Detail'

import {
  Route,
  Link,
  Switch,
  withRouter,
  BrowserRouter as Router
} from 'react-router-dom'

import * as Styled from './styled'

class ItemPanel extends Component {
  state = { url: '', dataId: '' }
  componentDidMount() {
    this.setState({ url: 'http://localhost:3000/inventory/' }, () => {
      this.props.getData(this.state.url)
    })
  }
  updateURLOnClick = event => {
    console.log(this.props.history)
    const dataId = event.target.getAttribute('data-id')
    this.setState({ dataId: dataId }, () => {
      this.props.history.push({
        pathname: 'item/',
        search: `?_${this.state.dataId}`
      })
    })
  }
  render() {
    const ListView = this.props.recordInfo.map((record, i) => (
      <InfoBox updateURLOnClick={this.updateURLOnClick} info={record} key={i} />
    ))
    const DetailView = <Detail {...this.props} />
    return (
      <Styled.ItemPanel className="itemPanel">
        <Switch>
          <Route path="/" exact render={() => ListView} />
          <Route path="/item" render={() => DetailView} />
        </Switch>
      </Styled.ItemPanel>
    )
  }
}

export default withRouter(ItemPanel)
