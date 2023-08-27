import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { useRef } from 'react'

const Home = () => {
  const roomIDRef = useRef<HTMLInputElement>(null)
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
      <input type="text" ref={roomIDRef} />
      <input type="submit" value='roomに入る'/>
    </form>
  <div children='homeです'></div>
  </>)
}
export default Home;