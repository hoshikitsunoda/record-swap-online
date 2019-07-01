import React from 'react'
import InfoBox from './InfoBox'

const ItemPanel = props => {
  const path = 'http://localhost:3000/'
  return (
    <React.Fragment>
      {props.recordInfo.map((record, i) => (
        <div key={i}>
          <img src={path + record.filename} alt="" className="item_photo" />
          <div className="description">
            <InfoBox info={record} />
          </div>
        </div>
      ))}
    </React.Fragment>
  )
}

export default ItemPanel
