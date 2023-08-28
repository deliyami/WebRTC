"use strict";(self.webpackChunkwebrtc=self.webpackChunkwebrtc||[]).push([[542],{3542:function(e,t,n){n.r(t);var i=n(4165),r=n(5861),a=n(9439),o=n(2791),u=n(4615),l=n(9765),s=n(3684),c=n(4138),d=n(6145),f=n(9738),m=n(3048),h=n(2130),p=n(184);t.default=function(){var e=(0,o.useRef)(document.createElement("video")),t=(0,o.useRef)(null),n=(0,o.useRef)(new c.xsS),g=(0,o.useRef)(),L=(0,o.useRef)(new c.USm),x=(0,o.useRef)(),R=(0,o.useRef)(),v=(0,o.useState)(0),w=(0,a.Z)(v,2),I=(w[0],w[1],function(){var a=(0,r.Z)((0,i.Z)().mark((function a(){var o,u,l,s,d,m,h;return(0,i.Z)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return h=function(){return(h=(0,r.Z)((0,i.Z)().mark((function t(){return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!R.current){t.next=3;break}return t.next=3,R.current.send({image:e.current});case 3:g.current&&g.current.update(d.getDelta()),o.render(n.current,u),requestAnimationFrame(m);case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)},m=function(){return h.apply(this,arguments)},(o=new c.CP7({canvas:t.current,alpha:!0})).setPixelRatio(window.devicePixelRatio),(u=new c.cPb(35,300/225,.1,1e3)).position.set(-.1,1.4,.7),(l=new f.z(u,o.domElement)).screenSpacePanning=!0,l.target.set(-.1,1.4,0),l.update(),(s=new c.Ox3(16777215)).position.set(1,1,1).normalize(),n.current.add(s),d=new c.SUY,a.next=16,m();case 16:case"end":return a.stop()}}),a)})));return function(){return a.apply(this,arguments)}}()),y=function(){var e=(0,r.Z)((0,i.Z)().mark((function e(){var t;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(t=new d.E).crossOrigin="anonymous",e.next=4,t.load("https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FAshtra.vrm?v=1630342336981",function(){var e=(0,r.Z)((0,i.Z)().mark((function e(t){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.ck.removeUnnecessaryJoints(t.scene);case 2:return e.next=4,h.n4.from(t).then((function(e){n.current.add(e.scene),g.current=e,g.current.scene.rotation.y=Math.PI}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),(function(e){return console.log("Loading model...",e.loaded/e.total*100,"%")}),(function(e){return console.error(e)}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),P=function(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{x:0,y:0,z:0},i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:.3;if(g.current){var a=null===(t=g.current.humanoid)||void 0===t?void 0:t.getBoneNode(h.wZ.HumanoidBoneName[e]);if(a){var o=new c.USm(n.x*i,n.y*i,n.z*i),u=(new c._fP).setFromEuler(o);a.quaternion.slerp(u,r)}}},k=function(n){if(t.current&&e.current&&g.current){var i,r,a,o=n.faceLandmarks,s=n.ea,d=n.poseLandmarks,f=n.rightHandLandmarks,p=n.leftHandLandmarks;if(o&&function(e){var t,n,i,r,a,o,s,d,f;if(g.current){P("Neck",e.head,.7);var p=g.current.blendShapeProxy,x=h.wZ.BlendShapePresetName;if(p&&x){e.eye.l=(0,m.t7)((0,l.uZ)(1-e.eye.l,0,1),null!==(t=p.getValue(x.Blink))&&void 0!==t?t:0,.5),e.eye.r=(0,m.t7)((0,l.uZ)(1-e.eye.r,0,1),null!==(n=p.getValue(x.Blink))&&void 0!==n?n:0,.5),e.eye=u.LR.stabilizeBlink(e.eye,e.head.y),p.setValue(x.Blink,e.eye.l),p.setValue(x.I,(0,m.t7)(e.mouth.shape.I,null!==(i=p.getValue(x.I))&&void 0!==i?i:0,.5)),p.setValue(x.A,(0,m.t7)(e.mouth.shape.A,null!==(r=p.getValue(x.A))&&void 0!==r?r:0,.5)),p.setValue(x.E,(0,m.t7)(e.mouth.shape.E,null!==(a=p.getValue(x.E))&&void 0!==a?a:0,.5)),p.setValue(x.O,(0,m.t7)(e.mouth.shape.O,null!==(o=p.getValue(x.O))&&void 0!==o?o:0,.5)),p.setValue(x.U,(0,m.t7)(e.mouth.shape.U,null!==(s=p.getValue(x.U))&&void 0!==s?s:0,.5));var R=new c.USm((0,m.t7)(L.current.x,e.pupil.y,.4),(0,m.t7)(L.current.y,e.pupil.x,.4),0,"XYZ");L.current.copy(R),null===(d=g.current.lookAt)||void 0===d||null===(f=d.applyer)||void 0===f||f.lookAt(R)}}}(u.LR.solve(o,{runtime:"mediapipe",video:e.current})),d&&s){if(!(i=u.DJ.solve(s,d,{runtime:"mediapipe",video:e.current})))return;P("Hips",i.Hips.rotation,.7),function(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{x:0,y:0,z:0},i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:.3;if(g.current){var a=null===(t=g.current.humanoid)||void 0===t?void 0:t.getBoneNode(h.wZ.HumanoidBoneName[e]);if(a){var o=new c.Pa4(n.x*i,n.y*i,n.z*i);a.position.lerp(o,r)}}}("Hips",{x:-i.Hips.position.x,y:i.Hips.position.y+1,z:-i.Hips.position.z},1,.07),P("Chest",i.Spine,.25,.3),P("Spine",i.Spine,.45,.3),P("RightUpperArm",i.RightUpperArm,1,.3),P("RightLowerArm",i.RightLowerArm,1,.3),P("LeftUpperArm",i.LeftUpperArm,1,.3),P("LeftLowerArm",i.LeftLowerArm,1,.3),P("LeftUpperLeg",i.LeftUpperLeg,1,.3),P("LeftLowerLeg",i.LeftLowerLeg,1,.3),P("RightUpperLeg",i.RightUpperLeg,1,.3),P("RightLowerLeg",i.RightLowerLeg,1,.3)}if(f){if(!(r=u.PA.solve(f,"Left"))||!i)return;P("LeftHand",{z:i.LeftHand.z,y:r.LeftWrist.y,x:r.LeftWrist.x}),P("LeftRingProximal",r.LeftRingProximal),P("LeftRingIntermediate",r.LeftRingIntermediate),P("LeftRingDistal",r.LeftRingDistal),P("LeftIndexProximal",r.LeftIndexProximal),P("LeftIndexIntermediate",r.LeftIndexIntermediate),P("LeftIndexDistal",r.LeftIndexDistal),P("LeftMiddleProximal",r.LeftMiddleProximal),P("LeftMiddleIntermediate",r.LeftMiddleIntermediate),P("LeftMiddleDistal",r.LeftMiddleDistal),P("LeftThumbProximal",r.LeftThumbProximal),P("LeftThumbIntermediate",r.LeftThumbIntermediate),P("LeftThumbDistal",r.LeftThumbDistal),P("LeftLittleProximal",r.LeftLittleProximal),P("LeftLittleIntermediate",r.LeftLittleIntermediate),P("LeftLittleDistal",r.LeftLittleDistal)}if(p){if(!(a=u.PA.solve(p,"Right"))||!i)return;P("RightHand",{z:i.RightHand.z,y:a.RightWrist.y,x:a.RightWrist.x}),P("RightRingProximal",a.RightRingProximal),P("RightRingIntermediate",a.RightRingIntermediate),P("RightRingDistal",a.RightRingDistal),P("RightIndexProximal",a.RightIndexProximal),P("RightIndexIntermediate",a.RightIndexIntermediate),P("RightIndexDistal",a.RightIndexDistal),P("RightMiddleProximal",a.RightMiddleProximal),P("RightMiddleIntermediate",a.RightMiddleIntermediate),P("RightMiddleDistal",a.RightMiddleDistal),P("RightThumbProximal",a.RightThumbProximal),P("RightThumbIntermediate",a.RightThumbIntermediate),P("RightThumbDistal",a.RightThumbDistal),P("RightLittleProximal",a.RightLittleProximal),P("RightLittleIntermediate",a.RightLittleIntermediate),P("RightLittleDistal",a.RightLittleDistal)}}};(0,o.useEffect)((function(){return(0,r.Z)((0,i.Z)().mark((function t(){var n,a,o;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,new Holistic({locateFile:function(e){return"https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.5.1635989137/".concat(e)}});case 2:return(n=t.sent).setOptions({modelComplexity:1,smoothLandmarks:!0,minDetectionConfidence:.7,minTrackingConfidence:.7,refineFaceLandmarks:!0}),R.current=n,t.next=7,new s.Camera(e.current,{onFrame:function(){var e=(0,r.Z)((0,i.Z)().mark((function e(){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),width:640,height:480});case 7:return a=t.sent,t.next=10,a.start();case 10:return o=a.g,x.current=o,e.current.srcObject=o,t.next=15,y();case 15:return t.next=17,I();case 17:n.onResults(k);case 18:case"end":return t.stop()}}),t)})))(),function(){}}),[]);return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("canvas",{ref:t}),(0,p.jsx)("div",{children:"kalido video test"}),(0,p.jsx)("button",{onClick:function(e){e.preventDefault()},children:"rest"})]})}}}]);
//# sourceMappingURL=542.1077e0b6.chunk.js.map