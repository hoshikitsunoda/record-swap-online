import React from 'react'

import styled from 'styled-components'

import { withRouter } from 'react-router-dom'

const InfoBox = props => {
  const { info } = props
  const path = 'http://localhost:5000/'
  return (
    <InfoBoxWrapper className="infoBox">
      <ImageContainer>
        <Image
          src={path + info.filename}
          data-id={info._id}
          alt={info.title}
          onClick={props.updateURLOnClick}
          className="itemPhoto image"
        />
      </ImageContainer>
      <InfoContainer>
        <UnorderedList>
          <li>{info.title}</li>
          <li>{info.artist}</li>
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
  padding: 0;
  color: #fdf9f9;

  li {
    letter-spacing: 0.1em;
  }
`

const ImageContainer = styled.div`
  flex: 0 1 50%;

  img {
    width: 100%;
    cursor: pointer;
  }
`

const Image = styled.img`
  width: 100%;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 50%;
  padding-left: 1em;
`

const InfoBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1em 1em 0.5em;
  margin-bottom: 0.5em;
  background: rgba(192, 192, 192, 0.6);

  @media (min-width: 767px) {
    width: calc(33.3% - 0.5em);
    margin: 0 0.25em 0.5em;
  }
`

const DetailButtonContainer = styled.div`
  button {
    width: 100%;
    background-color: #c0c0c0;
    border: none;
    padding: 0.3em 1em;
    cursor: pointer;
    border-radius: 4px;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
    transition: 0.3s;

    &:hover {
      background-color: #fff;
    }
    a {
      color: #272727;
      text-decoration: none;
      font-size: 1em;
    }
  }
`

export default withRouter(InfoBox)
