import React from 'react';

interface videoProps {
  videoRef: React.RefObject<HTMLVideoElement>
}

const Canvas = (props : videoProps) => {
  return (<>
    <video className='video' ref={props.videoRef} autoPlay />
  </>)
}
export default Canvas;