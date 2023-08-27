import React, { lazy, useRef, useEffect } from 'react'
import socketIOClient, { Socket } from 'socket.io-client'
import { Router, Link, useParams } from 'react-router-dom'

const Canvas = lazy(() => import('../components/canvas'))

const SOCKET_URL = `${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`

const Chat = () => {
    // 소켓정보를 담을 Ref
  const socketRef = useRef<Socket>()
  // 자신의 스트림
  const myStream = useRef<MediaStream>()
  // 자신의 비디오
  const myVideoRef = useRef<HTMLVideoElement>(null)
  // 다른사람의 비디오
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  // peerConnection
  const peerRef = useRef<RTCPeerConnection>()
  const { roomID } = useParams();

  const checkData = (e: any) => {
    e.preventDefault()
    console.log(socketRef);
  }

  const getMedia = async () => {
    try {
      // 자신이 원하는 자신의 스트림정보
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log(stream);
      myStream.current = stream
      
      if(myVideoRef.current){
        myVideoRef.current.srcObject = stream
      }

      if (!peerRef.current) return
      // 스트림을 peerConnection에 등록
      stream.getTracks().forEach((track) => {

        if (!peerRef.current) {
          return;
        }
        peerRef.current.addTrack(track, stream);
      });

      // iceCandidate 이벤트 
      peerRef.current.onicecandidate = (e) => {
        console.log('try candidate');
        if (e.candidate) {
          if (!socketRef.current) {
            return;
          }
          console.log('receive candidate');
          socketRef.current.emit('candidate', e.candidate, roomID);
        }
      };

      // 구 addStream 현 track 이벤트 
      peerRef.current.ontrack = (e) => {
        console.log('?');
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = e.streams[0];
        }
      };   
    } catch (e) {
      console.error(e)
    }
    // 마운트시 해당 방의 roomID을 서버에 전달
    socketRef.current!.emit('join_room', {
      room: roomID,
    });
  }

  const createOffer = async () => {
    console.log('create Offer');
    if (!(peerRef.current && socketRef.current)) {
      return;
    }
    try {
      // offer 생성
      const sdp = await peerRef.current.createOffer();
      // 자신의 sdp로 LocalDescription 설정
      peerRef.current.setLocalDescription(sdp);
      console.log('sent the offer');
      console.log('my offer', sdp);
      // offer 전달
      socketRef.current.emit('offer', sdp, roomID);
    } catch (e) {
      console.error(e);
    }
  };
  
  const createAnswer = async (sdp: RTCSessionDescription) => {
    // sdp : PeerA에게서 전달받은 offer
    console.log('create Answer');
    if (!(peerRef.current && socketRef.current)) {
      return;
    }

    try {
      // PeerA가 전달해준 offer를 RemoteDescription에 등록해 줍시다.
      peerRef.current.setRemoteDescription(sdp);
      
      // answer생성해주고
      const answerSdp = await peerRef.current.createAnswer();
      
      // answer를 LocalDescription에 등록해 줍니다. (PeerB 기준)
      peerRef.current.setLocalDescription(answerSdp);
      console.log('sent the answer');
      console.log('my offer', answerSdp);
      socketRef.current.emit('answer', answerSdp, roomID);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (socketRef.current) return
    // 소켓 연결
    socketRef.current = socketIOClient(SOCKET_URL)
    peerRef.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    })
    	
    // 기존 유저가 있고, 새로운 유저가 들어왔다면 오퍼생성
    socketRef.current.on('all_users', (allUsers: Array<{ id: string }>) => {
      console.log('hello, new User!');
      if (allUsers.length > 0) {
        createOffer();
      }
    });
	
    // offer를 전달받은 PeerB만 해당됩니다
    // offer를 들고 만들어둔 answer 함수 실행
    socketRef.current.on('getOffer', (sdp: RTCSessionDescription) => {
      console.log('receive Offer');
      console.log('another user offer', sdp);
      createAnswer(sdp);
    });
    
    // answer를 전달받을 PeerA만 해당됩니다.
    // answer를 전달받아 PeerA의 RemoteDescription에 등록
    socketRef.current.on('getAnswer', (sdp: RTCSessionDescription) => {
      console.log('receive Answer');
      console.log('another user offer', sdp);
      if (!peerRef.current) {
        return;
      }
      peerRef.current.setRemoteDescription(sdp);
    });
    
    // 서로의 candidate를 전달받아 등록
    socketRef.current.on('getCandidate', async (candidate: RTCIceCandidate) => {
      if (!peerRef.current) {
        return;
      }
      console.log('get candidate')
      await peerRef.current.addIceCandidate(candidate);
    });

    socketRef.current.on('user_exit', async () => {
      console.log('user exit')
    })
	
    getMedia()

    return () => {
      // 언마운트시 socket disconnect
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (peerRef.current) {
        peerRef.current.close();
      }
      if (myStream.current) {
        // 스트림 중지 및 트랙 해제
        myStream.current.getTracks().forEach((track) => {
          track.stop()
        });
      }
    }
  }, [])
  return (<>
    <div>Chat desu</div>
    <table>
      <thead></thead>
      <tbody>
        <tr>
          <td>Me</td>
          <td>Another Person</td>
        </tr>
        <tr>
          <td>
            <Canvas videoRef={myVideoRef} />
          </td>
          <td>
            <Canvas videoRef={remoteVideoRef} />
          </td>
        </tr>
      </tbody>
    </table>
    <button onClick={checkData}>data check!</button>
    <Link  to="/">back home</Link>
  </>)
}
export default Chat;


