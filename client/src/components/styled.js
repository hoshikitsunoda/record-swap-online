import styled, { createGlobalStyle } from 'styled-components'
import fontRegular from '../fonts/AvenirNextCondensed-Regular-08.ttf'
import fontMedium from '../fonts/AvenirNextCondensed-Medium-06.ttf'
import fontBold from '../fonts/AvenirNextCondensed-Bold-01.ttf'
import fontHeavy from '../fonts/AvenirNextCondensed-Heavy-09.ttf'

// Global

export const GlobalStyle = createGlobalStyle`
  html * {
    font-family: fontRegular;
  }

  @font-face {
    font-family: fontRegular;
    src: url(${fontRegular});
  }
  @font-face {
    font-family: fontMedium;
    src: url(${fontMedium});
  }
  @font-face {
    font-family: fontBold;
    src: url(${fontBold});
  }
  @font-face {
    font-family: fontHeavy;
    src: url(${fontHeavy});
  }
`

// App styling

export const App = styled.div`
  background: #000;
  padding: 1.5em;
  min-height: 100vh;

  @media (min-width: 767px) {
    height: 100vh;
  }
`

// InfoBox styling

export const UnorderedList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  color: #fdf9f9;

  li {
    letter-spacing: 0.1em;
  }
`

export const DetailButtonContainer = styled.div`
  button {
    width: 100%;
    background-color: #c0c0c0;
    border: none;
    padding: 0.3em 1em;
    cursor: pointer;
    border-radius: 4px;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);

    a {
      color: #272727;
      text-decoration: none;
      font-size: 1em;
    }
  }
`

export const ImageContainer = styled.div`
  flex: 0 1 50%;

  img {
    width: 100%;
    cursor: pointer;
  }
`

export const Image = styled.img`
  width: 100%;
`
export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 50%;
  padding-left: 1em;
`

export const InfoBox = styled.div`
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

// ItemPanel styling

export const ItemPanel = styled.div`
  width: 100%;
  max-width: 1000px;
  max-height: 90%;
  margin: 0 auto;
  padding: 1em;
  background: #313131;
  overflow-y: scroll;

  @media (min-width: 767px) {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
`

// Detail styling

export const DetailBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1em;
  width: 100%;

  @media (min-width: 767px) {
    flex-direction: row;
  }
`

export const LeftBox = styled.div`
  flex: 0 1 50%;
  padding: 1em;

  img {
    width: 100%;
  }
`

export const RightBox = styled.div`
  flex: 0 1 50%;
  padding: 1em;

  p {
    color: #fdf9f9;
  }
`
