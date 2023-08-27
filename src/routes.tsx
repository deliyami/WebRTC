import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const Home = lazy(() => import('./pages/home'))
const ErrorPage = lazy(() => import('./pages/error_page'))
const ChatPage = lazy(() => import('./pages/chat'))
const SocketTest = lazy(() => import('./pages/socket_test'))
const VideoTest = lazy(() => import('./pages/video_test'))

const MainRouter = () => {
  // const { roomID, setRoomID } = useState<string>('')
  return (
    <>
      <Router>
        <nav className="App-header">
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/video">Video Test</Link>
            </li>
            <li>
                <Link to="/socket">Socket Test</Link>
            </li>
            <li>
                <Link to="/403forbiddena">error</Link>
            </li>
        </nav>
        <Suspense fallback={<div>로딩중입니다</div>}>
            <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/chat/:roomID" element={<ChatPage/>}></Route>
              <Route path="/socket" element={<SocketTest/>}></Route>
              <Route path="/video" element={<VideoTest/>}></Route>
              <Route path="/*" element={<ErrorPage/>}></Route>
            </Routes>
        </Suspense>
      </Router>
      <div id="threetest"></div>
    </>
  )
}
export default MainRouter
