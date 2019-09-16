import { createGlobalStyle } from 'styled-components'
import fontRegular from '../fonts/AvenirNextCondensed-Regular-08.ttf'
import fontMedium from '../fonts/AvenirNextCondensed-Medium-06.ttf'
import fontBold from '../fonts/AvenirNextCondensed-Bold-01.ttf'
import fontHeavy from '../fonts/AvenirNextCondensed-Heavy-09.ttf'

// Global

export const GlobalStyle = createGlobalStyle`
  html {
    background-color: #fffafa;
  }
  
  html * {
    font-family: fontRegular;
  }

  h1,
  h2,
  h3,
  h4,
  p {
    margin: 0 auto;
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
