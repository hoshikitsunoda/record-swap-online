import React from 'react'

const ItemPanel = props => {
  const path = 'http://localhost:3000/'
  return (
    <div>
      {props.recordInfo.map((record, i) => (
        <div key={i}>
          <img src={path + record.filename} alt="" className="item_photo" />
          <div className="description">
            <ul>
              <li>{record.title}</li>
              <li>{record.artist}</li>
              <li>
                {record.mediaCondition}/{record.coverCondition}
              </li>
              <li>{record.price}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ItemPanel
