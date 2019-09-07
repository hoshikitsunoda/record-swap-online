import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import * as Styled from './styled'
import axios from 'axios'

class Detail extends Component {
  addToCart = async data => {
    try {
      const res = await axios.post('http://localhost:3000/cart')
      console.log(data)
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
