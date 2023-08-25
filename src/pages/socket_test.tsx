import React, { useEffect } from 'react'
import { io } from "socket.io-client";

const SocketTest = () => {
  const socket = io('localhost:7014');
  useEffect(() => {
    socket.emit('connection')
  })
  const handleRoomIDSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
  }
  return (<>
  <button onClick={handleRoomIDSubmit}>rest</button>
  </>)
}
export default SocketTest;