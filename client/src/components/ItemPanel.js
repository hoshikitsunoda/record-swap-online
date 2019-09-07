import React, { Component } from 'react'
import InfoBox from './InfoBox'
import Detail from './Detail'

import { Route, Switch, withRouter } from 'react-router-dom'

import * as Styled from './styled'

class ItemPanel extends Component {
  state = { url: '', dataId: '' }
  componentDidMount() {
    this.setState({ url: 'http://localhost:5000/inventory/' }, () => {
      this.props.getData(this.state.url)
    })
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.location.pathname !== prevProps.location.pathname &&
      this.props.location.pathname === '/'
    ) {
      this.props.getData(this.state.url)
    }
  }
  updateURLOnClick = event => {
    const dataId = event.target.getAttribute('data-id')
    const detailURL = `http://localhost:5000/inventory/${dataId}`
    this.props.history.push({
      pathname: 'item/',
      search: `?_${dataId}`
    })
    console.log(detailURL)
    this.props.getData(detailURL)
  }
  closeOnClick = () => {
    const mainURL = `http://localhost:5000/inventory/`
    this.props.history.push({
      pathname: '/'
    })
    this.props.getData(mainURL)
  }
  render() {
    let ListView = {}
    if (Array.isArray(this.props.recordInfo)) {
      ListView = this.props.recordInfo.map((record, i) => (
        <InfoBox
          updateURLOnClick={this.updateURLOnClick}
          info={record}
          key={i}
        />
      ))
    } else {
      ListView = null
    }
    const DetailView = (
      <Detail closeOnClick={this.closeOnClick} {...this.props} />
    )
    return (
      <Styled.ItemPanel className="itemPanel">
        <Switch>
          <Route path="/" exact render={() => ListView} />
          <Route path="/item" exact render={() => DetailView} />
        </Switch>
      </Styled.ItemPanel>
    )
  }
}

export default withRouter(ItemPanel)
