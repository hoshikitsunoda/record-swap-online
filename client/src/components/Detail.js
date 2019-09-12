import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import styled from 'styled-components'
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
      <DetailBox className="detailBox" key={recordInfo._id}>
        <LeftBox className="left">
          <img src={path + recordInfo.filename} alt="" />
        </LeftBox>
        <RightBox className="right">
          <p>{recordInfo.artist}</p>
          <p>{recordInfo.title}</p>
          <p>
            {recordInfo.mediaCondition} / {recordInfo.coverCondition}
          </p>
          <p>${recordInfo.price}usd</p>
          <p>{recordInfo.comment}</p>
          <AddToCartButton>
            <button onClick={this.addToCart}>Add To Cart</button>
          </AddToCartButton>
          <DetailButtonContainer>
            <button onClick={this.goBack}>Close</button>
          </DetailButtonContainer>
        </RightBox>
      </DetailBox>
    )
  }
}

const DetailBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1em;
  width: 100%;

  @media (min-width: 767px) {
    flex-direction: row;
  }
`

const LeftBox = styled.div`
  flex: 0 1 50%;
  padding: 1em;

  img {
    width: 100%;
  }
`

const RightBox = styled.div`
  flex: 0 1 50%;
  padding: 1em;
  width: 100%;

  p {
    color: #fdf9f9;
  }

  @media (min-width: 767px) {
    width: auto;
  }
`

const AddToCartButton = styled.div`
  button {
    width: 100%;
    background-color: #ede1cc;
    border: none;
    padding: 0.3em 1em;
    cursor: pointer;
    border-radius: 4px;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
    transition: 0.3s;

    &:hover {
      background-color: #dd9497;
    }

    a {
      color: #272727;
      text-decoration: none;
      font-size: 1em;
    }
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

export default withRouter(Detail)
