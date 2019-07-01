import React from 'react'
import InfoBox from './InfoBox'

const ItemPanel = props => {
  return (
    <React.Fragment>
      {props.recordInfo.map((record, i) => (
        <InfoBox info={record} key={i} />
      ))}
    </React.Fragment>
  )
}

export default ItemPanel
