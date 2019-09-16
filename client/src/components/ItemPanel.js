import React, { Component } from 'react'
import InfoBox from './InfoBox'
import Detail from './Detail'
import Cart from './Cart'
import ItemFilter from './ItemFilter'

import { Route, Switch, withRouter } from 'react-router-dom'

import styled from 'styled-components'

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
    this.props.getData(detailURL)
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
      <ItemPanelWrapper className="itemPanel">
        <ItemFilter />
        <ItemsWrapper>
          <Switch>
            <Route path="/" exact render={() => ListView} />
            <Route path="/item" exact render={() => DetailView} />
            <Route path="/cart" exact component={Cart} />
          </Switch>
        </ItemsWrapper>
      </ItemPanelWrapper>
    )
  }
}

const ItemPanelWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  max-height: 90%;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  background: #fffafa;
  overflow-y: scroll;

  @media (min-width: 767px) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
`

const ItemsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  @media (min-width: 767px) {
    width: 88%;
  }
`

export default withRouter(ItemPanel)
