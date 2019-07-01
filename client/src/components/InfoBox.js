import React from 'react'
import * as Styled from './styled'

const InfoBox = ({ info }) => {
  const path = 'http://localhost:3000/'
  return (
    <Styled.InfoBox>
      <Styled.ImageContainer>
        <img src={path + info.filename} alt="" className="itemPhoto" />
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
          <button>
            <a href="JavaScript:;">View Detail</a>
          </button>
        </Styled.DetailButtonContainer>
      </Styled.InfoContainer>
    </Styled.InfoBox>
  )
}

export default InfoBox
