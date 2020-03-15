import React from 'react'

import styled from 'styled-components'

import { withRouter } from 'react-router-dom'

const InfoBox = props => {
  const { info } = props
  console.log(info.coverImage)
  const path = 'http://localhost:5000/'
  return (
    <InfoBoxWrapper className="infoBox">
      <ImageContainer
        srcUrl={path + info.coverImage}
        data-id={info._id}
        alt={info.title}
        onClick={props.updateURLOnClick}
        className="itemPhoto image"
      ></ImageContainer>
      <InfoContainer>
        <UnorderedList>
          <li>
            <h3>{info.title}</h3>
          </li>
          <li>
            <p>{info.artist}</p>
          </li>
          <li>
            {info.mediaCondition}/{info.coverCondition}
          </li>
          <li>${info.price}USD</li>
        </UnorderedList>
        <DetailButtonContainer>
          <button data-id={info._id} onClick={props.updateURLOnClick}>
            View Detail
          </button>
        </DetailButtonContainer>
      </InfoContainer>
    </InfoBoxWrapper>
  )
}

const UnorderedList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 1rem 0 1rem 1rem;
  color: #fdf9f9;

  li {
    letter-spacing: 0.1em;
    color: #4d4d4d;
  }
`

const ImageContainer = styled.div`
  flex: 0 1 50%;
  background: linear-gradient(to bottom, rgba(245, 246, 252, 0), rgba(255, 255, 255, 0.73)), 
  url('${props => props.srcUrl}') no-repeat center center;
  background-size: cover;
  width: 100%;
  padding-bottom: 50%;

  @media (min-width: 767px) {
    padding-bottom: 100%;
  }
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 50%;
  height: 100%;
  width: 100%;

  @media (min-width: 767px) {
    flex-direction: row;
  }
`

const InfoBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background: #fffafa;

  @media (min-width: 767px) {
    width: calc(25%);
    margin: 0;
    display: flex;
    flex-direction: column;
  }
`

const DetailButtonContainer = styled.div`
  margin: auto 0 0 0;

  button {
    width: 100%;
    background-color: #323232;
    border: none;
    padding: 0.3rem 1rem;
    cursor: pointer;
    transition: 0.3s;
    text-align: center;
    color: #fffafa;

    &:hover {
      background-color: #fff;
      color: #323232;
    }
    a {
      color: #272727;
      text-decoration: none;
      font-size: 1rem;
    }
  }

  @media (min-width: 767px) {
    margin: auto 0 0 auto;
  }
`

export default withRouter(InfoBox)
