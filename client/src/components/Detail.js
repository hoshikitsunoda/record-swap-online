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
    try {
      this.setState(
        {
          artist: this.props.recordInfo.artist,
          title: this.props.recordInfo.title,
          format: this.props.recordInfo.format,
          price: this.props.recordInfo.price,
          filename: this.props.recordInfo.filename
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
            <button onClick={this.props.closeOnClick}>Close</button>
          </Styled.DetailButtonContainer>
        </Styled.RightBox>
      </Styled.DetailBox>
    )
  }
}

export default withRouter(Detail)
