import React from 'react'

const InfoBox = ({ info }) => {
  const path = 'http://localhost:3000/'
  return (
    <div>
      <img src={path + info.filename} alt="" className="itemPhoto" />
      <div className="info">
        <ul>
          <li>{info.title}</li>
          <li>{info.artist}</li>
          <li>
            {info.mediaCondition}/{info.coverCondition}
          </li>
          <li>{info.price}</li>
        </ul>
      </div>
    </div>
  )
}

export default InfoBox
