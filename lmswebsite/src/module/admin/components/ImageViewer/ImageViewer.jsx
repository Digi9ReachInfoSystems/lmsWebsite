import React from 'react'
// import './imageURL.css'
import {ImageViewerWrap} from './ImageViewer.styles'

const ImageViewer = ({image}) => {
  return (
    <ImageViewerWrap>
    <div className="imageURL-container">
    <img src={image} alt="image" width="300px" height="300px" className='imageURL-image'/>
    </div>
    </ImageViewerWrap>
  )
}

export default ImageViewer