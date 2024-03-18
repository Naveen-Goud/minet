import React from 'react'

interface ImageProps {
  src?: string
  onClick?: any
  sx?: any
  height?: string
  width?: string
  alt?: string
  hidden?: boolean
  id?: any
}

const Image = (props: ImageProps) => {
  return (
      <img id={props.id} {...props} style={props.sx} alt={props.alt} />
  )
}

export default Image;
