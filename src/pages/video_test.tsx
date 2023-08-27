import React, { lazy, useEffect, useRef } from 'react'

import * as Kalidokit from 'kalidokit'
import '@mediapipe/holistic/holistic'
import '@mediapipe/camera_utils/camera_utils'
import { drawConnectors } from "@mediapipe/drawing_utils";
import { 
  Holistic,
  ResultsListener,
  Results,
  FACEMESH_TESSELATION,
  FACEMESH_RIGHT_EYE,
  FACEMESH_RIGHT_EYEBROW,
  FACEMESH_LEFT_IRIS,
  FACEMESH_RIGHT_IRIS,
  FACEMESH_LEFT_EYE,
  FACEMESH_LEFT_EYEBROW,
  FACEMESH_FACE_OVAL,
  FACEMESH_LIPS,
} from '@mediapipe/holistic'
import { Camera } from '@mediapipe/camera_utils'
import { ExtendedCamera } from '../interfaces/extendedCamera'
const Canvas = lazy(() => import('../components/canvas'))

const VideoTest = () => {

  const myVideoRef = useRef<HTMLVideoElement>(null)
  const myCanvasRef = useRef<HTMLCanvasElement>(null)

  // const getMedia = async () => {
  //   try {
  //     // 자신이 원하는 자신의 스트림정보
  //     const stream = await navigator.mediaDevices.getUserMedia({
  //       video: true,
  //       audio: true,
  //     });
  //     console.log(stream);
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }
  
  const onHolisticResults: ResultsListener = (results: Results)=>{
    // do something with prediction results
    // landmark names may change depending on TFJS/Mediapipe model version

    // let facelm = results.faceLandmarks;
    // let poselm = results.poseLandmarks;
    // let poselm3D = results.poseLandmarks as Kalidokit.TFVectorPose;
    // let rightHandlm = results.rightHandLandmarks;
    // let leftHandlm = results.leftHandLandmarks;

    // let faceRig = Kalidokit.Face.solve(facelm,{runtime:'mediapipe',video:myVideoRef.current})
    // let poseRig = Kalidokit.Pose.solve(poselm3D, poselm,{runtime:'mediapipe',video:myVideoRef.current})
    // let rightHandRig = Kalidokit.Hand.solve(rightHandlm,"Right")
    // let leftHandRig = Kalidokit.Hand.solve(leftHandlm,"Left")

    if (!myCanvasRef.current || !myVideoRef.current) return
    const canvasCtx = myCanvasRef.current.getContext('2d')
    if (!canvasCtx) return

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, myCanvasRef.current.width, myCanvasRef.current.height);
    // 検出したランドマークを描画
    if (results.faceLandmarks) {
      // drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION, {
      //   color: "#C0C0C070",
      //   lineWidth: 1,
      // });

      // drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_RIGHT_EYE, {
      //   color: "#FF3030",
      // });
      // drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_RIGHT_EYEBROW, {
      //   color: "#FF3030",
      // });
      // drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_RIGHT_IRIS, {
      //   color: "#FF3030",
      // });
      // drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_LEFT_EYE, {
      //   color: "#30FF30",
      // });
      // drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_LEFT_EYEBROW, {
      //   color: "#30FF30",
      // });
      // drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_LEFT_IRIS, {
      //   color: "#30FF30",
      // });
      // drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_FACE_OVAL, {
      //   color: "#E0E0E0",
      // });
      // drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_LIPS, { color: "#E0E0E0" });

      Kalidokit.Face.solve(results.faceLandmarks, {
          runtime: "tfjs", // `mediapipe` or `tfjs`
          video: myVideoRef.current,
          imageSize: { height: 0, width: 0 },
          smoothBlink: false, // smooth left and right eye blink delays
          blinkSettings: [0.25, 0.75], // adjust upper and lower bound blink sensitivity
      });
    }

  

    canvasCtx.restore();
  }

  const holistic = new Holistic({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.4.1633559476/${file}`;
  }});

  holistic.setOptions({
    refineFaceLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  })

  holistic.onResults(onHolisticResults);

  
  useEffect(() => {
    // use Mediapipe's webcam utils to send video to holistic every frame
    // getMedia()
    (async ()=> {

      const camera = await new Camera(myVideoRef.current!, {
        onFrame: async () => {
          await holistic.send({image: myVideoRef.current!});
        },
        width: 640,
        height: 480
      }) as ExtendedCamera;
      await camera.start();
      // stream
      console.log(camera.g)
    })()
    return (() => {
      
    })
  }, [])
  const handleRoomIDSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
  }
  return (<>
    <video ref={myVideoRef}></video>
    <canvas ref={myCanvasRef}></canvas>
    <div>kalido video test</div>
    <button onClick={handleRoomIDSubmit}>rest</button>
  </>)
}
export default VideoTest;