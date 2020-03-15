import React, { Component } from 'react'

import styled from 'styled-components'

class HeroSection extends Component {
  render() {
    return (
      <Wrapper>
        <BlurredBg></BlurredBg>
        <Container>
          <InfoWrapper className="container">
            <div className="left">
              <div className="featured">
                <h3>Featured Item</h3>
                <div className="bar"></div>
              </div>
              <div className="itemInfo">
                <h3>Artist</h3>
                <h4>Title</h4>
                <p>LP - Label - Year</p>
                <h4>$100</h4>
              </div>
            </div>
            <div className="right">
              <img src="/uploads/affinity.jpg" alt="" />
            </div>
          </InfoWrapper>
        </Container>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  display: block;
  position: relative;
  margin-top: 2.9rem;
`

const BlurredBg = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
    url('/uploads/affinity.jpg');
  background-size: cover;
  background-position: center center;
  filter: blur(8px);
  height: 13rem;

  @media (min-width: 767px) {
    height: 20rem;
  }
`

const Container = styled.div`
  width: 100%;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-bottom: 1rem;
`

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  .left,
  .right {
    width: 50%;
  }

  .left {
    color: #fffafa;
    padding-bottom: 0.8rem;

    .featured {
      margin-bottom: 0.5rem;

      h3 {
        font-weight: 100;
        padding-left: 3rem;
      }

      .bar {
        background-color: #323232;
        height: 0.4rem;
        margin: -0.6rem 1.5rem 0 0;
      }
    }

    .itemInfo {
      padding-left: 3rem;
    }

    @media (min-width: 767px) {
      display: none;
    }
  }

  .right {
    margin-top: 0.5rem;

    img {
      max-width: 150px;
      margin: 0 auto;
    }

    @media (min-width: 767px) {
      text-align: center;
      margin-top: 3rem;
    }
  }
`

export default HeroSection
