import React from 'react'

const InfoBox = props => {
  props = props.info
  return (
    <React.Fragment>
      <ul>
        <li>{props.title}</li>
        <li>{props.artist}</li>
        <li>
          {props.mediaCondition}/{props.coverCondition}
        </li>
        <li>{props.price}</li>
      </ul>
    </React.Fragment>
  )
}

export default InfoBox
