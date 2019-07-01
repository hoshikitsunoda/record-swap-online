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
`

// InfoBox styling

export const UnorderedList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  color: #fdf9f9;
`

export const ImageContainer = styled.div`
  padding: 1em;
  flex: 0 1 50%;

  img {
    width: 100%;
  }
`

export const Image = styled.img`
  width: 100%;
`
export const InfoContainer = styled.div`
  flex: 0 1 50%;
`

export const InfoBox = styled.div`
  display: flex;
  align-items: center;
  padding: 1em 1em 0.5em;
`

// ItemPanel styling

export const ItemPanel = styled.div`
  width: 100%;
  background: rgba(192, 192, 192, 0.6);
`
