import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { useRef } from 'react'

const CamTest = () => {
  const roomIDRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setTimeout(() => {
        stream.getTracks().forEach(t => t.stop())
      }, 3000)
    })()
  }, [])
  const navigate = useNavigate()
  const handleRoomIDSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const roomID = roomIDRef.current?.value
    if (roomID) navigate(`chat/${roomID}`)
  }
  useEffect(() => {
    console.log(window);
  }, [])
  return (<>
    <form onSubmit={handleRoomIDSubmit}>
      <input className='textInput' type="text" ref={roomIDRef} />
      <input className="submitButton" type="submit" value='enter room'/>
    </form>
  <div children='cam test detu'></div>
  </>)
}
export default CamTest;