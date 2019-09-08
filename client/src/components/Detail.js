import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import * as Styled from './styled'
import axios from 'axios'

class Detail extends Component {
  state = {
    artist: '',
    title: '',
    format: '',
    price: '',
    filename: ''
  }

  goBack = () => {
    this.props.history.goBack()
  }

  goForward = () => {
    this.props.history.goForward()
  }

  postItemToCartDB = async () => {
    await axios.post('http://localhost:3000/cart', {
      artist: this.state.artist,
      title: this.state.title,
      format: this.state.format,
      price: this.state.price,
      filename: this.state.filename
    })
  }

  addToCart = async () => {
    const itemToBeAdded = this.props.recordInfo
    try {
      this.setState(
        {
          artist: itemToBeAdded.artist,
          title: itemToBeAdded.title,
          format: itemToBeAdded.format,
          price: itemToBeAdded.price,
          filename: itemToBeAdded.filename
        },
        () => this.postItemToCartDB()
      )
    } catch (err) {
      console.error(err)
    }
  }
  render() {
    const { recordInfo } = this.props
    const path = 'http://localhost:5000/'
    return (
      <Styled.DetailBox className="detailBox" key={recordInfo._id}>
        <Styled.LeftBox className="left">
          <img src={path + recordInfo.filename} alt="" />
        </Styled.LeftBox>
        <Styled.RightBox className="right">
          <p>{recordInfo.artist}</p>
          <p>{recordInfo.title}</p>
          <p>
            {recordInfo.mediaCondition} / {recordInfo.coverCondition}
          </p>
          <p>${recordInfo.price}usd</p>
          <p>{recordInfo.comment}</p>
          <Styled.AddToCartButton>
            <button onClick={this.addToCart}>Add To Cart</button>
          </Styled.AddToCartButton>
          <Styled.DetailButtonContainer>
            <button onClick={this.goBack}>Close</button>
          </Styled.DetailButtonContainer>
        </Styled.RightBox>
      </Styled.DetailBox>
    )
  }
}

export default withRouter(Detail)
