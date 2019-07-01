import React from 'react'
import InfoBox from './InfoBox'

import * as Styled from './styled'

const ItemPanel = props => {
  return (
    <Styled.ItemPanel>
      {props.recordInfo.map((record, i) => (
        <InfoBox info={record} key={i} />
      ))}
    </Styled.ItemPanel>
  )
}

export default ItemPanel
