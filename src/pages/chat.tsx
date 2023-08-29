import React, { lazy, useRef, useEffect, useState } from 'react'
import * as Kalidokit from 'kalidokit'
import socketIOClient, { Socket } from 'socket.io-client'
import { Router, Link, useParams } from 'react-router-dom'
import { Camera } from '@mediapipe/camera_utils'
import { ExtendedCamera } from '../interfaces/extendedCamera'
import { 
  Clock,
  DirectionalLight,
  Euler,
  PerspectiveCamera,
  Scene,
  Quaternion,
  WebGLRenderer,
  Vector3
} from 'three'
import { VRM, VRMSchema, VRMUtils } from '@pixiv/three-vrm';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { CanvasRef } from '../components/canvas'
import { clamp, lerp } from 'three/src/math/MathUtils'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const Canvas = lazy(() => import('../components/canvas'))

const SOCKET_URL = `${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`

const Chat = () => {
    // 소켓정보를 담을 Ref
  const socketRef = useRef<Socket>()
  // 자신의 스트림
  const streamRef = useRef<MediaStream>()
  // 자신의 비디오
  const myVideoRef = useRef<HTMLVideoElement>(document.createElement('video'))
  const myCanvasRef = useRef<HTMLCanvasElement>(null)
  const myOldLookTarget = useRef<Euler>(new Euler())
  const mySceneRef = useRef<Scene>(new Scene())
  const myRendererRef = useRef<WebGLRenderer>()
  const myOrbitCameraRef = useRef<PerspectiveCamera>()
  const myClockRef = useRef<Clock>()
  const myVrmRef = useRef<VRM>();
  // 다른사람의 비디오
  // @ts-ignore
  const remoteResultsRef = useRef<Results>(undefined)
  const remoteCanvasRef = useRef<HTMLCanvasElement>(null)
  const remoteOldLookTarget = useRef<Euler>(new Euler())
  const remoteSceneRef = useRef<Scene>(new Scene())
  const remoteRendererRef = useRef<WebGLRenderer>()
  const remoteOrbitCameraRef = useRef<PerspectiveCamera>()
  const remoteClockRef = useRef<Clock>()
  const remoteVrmRef = useRef<VRM>();
  // const scene = useRef<Scene>(new Scene())

  const [ successMyCanvas, setSuccessMyCanvas ] = useState<Boolean>(false);

  // peerConnection
  const peerRef = useRef<RTCPeerConnection>(new RTCPeerConnection({
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302',
      },
    ],
  }))
  // @ts-ignore
  const holisticRef = useRef<Holistic>()
  const dataChannelRef = useRef<RTCDataChannel>()
  const { roomID } = useParams();

  const checkData = (e: any) => {
    e.preventDefault()
    console.log(dataChannelRef.current?.readyState);
    dataChannelRef.current?.send('hello, world!')
    // dataChannelRef.current = peerRef.current!.createDataChannel("ChatRoom")
  }

  const calculateVideo = async () => {
    if (holisticRef.current && myVideoRef.current) {
      await holisticRef.current.send({image: myVideoRef.current});
    }
  }
  const myAnimate = async () => {
    await calculateVideo()
    
    if (!(myClockRef.current && myRendererRef.current && myOrbitCameraRef.current)) return
    if (myVrmRef.current) {
      myVrmRef.current.update(myClockRef.current.getDelta());
    }
    myRendererRef.current.render(mySceneRef.current, myOrbitCameraRef.current);
    remoteAnimate()
    requestAnimationFrame(myAnimate)
  }
  const remoteAnimate = async () => {
    if (remoteResultsRef.current) remoteResults(remoteResultsRef.current)
    
    if (!(remoteClockRef.current && remoteRendererRef.current && remoteOrbitCameraRef.current)) return
    if (remoteVrmRef.current) {
      await remoteVrmRef.current.update(remoteClockRef.current.getDelta());
    }
    await remoteRendererRef.current.render(remoteSceneRef.current, remoteOrbitCameraRef.current);
  }
  
  const setMedia = async () => {
    try {
      // @ts-ignore
      const holistic = await new Holistic({locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.5.1635989137/${file}`;
      }});
      holistic.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7,
        refineFaceLandmarks: true,
      })
      holisticRef.current = holistic

      const myCamera = await new Camera(myVideoRef.current!, {
        onFrame: async () => {
          // await holistic.send({image: myVideoRef.current!});
        },
        width: 640,
        height: 480
      }) as ExtendedCamera
      await myCamera.start()
      const stream = myCamera.g
      
      streamRef.current = stream
      myVideoRef.current.srcObject = stream
    } catch (e) {
      console.error(e)
    }
  }
  
  const getMyModel = async () => {
    const loader = new GLTFLoader();
    loader.crossOrigin = "anonymous";
    // Import model from URL, add your own model here
    await loader.load(
      "https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FAshtra.vrm?v=1630342336981",
      async gltf => {
        await VRMUtils.removeUnnecessaryJoints(gltf.scene);
        await VRM.from(gltf).then(v => {
          mySceneRef.current.add(v.scene);
          myVrmRef.current = v
          myVrmRef.current.scene.rotation.y = Math.PI;
        });
      },

      progress =>
        console.log(
          "Loading model...",
          100.0 * (progress.loaded / progress.total),
          "%"
        ),

      error => console.error(error)
    );
  }
  const setMyThree =  () => {
    myRendererRef.current = new WebGLRenderer({
      canvas: myCanvasRef.current!,
      alpha:true
    });
    myRendererRef.current.setPixelRatio(window.devicePixelRatio);

    // camera
    myOrbitCameraRef.current = new PerspectiveCamera(35, 300 / 225, 0.1, 1000);
    myOrbitCameraRef.current.position.set(-0.1, 1.4, 0.7);

    // controls
    const orbitControls = new OrbitControls(myOrbitCameraRef.current, myRendererRef.current.domElement);
    orbitControls.screenSpacePanning = true;
    orbitControls.target.set(-0.1, 1.4, 0.0);
    orbitControls.update();

    // light
    const light = new DirectionalLight(0xffffff);
    light.position.set(1.0, 1.0, 1.0).normalize();
    mySceneRef.current.add(light);
    myClockRef.current = new Clock()
  }

  const getRemoteModel = async () => {
    const loader = new GLTFLoader();
    loader.crossOrigin = "anonymous";
    // Import model from URL, add your own model here
    await loader.load(
      "https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FAshtra.vrm?v=1630342336981",
      async gltf => {
        await VRMUtils.removeUnnecessaryJoints(gltf.scene);
        await VRM.from(gltf).then(v => {
          remoteSceneRef.current.add(v.scene);
          remoteVrmRef.current = v
          remoteVrmRef.current.scene.rotation.y = Math.PI;
        });
      },

      progress =>
        console.log(
          "Loading Remote model...",
          100.0 * (progress.loaded / progress.total),
          "%"
        ),

      error => console.error(error)
    );
  }
  const setRemoteThree =  () => {
    remoteRendererRef.current = new WebGLRenderer({
      canvas: remoteCanvasRef.current!,
      alpha:true
    });
    remoteRendererRef.current.setPixelRatio(window.devicePixelRatio);

    // camera
    remoteOrbitCameraRef.current = new PerspectiveCamera(35, 300 / 225, 0.1, 1000);
    remoteOrbitCameraRef.current.position.set(-0.1, 1.4, 0.7);

    // controls
    const orbitControls = new OrbitControls(remoteOrbitCameraRef.current, remoteRendererRef.current.domElement);
    orbitControls.screenSpacePanning = true;
    orbitControls.target.set(-0.1, 1.4, 0.0);
    orbitControls.update();

    // light
    const light = new DirectionalLight(0xffffff);
    light.position.set(1.0, 1.0, 1.0).normalize();
    remoteSceneRef.current.add(light);

    // async function animate() {
    //   if (holisticRef.current && videoRef.current)
    //   await holisticRef.current.send({image: videoRef.current});
    // }
    remoteClockRef.current = new Clock()
  }
  const setPeer = () => {
    if (!(peerRef.current && streamRef.current)) return
      // 스트림을 peerConnection에 등록
      peerRef.current.addTrack(streamRef.current.getTracks()[0])

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
        // dataChannel.send('hello, world!')
        console.log('ok candidate')
      };
      console.log('set peer data channel handler');
      peerRef.current.ondatachannel = (e: RTCDataChannelEvent) => {
        console.log('try peer data channel', e);
        dataChannelRef.current = e.channel
        dataChannelRef.current.onmessage = (e) => {
          remoteResultsRef.current = JSON.parse(e.data)
          // console.log('on message', remoteResultsRef.current)
          // remoteResultsRef.current
        }
        dataChannelRef.current.onopen = () => {
          console.log('open channel');
        }
      }

      // 구 addStream 현 track 이벤트 
      peerRef.current.ontrack = (e) => {
        console.log('wow');
        // if (remoteVideoRef.current) {
        //   remoteVideoRef.current.srcObject = e.streams[0];
        // }
      }
  }
  const setSocket = () => {
    // Socket connect
    // socketRef.current = socketIOClient(SOCKET_URL)
    if(!socketRef.current) return
    // 마운트시 해당 방의 roomID을 서버에 전달
    socketRef.current!.emit('join_room', {
      room: roomID,
    });
      
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
  }

  const createOffer = async () => {
    console.log('create Offer');
    dataChannelRef.current = peerRef.current!.createDataChannel("ChatRoom")
    dataChannelRef.current.onmessage = (e) => {
      
      remoteResultsRef.current = JSON.parse(e.data)
      // console.log('on message', remoteResultsRef.current);
      // remoteResultsRef...
    }
    dataChannelRef.current.onopen = () => {
      console.log('open channel');
    }
    
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

  // rigid control == animate
  const rigRotation = (
    vrmRef: React.MutableRefObject<VRM | undefined>,
    name: keyof typeof VRMSchema.HumanoidBoneName,
    rotation = { x: 0, y: 0, z: 0 },
    dampener = 1,
    lerpAmount = 0.3
  ) => {
    if (!vrmRef.current) return
    const Part = vrmRef.current.humanoid?.getBoneNode(
      VRMSchema.HumanoidBoneName[name]
    );
    if (!Part) {return}
    
    let euler = new Euler(
      rotation.x * dampener,
      rotation.y * dampener,
      rotation.z * dampener
    );
    let quaternion = new Quaternion().setFromEuler(euler);
    Part.quaternion.slerp(quaternion, lerpAmount); // interpolate
  };
  
  const rigPosition = (
    vrmRef: React.MutableRefObject<VRM | undefined>,
    name: keyof typeof VRMSchema.HumanoidBoneName,
    position = { x: 0, y: 0, z: 0 },
    dampener = 1,
    lerpAmount = 0.3
  ) => {
    if (!vrmRef.current) return
    const Part = vrmRef.current.humanoid?.getBoneNode(
      VRMSchema.HumanoidBoneName[name]
    );
    if (!Part) {return}
    let vector = new Vector3(
      position.x * dampener,
      position.y * dampener,
      position.z * dampener
    );
    Part.position.lerp(vector, lerpAmount); // interpolate
  };
  const rigFace = (riggedFace:Kalidokit.TFace, vrmRef: React.MutableRefObject<VRM | undefined>, oldLookTarget: React.MutableRefObject<Euler>) => {
    if (!vrmRef.current) return
    rigRotation(vrmRef, "Neck", riggedFace.head, 0.7);

    // Blendshapes and Preset Name Schema
    const Blendshape = vrmRef.current.blendShapeProxy;
    const PresetName = VRMSchema.BlendShapePresetName;
    if (!Blendshape || !PresetName) return

    // Simple example without winking. Interpolate based on old blendshape, then stabilize blink with `Kalidokit` helper function.
    // for VRM, 1 is closed, 0 is open.
    riggedFace.eye.l = lerp(clamp(1 - riggedFace.eye.l, 0, 1),Blendshape.getValue(PresetName.Blink) ?? 0, .5)
    riggedFace.eye.r = lerp(clamp(1 - riggedFace.eye.r, 0, 1),Blendshape.getValue(PresetName.Blink) ?? 0, .5)
    riggedFace.eye = Kalidokit.Face.stabilizeBlink(riggedFace.eye,riggedFace.head.y)
    Blendshape.setValue(PresetName.Blink, riggedFace.eye.l);
    
    // Interpolate and set mouth blendshapes
    Blendshape.setValue(PresetName.I, lerp(riggedFace.mouth.shape.I,Blendshape.getValue(PresetName.I) ?? 0, .5));
    Blendshape.setValue(PresetName.A, lerp(riggedFace.mouth.shape.A,Blendshape.getValue(PresetName.A) ?? 0, .5));
    Blendshape.setValue(PresetName.E, lerp(riggedFace.mouth.shape.E,Blendshape.getValue(PresetName.E) ?? 0, .5));
    Blendshape.setValue(PresetName.O, lerp(riggedFace.mouth.shape.O,Blendshape.getValue(PresetName.O) ?? 0, .5));
    Blendshape.setValue(PresetName.U, lerp(riggedFace.mouth.shape.U,Blendshape.getValue(PresetName.U) ?? 0, .5));

    //PUPILS
    //interpolate pupil and keep a copy of the value
    let lookTarget =
      new Euler(
        lerp(oldLookTarget.current.x, riggedFace.pupil.y, .4),
        lerp(oldLookTarget.current.y, riggedFace.pupil.x, .4),
        0,
        "XYZ"
      )
    oldLookTarget.current.copy(lookTarget)
    vrmRef.current.lookAt?.applyer?.lookAt(lookTarget);
  }
  // @ts-ignore
  const onResults: ResultsListener = (results: Results) => {
    if (!(myCanvasRef.current && myVideoRef.current && myVrmRef.current)) return
    if (dataChannelRef.current?.readyState === "open") dataChannelRef.current?.send(JSON.stringify(results))
    // Take the results from `Holistic` and animate character based on its Face, Pose, and Hand Keypoints.
    let riggedPose, riggedLeftHand, riggedRightHand, riggedFace;
  
    const faceLandmarks = results.faceLandmarks;
    // Pose 3D Landmarks are with respect to Hip distance in meters
    const pose3DLandmarks = results.ea;
    // Pose 2D landmarks are with respect to videoWidth and videoHeight
    const pose2DLandmarks = results.poseLandmarks;
    // Be careful, hand landmarks may be reversed
    const leftHandLandmarks = results.rightHandLandmarks;
    const rightHandLandmarks = results.leftHandLandmarks;
  
    // Animate Face
    if (faceLandmarks) {
      riggedFace = Kalidokit.Face.solve(faceLandmarks,{
        runtime:"mediapipe",
        video: myVideoRef.current
      });
      if (!(riggedFace && myVrmRef)) return
      // @ts-ignore
      rigFace(riggedFace, myVrmRef, myOldLookTarget)
    }
  
    // Animate Pose
    if (pose2DLandmarks && pose3DLandmarks) {
      riggedPose = Kalidokit.Pose.solve(pose3DLandmarks, pose2DLandmarks, {
        runtime: "mediapipe",
        video: myVideoRef.current,
      });
      if (!riggedPose) return
      rigRotation(myVrmRef, "Hips", riggedPose.Hips.rotation, 0.7);
      rigPosition(
        myVrmRef,
        "Hips",
        {
          x: -riggedPose.Hips.position.x, // Reverse direction
          y: riggedPose.Hips.position.y + 1, // Add a bit of height
          z: -riggedPose.Hips.position.z // Reverse direction
        },
        1,
        0.07
      );
  
      rigRotation(myVrmRef, "Chest", riggedPose.Spine, 0.25, .3);
      rigRotation(myVrmRef, "Spine", riggedPose.Spine, 0.45, .3);
  
      rigRotation(myVrmRef, "RightUpperArm", riggedPose.RightUpperArm, 1, .3);
      rigRotation(myVrmRef, "RightLowerArm", riggedPose.RightLowerArm, 1, .3);
      rigRotation(myVrmRef, "LeftUpperArm", riggedPose.LeftUpperArm, 1, .3);
      rigRotation(myVrmRef, "LeftLowerArm", riggedPose.LeftLowerArm, 1, .3);
  
      rigRotation(myVrmRef, "LeftUpperLeg", riggedPose.LeftUpperLeg, 1, .3);
      rigRotation(myVrmRef, "LeftLowerLeg", riggedPose.LeftLowerLeg, 1, .3);
      rigRotation(myVrmRef, "RightUpperLeg", riggedPose.RightUpperLeg, 1, .3);
      rigRotation(myVrmRef, "RightLowerLeg", riggedPose.RightLowerLeg, 1, .3);
    }
  
    // Animate Hands
    if (leftHandLandmarks) {
      riggedLeftHand = Kalidokit.Hand.solve(leftHandLandmarks, "Left");
      if(!riggedLeftHand || !riggedPose) return
      rigRotation(myVrmRef, "LeftHand", {
        // Combine pose rotation Z and hand rotation X Y
        z: riggedPose.LeftHand.z,
        y: riggedLeftHand.LeftWrist.y,
        x: riggedLeftHand.LeftWrist.x
      });
      rigRotation(myVrmRef, "LeftRingProximal", riggedLeftHand.LeftRingProximal);
      rigRotation(myVrmRef, "LeftRingIntermediate", riggedLeftHand.LeftRingIntermediate);
      rigRotation(myVrmRef, "LeftRingDistal", riggedLeftHand.LeftRingDistal);
      rigRotation(myVrmRef, "LeftIndexProximal", riggedLeftHand.LeftIndexProximal);
      rigRotation(myVrmRef, "LeftIndexIntermediate", riggedLeftHand.LeftIndexIntermediate);
      rigRotation(myVrmRef, "LeftIndexDistal", riggedLeftHand.LeftIndexDistal);
      rigRotation(myVrmRef, "LeftMiddleProximal", riggedLeftHand.LeftMiddleProximal);
      rigRotation(myVrmRef, "LeftMiddleIntermediate", riggedLeftHand.LeftMiddleIntermediate);
      rigRotation(myVrmRef, "LeftMiddleDistal", riggedLeftHand.LeftMiddleDistal);
      rigRotation(myVrmRef, "LeftThumbProximal", riggedLeftHand.LeftThumbProximal);
      rigRotation(myVrmRef, "LeftThumbIntermediate", riggedLeftHand.LeftThumbIntermediate);
      rigRotation(myVrmRef, "LeftThumbDistal", riggedLeftHand.LeftThumbDistal);
      rigRotation(myVrmRef, "LeftLittleProximal", riggedLeftHand.LeftLittleProximal);
      rigRotation(myVrmRef, "LeftLittleIntermediate", riggedLeftHand.LeftLittleIntermediate);
      rigRotation(myVrmRef, "LeftLittleDistal", riggedLeftHand.LeftLittleDistal);
    }
    if (rightHandLandmarks) {
      riggedRightHand = Kalidokit.Hand.solve(rightHandLandmarks, "Right");
      if(!riggedRightHand || !riggedPose) return
      rigRotation(myVrmRef, "RightHand", {
        // Combine Z axis from pose hand and X/Y axis from hand wrist rotation
        z: riggedPose.RightHand.z,
        y: riggedRightHand.RightWrist.y,
        x: riggedRightHand.RightWrist.x
      });
      rigRotation(myVrmRef, "RightRingProximal", riggedRightHand.RightRingProximal);
      rigRotation(myVrmRef, "RightRingIntermediate", riggedRightHand.RightRingIntermediate);
      rigRotation(myVrmRef, "RightRingDistal", riggedRightHand.RightRingDistal);
      rigRotation(myVrmRef, "RightIndexProximal", riggedRightHand.RightIndexProximal);
      rigRotation(myVrmRef, "RightIndexIntermediate",riggedRightHand.RightIndexIntermediate);
      rigRotation(myVrmRef, "RightIndexDistal", riggedRightHand.RightIndexDistal);
      rigRotation(myVrmRef, "RightMiddleProximal", riggedRightHand.RightMiddleProximal);
      rigRotation(myVrmRef, "RightMiddleIntermediate", riggedRightHand.RightMiddleIntermediate);
      rigRotation(myVrmRef, "RightMiddleDistal", riggedRightHand.RightMiddleDistal);
      rigRotation(myVrmRef, "RightThumbProximal", riggedRightHand.RightThumbProximal);
      rigRotation(myVrmRef, "RightThumbIntermediate", riggedRightHand.RightThumbIntermediate);
      rigRotation(myVrmRef, "RightThumbDistal", riggedRightHand.RightThumbDistal);
      rigRotation(myVrmRef, "RightLittleProximal", riggedRightHand.RightLittleProximal);
      rigRotation(myVrmRef, "RightLittleIntermediate", riggedRightHand.RightLittleIntermediate);
      rigRotation(myVrmRef, "RightLittleDistal", riggedRightHand.RightLittleDistal);
    }
  };

  // @ts-ignore
  const remoteResults = (results: Results) => {
    if (!(myCanvasRef.current && myVideoRef.current && myVrmRef.current)) return
    console.log('remote results');
    // Take the results from `Holistic` and animate character based on its Face, Pose, and Hand Keypoints.
    let riggedPose, riggedLeftHand, riggedRightHand, riggedFace;
  
    const faceLandmarks = results.faceLandmarks;
    // Pose 3D Landmarks are with respect to Hip distance in meters
    const pose3DLandmarks = results.ea;
    // Pose 2D landmarks are with respect to videoWidth and videoHeight
    const pose2DLandmarks = results.poseLandmarks;
    // Be careful, hand landmarks may be reversed
    const leftHandLandmarks = results.rightHandLandmarks;
    const rightHandLandmarks = results.leftHandLandmarks;
  
    // Animate Face
    if (faceLandmarks) {
      riggedFace = Kalidokit.Face.solve(faceLandmarks,{
        runtime:"mediapipe",
      });
      if (!riggedFace) return
      rigFace(riggedFace, remoteVrmRef, remoteOldLookTarget)
    }
  
    // Animate Pose
    if (pose2DLandmarks && pose3DLandmarks) {
      riggedPose = Kalidokit.Pose.solve(pose3DLandmarks, pose2DLandmarks, {
        runtime: "mediapipe",
      });
      if (!riggedPose) return
      rigRotation(remoteVrmRef, "Hips", riggedPose.Hips.rotation, 0.7);
      rigPosition(
        remoteVrmRef,
        "Hips",
        {
          x: -riggedPose.Hips.position.x, // Reverse direction
          y: riggedPose.Hips.position.y + 1, // Add a bit of height
          z: -riggedPose.Hips.position.z // Reverse direction
        },
        1,
        0.07
      );
  
      rigRotation(remoteVrmRef, "Chest", riggedPose.Spine, 0.25, .3);
      rigRotation(remoteVrmRef, "Spine", riggedPose.Spine, 0.45, .3);
  
      rigRotation(remoteVrmRef, "RightUpperArm", riggedPose.RightUpperArm, 1, .3);
      rigRotation(remoteVrmRef, "RightLowerArm", riggedPose.RightLowerArm, 1, .3);
      rigRotation(remoteVrmRef, "LeftUpperArm", riggedPose.LeftUpperArm, 1, .3);
      rigRotation(remoteVrmRef, "LeftLowerArm", riggedPose.LeftLowerArm, 1, .3);
  
      rigRotation(remoteVrmRef, "LeftUpperLeg", riggedPose.LeftUpperLeg, 1, .3);
      rigRotation(remoteVrmRef, "LeftLowerLeg", riggedPose.LeftLowerLeg, 1, .3);
      rigRotation(remoteVrmRef, "RightUpperLeg", riggedPose.RightUpperLeg, 1, .3);
      rigRotation(remoteVrmRef, "RightLowerLeg", riggedPose.RightLowerLeg, 1, .3);
    }
  
    // Animate Hands
    if (leftHandLandmarks) {
      riggedLeftHand = Kalidokit.Hand.solve(leftHandLandmarks, "Left");
      if(!riggedLeftHand || !riggedPose) return
      rigRotation(remoteVrmRef, "LeftHand", {
        // Combine pose rotation Z and hand rotation X Y
        z: riggedPose.LeftHand.z,
        y: riggedLeftHand.LeftWrist.y,
        x: riggedLeftHand.LeftWrist.x
      });
      rigRotation(remoteVrmRef, "LeftRingProximal", riggedLeftHand.LeftRingProximal);
      rigRotation(remoteVrmRef, "LeftRingIntermediate", riggedLeftHand.LeftRingIntermediate);
      rigRotation(remoteVrmRef, "LeftRingDistal", riggedLeftHand.LeftRingDistal);
      rigRotation(remoteVrmRef, "LeftIndexProximal", riggedLeftHand.LeftIndexProximal);
      rigRotation(remoteVrmRef, "LeftIndexIntermediate", riggedLeftHand.LeftIndexIntermediate);
      rigRotation(remoteVrmRef, "LeftIndexDistal", riggedLeftHand.LeftIndexDistal);
      rigRotation(remoteVrmRef, "LeftMiddleProximal", riggedLeftHand.LeftMiddleProximal);
      rigRotation(remoteVrmRef, "LeftMiddleIntermediate", riggedLeftHand.LeftMiddleIntermediate);
      rigRotation(remoteVrmRef, "LeftMiddleDistal", riggedLeftHand.LeftMiddleDistal);
      rigRotation(remoteVrmRef, "LeftThumbProximal", riggedLeftHand.LeftThumbProximal);
      rigRotation(remoteVrmRef, "LeftThumbIntermediate", riggedLeftHand.LeftThumbIntermediate);
      rigRotation(remoteVrmRef, "LeftThumbDistal", riggedLeftHand.LeftThumbDistal);
      rigRotation(remoteVrmRef, "LeftLittleProximal", riggedLeftHand.LeftLittleProximal);
      rigRotation(remoteVrmRef, "LeftLittleIntermediate", riggedLeftHand.LeftLittleIntermediate);
      rigRotation(remoteVrmRef, "LeftLittleDistal", riggedLeftHand.LeftLittleDistal);
    }
    if (rightHandLandmarks) {
      riggedRightHand = Kalidokit.Hand.solve(rightHandLandmarks, "Right");
      if(!riggedRightHand || !riggedPose) return
      rigRotation(remoteVrmRef, "RightHand", {
        // Combine Z axis from pose hand and X/Y axis from hand wrist rotation
        z: riggedPose.RightHand.z,
        y: riggedRightHand.RightWrist.y,
        x: riggedRightHand.RightWrist.x
      });
      rigRotation(remoteVrmRef, "RightRingProximal", riggedRightHand.RightRingProximal);
      rigRotation(remoteVrmRef, "RightRingIntermediate", riggedRightHand.RightRingIntermediate);
      rigRotation(remoteVrmRef, "RightRingDistal", riggedRightHand.RightRingDistal);
      rigRotation(remoteVrmRef, "RightIndexProximal", riggedRightHand.RightIndexProximal);
      rigRotation(remoteVrmRef, "RightIndexIntermediate",riggedRightHand.RightIndexIntermediate);
      rigRotation(remoteVrmRef, "RightIndexDistal", riggedRightHand.RightIndexDistal);
      rigRotation(remoteVrmRef, "RightMiddleProximal", riggedRightHand.RightMiddleProximal);
      rigRotation(remoteVrmRef, "RightMiddleIntermediate", riggedRightHand.RightMiddleIntermediate);
      rigRotation(remoteVrmRef, "RightMiddleDistal", riggedRightHand.RightMiddleDistal);
      rigRotation(remoteVrmRef, "RightThumbProximal", riggedRightHand.RightThumbProximal);
      rigRotation(remoteVrmRef, "RightThumbIntermediate", riggedRightHand.RightThumbIntermediate);
      rigRotation(remoteVrmRef, "RightThumbDistal", riggedRightHand.RightThumbDistal);
      rigRotation(remoteVrmRef, "RightLittleProximal", riggedRightHand.RightLittleProximal);
      rigRotation(remoteVrmRef, "RightLittleIntermediate", riggedRightHand.RightLittleIntermediate);
      rigRotation(remoteVrmRef, "RightLittleDistal", riggedRightHand.RightLittleDistal);
    }
  };

  useEffect(() => {
    (async () => {
      
      if (socketRef.current) return
      socketRef.current = socketIOClient(SOCKET_URL, {secure: true})
      // media setting 
      await setMedia()

      await getMyModel()
      await setMyThree()

      await getRemoteModel()
      await setRemoteThree()
      
      // for while TODO
      // await holistic.current.send({image: stream});
      
      setPeer()
      setSocket()
      
      holisticRef.current.onResults(onResults);
      setSuccessMyCanvas(true)
    })()

    return () => {
      // 언마운트시 socket disconnect
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (peerRef.current) {
        peerRef.current.close();
      }
      if (streamRef.current) {
        // 스트림 중지 및 트랙 해제
        streamRef.current.getTracks().forEach((track) => {
          track.stop()
        });
      }
    }
  }, [])
  useEffect(() => {
    if (!successMyCanvas) return
    console.log('start my animate');
    setSuccessMyCanvas(false)
    myAnimate()
  }, [ successMyCanvas ])
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
            <canvas ref={myCanvasRef}></canvas>
          </td>
          <td>
            <canvas ref={remoteCanvasRef}></canvas>
          </td>
        </tr>
      </tbody>
    </table>
    <button onClick={checkData}>check!</button>
    <Link  to="/">back home</Link>
  </>)
}
export default Chat;


