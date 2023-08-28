import React, { createElement, lazy, useEffect, useRef, useState } from 'react'

import * as Kalidokit from 'kalidokit'
import { remap, clamp } from 'kalidokit/dist/utils/helpers';
import '@mediapipe/holistic/holistic'
import '@mediapipe/camera_utils/camera_utils'
import { drawConnectors } from "@mediapipe/drawing_utils";
// import { Holistic, Results, ResultsListener } from '@mediapipe/holistic'
import { Camera } from '@mediapipe/camera_utils'
import { ExtendedCamera } from '../interfaces/extendedCamera'
// import THREE from 'three'
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
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { lerp } from 'three/src/math/MathUtils';
import { VRM, VRMSchema, VRMUtils } from '@pixiv/three-vrm';
const Canvas = lazy(() => import('../components/canvas'))

const VideoTest = () => {

  const myVideoRef = useRef<HTMLVideoElement>(document.createElement('video'))
  const myCanvasRef = useRef<HTMLCanvasElement>(null)
  const scene = useRef<Scene>(new Scene())
  const currentVrm = useRef<VRM>()
  const oldLookTarget = useRef<THREE.Euler>(new Euler())
  const streamRef = useRef<MediaStream>()
  // @ts-ignore
  const holisticRef = useRef<Holistic>()

  const [ value, setValue ] = useState(0)

  // load model
  const threeSetup = async () => {
    // renderer
    const renderer = new WebGLRenderer({
      canvas: myCanvasRef.current!,
      alpha:true
    });
    renderer.setPixelRatio(window.devicePixelRatio);

    // camera
    const orbitCamera = new PerspectiveCamera(35, 300 / 225, 0.1, 1000);
    orbitCamera.position.set(-0.1, 1.4, 0.7);

    // controls
    const orbitControls = new OrbitControls(orbitCamera, renderer.domElement);
    orbitControls.screenSpacePanning = true;
    orbitControls.target.set(-0.1, 1.4, 0.0);
    orbitControls.update();

    // light
    const light = new DirectionalLight(0xffffff);
    light.position.set(1.0, 1.0, 1.0).normalize();
    scene.current.add(light);

    // Main Render Loop
    const clock = new Clock();

    async function animate() {
      if (holisticRef.current)
        await holisticRef.current.send({image: myVideoRef.current});
      if (currentVrm.current) {
        // Update model to render physics
        currentVrm.current.update(clock.getDelta());
      }
      renderer.render(scene.current, orbitCamera);
      requestAnimationFrame(animate);
    }
    await animate();
  }
  const modelLoad = async () => {
    const loader = new GLTFLoader();
    loader.crossOrigin = "anonymous";
    // Import model from URL, add your own model here
    await loader.load(
      "https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FAshtra.vrm?v=1630342336981",
      async gltf => {
        await VRMUtils.removeUnnecessaryJoints(gltf.scene);
        await VRM.from(gltf).then(vrm => {
          scene.current.add(vrm.scene);
          currentVrm.current = vrm;
          currentVrm.current.scene.rotation.y = Math.PI; // Rotate model 180deg to face camera
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
  // rigid control == animate
  const rigRotation = (
    name: keyof typeof VRMSchema.HumanoidBoneName,
    rotation = { x: 0, y: 0, z: 0 },
    dampener = 1,
    lerpAmount = 0.3
  ) => {
    if (!currentVrm.current) return
    const Part = currentVrm.current.humanoid?.getBoneNode(
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
    name: keyof typeof VRMSchema.HumanoidBoneName,
    position = { x: 0, y: 0, z: 0 },
    dampener = 1,
    lerpAmount = 0.3
  ) => {
    if (!currentVrm.current) return
    const Part = currentVrm.current.humanoid?.getBoneNode(
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
  const rigFace = (riggedFace:any) => {
    if(!currentVrm.current) return
    rigRotation("Neck", riggedFace.head, 0.7);

    // Blendshapes and Preset Name Schema
    const Blendshape = currentVrm.current.blendShapeProxy;
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
    currentVrm.current.lookAt?.applyer?.lookAt(lookTarget);
  }
  // @ts-ignore
  const onResults: ResultsListener = (results: Results) => {
    if (!(myCanvasRef.current && myVideoRef.current && currentVrm.current)) return

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
      rigFace(riggedFace)
    }
  
    // Animate Pose
    if (pose2DLandmarks && pose3DLandmarks) {
      riggedPose = Kalidokit.Pose.solve(pose3DLandmarks, pose2DLandmarks, {
        runtime: "mediapipe",
        video: myVideoRef.current,
      });
      if (!riggedPose) return
      rigRotation("Hips", riggedPose.Hips.rotation, 0.7);
      rigPosition(
        "Hips",
        {
          x: -riggedPose.Hips.position.x, // Reverse direction
          y: riggedPose.Hips.position.y + 1, // Add a bit of height
          z: -riggedPose.Hips.position.z // Reverse direction
        },
        1,
        0.07
      );
  
      rigRotation("Chest", riggedPose.Spine, 0.25, .3);
      rigRotation("Spine", riggedPose.Spine, 0.45, .3);
  
      rigRotation("RightUpperArm", riggedPose.RightUpperArm, 1, .3);
      rigRotation("RightLowerArm", riggedPose.RightLowerArm, 1, .3);
      rigRotation("LeftUpperArm", riggedPose.LeftUpperArm, 1, .3);
      rigRotation("LeftLowerArm", riggedPose.LeftLowerArm, 1, .3);
  
      rigRotation("LeftUpperLeg", riggedPose.LeftUpperLeg, 1, .3);
      rigRotation("LeftLowerLeg", riggedPose.LeftLowerLeg, 1, .3);
      rigRotation("RightUpperLeg", riggedPose.RightUpperLeg, 1, .3);
      rigRotation("RightLowerLeg", riggedPose.RightLowerLeg, 1, .3);
    }
  
    // Animate Hands
    if (leftHandLandmarks) {
      riggedLeftHand = Kalidokit.Hand.solve(leftHandLandmarks, "Left");
      if(!riggedLeftHand || !riggedPose) return
      rigRotation("LeftHand", {
        // Combine pose rotation Z and hand rotation X Y
        z: riggedPose.LeftHand.z,
        y: riggedLeftHand.LeftWrist.y,
        x: riggedLeftHand.LeftWrist.x
      });
      rigRotation("LeftRingProximal", riggedLeftHand.LeftRingProximal);
      rigRotation("LeftRingIntermediate", riggedLeftHand.LeftRingIntermediate);
      rigRotation("LeftRingDistal", riggedLeftHand.LeftRingDistal);
      rigRotation("LeftIndexProximal", riggedLeftHand.LeftIndexProximal);
      rigRotation("LeftIndexIntermediate", riggedLeftHand.LeftIndexIntermediate);
      rigRotation("LeftIndexDistal", riggedLeftHand.LeftIndexDistal);
      rigRotation("LeftMiddleProximal", riggedLeftHand.LeftMiddleProximal);
      rigRotation("LeftMiddleIntermediate", riggedLeftHand.LeftMiddleIntermediate);
      rigRotation("LeftMiddleDistal", riggedLeftHand.LeftMiddleDistal);
      rigRotation("LeftThumbProximal", riggedLeftHand.LeftThumbProximal);
      rigRotation("LeftThumbIntermediate", riggedLeftHand.LeftThumbIntermediate);
      rigRotation("LeftThumbDistal", riggedLeftHand.LeftThumbDistal);
      rigRotation("LeftLittleProximal", riggedLeftHand.LeftLittleProximal);
      rigRotation("LeftLittleIntermediate", riggedLeftHand.LeftLittleIntermediate);
      rigRotation("LeftLittleDistal", riggedLeftHand.LeftLittleDistal);
    }
    if (rightHandLandmarks) {
      riggedRightHand = Kalidokit.Hand.solve(rightHandLandmarks, "Right");
      if(!riggedRightHand || !riggedPose) return
      rigRotation("RightHand", {
        // Combine Z axis from pose hand and X/Y axis from hand wrist rotation
        z: riggedPose.RightHand.z,
        y: riggedRightHand.RightWrist.y,
        x: riggedRightHand.RightWrist.x
      });
      rigRotation("RightRingProximal", riggedRightHand.RightRingProximal);
      rigRotation("RightRingIntermediate", riggedRightHand.RightRingIntermediate);
      rigRotation("RightRingDistal", riggedRightHand.RightRingDistal);
      rigRotation("RightIndexProximal", riggedRightHand.RightIndexProximal);
      rigRotation("RightIndexIntermediate",riggedRightHand.RightIndexIntermediate);
      rigRotation("RightIndexDistal", riggedRightHand.RightIndexDistal);
      rigRotation("RightMiddleProximal", riggedRightHand.RightMiddleProximal);
      rigRotation("RightMiddleIntermediate", riggedRightHand.RightMiddleIntermediate);
      rigRotation("RightMiddleDistal", riggedRightHand.RightMiddleDistal);
      rigRotation("RightThumbProximal", riggedRightHand.RightThumbProximal);
      rigRotation("RightThumbIntermediate", riggedRightHand.RightThumbIntermediate);
      rigRotation("RightThumbDistal", riggedRightHand.RightThumbDistal);
      rigRotation("RightLittleProximal", riggedRightHand.RightLittleProximal);
      rigRotation("RightLittleIntermediate", riggedRightHand.RightLittleIntermediate);
      rigRotation("RightLittleDistal", riggedRightHand.RightLittleDistal);
    }
  };

  useEffect(() => {
    // use Mediapipe's webcam utils to send video to holistic every frame
    // getMedia()
    (async () => {
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
      });
      holisticRef.current = holistic

      const myCamera = await new Camera(myVideoRef.current!, {
        onFrame: async () => {
          // await holistic.send({image: myVideoRef.current!});
        },
        width: 640,
        height: 480
      }) as ExtendedCamera;
      await myCamera.start();
      const stream = myCamera.g

      streamRef.current = stream
      myVideoRef.current.srcObject = stream

      await modelLoad()
      await threeSetup()
      holistic.onResults(onResults);
    })()
    return (() => {
    })
  }, [])
  const handleRoomIDSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
  }
  return (<>
    <canvas ref={myCanvasRef}></canvas>
    <div>kalido video test</div>
    <button onClick={handleRoomIDSubmit}>rest</button>
  </>)
}
export default VideoTest;