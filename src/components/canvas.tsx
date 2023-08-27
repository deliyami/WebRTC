import { VRM, VRMUtils } from '@pixiv/three-vrm';
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { Clock, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

type CanvasProps = {
  canvasRef: React.RefObject<HTMLCanvasElement>,
  vrm: VRM | undefined,
  setVrm: (v: VRM) => void
  setSuccess: React.Dispatch<React.SetStateAction<Boolean>>,
}
export type CanvasRef = {
  animate: () => void
}

const Canvas = forwardRef<CanvasRef, CanvasProps>(({ canvasRef, vrm, setVrm, setSuccess }, ref) => {
  useImperativeHandle(ref, () => ({
    animate
  }))
  // const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<Scene>(new Scene())
  const rendererRef = useRef<WebGLRenderer>()
  const orbitCameraRef = useRef<PerspectiveCamera>()
  const clockRef = useRef<Clock>()

  const getModel = async () => {
    const loader = new GLTFLoader();
    loader.crossOrigin = "anonymous";
    // Import model from URL, add your own model here
    await loader.load(
      "https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FAshtra.vrm?v=1630342336981",
      async gltf => {
        await VRMUtils.removeUnnecessaryJoints(gltf.scene);
        await VRM.from(gltf).then(v => {
          console.log('object');
          sceneRef.current.add(v.scene);
          setVrm(v)
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
  const setThree = () => {
    rendererRef.current = new WebGLRenderer({
      canvas: canvasRef.current!,
      alpha:true
    });
    rendererRef.current.setPixelRatio(window.devicePixelRatio);

    // camera
    orbitCameraRef.current = new PerspectiveCamera(35, 300 / 225, 0.1, 1000);
    orbitCameraRef.current.position.set(-0.1, 1.4, 0.7);

    // controls
    const orbitControls = new OrbitControls(orbitCameraRef.current, rendererRef.current.domElement);
    orbitControls.screenSpacePanning = true;
    orbitControls.target.set(-0.1, 1.4, 0.0);
    orbitControls.update();

    // light
    const light = new DirectionalLight(0xffffff);
    light.position.set(1.0, 1.0, 1.0).normalize();
    sceneRef.current.add(light);

    // async function animate() {
    //   if (holisticRef.current && videoRef.current)
    //   await holisticRef.current.send({image: videoRef.current});
    // }
    clockRef.current = new Clock()
  }
  // Loop Method, this is used Parent
  const animate = () => {
    if (!(clockRef.current && rendererRef.current && orbitCameraRef.current)) return
    if (vrm) {
      // Update model to render physics
      vrm.update(clockRef.current.getDelta());
    }
    rendererRef.current.render(sceneRef.current, orbitCameraRef.current);
    // requestAnimationFrame(animate);
  }

  
  useEffect (() => {
    (async() => {
      await getModel()
      setThree()
      setSuccess(true)
    })()
  }, [])
  return (<>
    <canvas ref={canvasRef}></canvas>
  </>)
})
export default Canvas;