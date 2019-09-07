import React from 'react'
import * as Styled from './styled'

import { withRouter } from 'react-router-dom'

const InfoBox = props => {
  const { info } = props
  const path = 'http://localhost:5000/'
  return (
    <Styled.InfoBox className="infoBox">
      <Styled.ImageContainer>
        <img
          src={path + info.filename}
          data-id={info._id}
          alt={info.title}
          onClick={props.updateURLOnClick}
          className="itemPhoto image"
        />
      </Styled.ImageContainer>
      <Styled.InfoContainer>
        <Styled.UnorderedList>
          <li>{info.title}</li>
          <li>{info.artist}</li>
          <li>
            {info.mediaCondition}/{info.coverCondition}
          </li>
          <li>${info.price}USD</li>
        </Styled.UnorderedList>
        <Styled.DetailButtonContainer>
          <button data-id={info._id} onClick={props.updateURLOnClick}>
            View Detail
          </button>
        </Styled.DetailButtonContainer>
      </Styled.InfoContainer>
    </Styled.InfoBox>
  )
}

export default withRouter(InfoBox)
