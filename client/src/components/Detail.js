import React from 'react'
import { withRouter } from 'react-router-dom'

import * as Styled from './styled'

const Detail = props => {
  const { recordInfo } = props
  const path = 'http://localhost:3000/'
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
          <button onClick={props.closeOnClick}>Add To Cart</button>
        </Styled.AddToCartButton>
        <Styled.DetailButtonContainer>
          <button onClick={props.closeOnClick}>Close</button>
        </Styled.DetailButtonContainer>
      </Styled.RightBox>
    </Styled.DetailBox>
  )
}

export default withRouter(Detail)
