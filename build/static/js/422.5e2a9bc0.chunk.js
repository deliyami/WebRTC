"use strict";(self.webpackChunkwebrtc=self.webpackChunkwebrtc||[]).push([[422],{422:function(e,t,r){r.r(t);var n=r(4165),i=r(5861),a=r(9439),o=r(2791),c=r(4615),u=r(1608),s=r(7689),l=r(1087),d=r(3684),f=r(4138),m=r(2130),h=r(6145),g=r(3048),p=r(9738),L=r(184),x="http://".concat("3.115.172.95",":").concat("7014","/app");t.default=function(){var e=(0,o.useRef)(),t=(0,o.useRef)(),r=(0,o.useRef)(document.createElement("video")),R=(0,o.useRef)(null),v=(0,o.useRef)(new f.USm),w=(0,o.useRef)(new f.xsS),I=(0,o.useRef)(),P=(0,o.useRef)(),y=(0,o.useRef)(),k=(0,o.useRef)(),b=(0,o.useRef)(void 0),D=(0,o.useRef)(null),Z=(0,o.useRef)(new f.USm),A=(0,o.useRef)(new f.xsS),U=(0,o.useRef)(),T=(0,o.useRef)(),H=(0,o.useRef)(),M=(0,o.useRef)(),S=(0,o.useState)(!1),z=(0,a.Z)(S,2),j=z[0],C=z[1],O=(0,o.useRef)(new RTCPeerConnection({iceServers:[{urls:"stun:stun.l.google.com:19302"}]})),V=(0,o.useRef)(),E=(0,o.useRef)(),B=(0,s.UO)().roomID,N=function(){var e=(0,i.Z)((0,n.Z)().mark((function e(){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!V.current||!r.current){e.next=3;break}return e.next=3,V.current.send({image:r.current});case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),F=function(){var e=(0,i.Z)((0,n.Z)().mark((function e(){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N();case 2:if(y.current&&I.current&&P.current){e.next=4;break}return e.abrupt("return");case 4:k.current&&k.current.update(y.current.getDelta()),I.current.render(w.current,P.current),requestAnimationFrame(F);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),W=function(){var e=(0,i.Z)((0,n.Z)().mark((function e(){var a,o,c;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,new Holistic({locateFile:function(e){return"https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.5.1635989137/".concat(e)}});case 3:return(a=e.sent).setOptions({modelComplexity:1,smoothLandmarks:!0,minDetectionConfidence:.7,minTrackingConfidence:.7,refineFaceLandmarks:!0}),V.current=a,e.next=8,new d.Camera(r.current,{onFrame:function(){var e=(0,i.Z)((0,n.Z)().mark((function e(){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),width:640,height:480});case 8:return o=e.sent,e.next=11,o.start();case 11:c=o.g,t.current=c,r.current.srcObject=c,e.next=19;break;case 16:e.prev=16,e.t0=e.catch(0),console.error(e.t0);case 19:case"end":return e.stop()}}),e,null,[[0,16]])})));return function(){return e.apply(this,arguments)}}(),J=function(){var e=(0,i.Z)((0,n.Z)().mark((function e(){var t;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(t=new h.E).crossOrigin="anonymous",e.next=4,t.load("https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FAshtra.vrm?v=1630342336981",function(){var e=(0,i.Z)((0,n.Z)().mark((function e(t){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.ck.removeUnnecessaryJoints(t.scene);case 2:return e.next=4,m.n4.from(t).then((function(e){w.current.add(e.scene),k.current=e,k.current.scene.rotation.y=Math.PI}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),(function(e){return console.log("Loading model...",e.loaded/e.total*100,"%")}),(function(e){return console.error(e)}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),_=function(){I.current=new f.CP7({canvas:R.current,alpha:!0}),I.current.setPixelRatio(window.devicePixelRatio),P.current=new f.cPb(35,300/225,.1,1e3),P.current.position.set(-.1,1.4,.7);var e=new p.z(P.current,I.current.domElement);e.screenSpacePanning=!0,e.target.set(-.1,1.4,0),e.update();var t=new f.Ox3(16777215);t.position.set(1,1,1).normalize(),w.current.add(t),y.current=new f.SUY},Y=function(){var e=(0,i.Z)((0,n.Z)().mark((function e(){var t;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(t=new h.E).crossOrigin="anonymous",e.next=4,t.load("https://cdn.glitch.com/29e07830-2317-4b15-a044-135e73c7f840%2FAshtra.vrm?v=1630342336981",function(){var e=(0,i.Z)((0,n.Z)().mark((function e(t){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.ck.removeUnnecessaryJoints(t.scene);case 2:return e.next=4,m.n4.from(t).then((function(e){A.current.add(e.scene),M.current=e,M.current.scene.rotation.y=Math.PI}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),(function(e){return console.log("Loading Remote model...",e.loaded/e.total*100,"%")}),(function(e){return console.error(e)}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),q=function(){U.current=new f.CP7({canvas:D.current,alpha:!0}),U.current.setPixelRatio(window.devicePixelRatio),T.current=new f.cPb(35,300/225,.1,1e3),T.current.position.set(-.1,1.4,.7);var e=new p.z(T.current,U.current.domElement);e.screenSpacePanning=!0,e.target.set(-.1,1.4,0),e.update();var t=new f.Ox3(16777215);t.position.set(1,1,1).normalize(),A.current.add(t),H.current=new f.SUY},X=function(){var t=(0,i.Z)((0,n.Z)().mark((function t(){var r;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log("create Offer"),E.current=O.current.createDataChannel("ChatRoom"),E.current.onmessage=function(e){b.current=JSON.parse(e.data)},E.current.onopen=function(){console.log("open channel")},O.current&&e.current){t.next=6;break}return t.abrupt("return");case 6:return t.prev=6,t.next=9,O.current.createOffer();case 9:r=t.sent,O.current.setLocalDescription(r),console.log("sent the offer"),console.log("my offer",r),e.current.emit("offer",r,B),t.next=19;break;case 16:t.prev=16,t.t0=t.catch(6),console.error(t.t0);case 19:case"end":return t.stop()}}),t,null,[[6,16]])})));return function(){return t.apply(this,arguments)}}(),G=function(){var t=(0,i.Z)((0,n.Z)().mark((function t(r){var i;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log("create Answer"),O.current&&e.current){t.next=3;break}return t.abrupt("return");case 3:return t.prev=3,O.current.setRemoteDescription(r),t.next=7,O.current.createAnswer();case 7:i=t.sent,O.current.setLocalDescription(i),console.log("sent the answer"),console.log("my offer",i),e.current.emit("answer",i,B),t.next=17;break;case 14:t.prev=14,t.t0=t.catch(3),console.error(t.t0);case 17:case"end":return t.stop()}}),t,null,[[3,14]])})));return function(e){return t.apply(this,arguments)}}(),K=function(e,t){var r,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{x:0,y:0,z:0},i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:.3;if(e.current){var o=null===(r=e.current.humanoid)||void 0===r?void 0:r.getBoneNode(m.wZ.HumanoidBoneName[t]);if(o){var c=new f.USm(n.x*i,n.y*i,n.z*i),u=(new f._fP).setFromEuler(c);o.quaternion.slerp(u,a)}}},Q=function(e,t){var r,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{x:0,y:0,z:0},i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:.3;if(e.current){var o=null===(r=e.current.humanoid)||void 0===r?void 0:r.getBoneNode(m.wZ.HumanoidBoneName[t]);if(o){var c=new f.Pa4(n.x*i,n.y*i,n.z*i);o.position.lerp(c,a)}}},$=function(e,t,r){var n,i,a,o,u,s,l,d,h;if(t.current){K(t,"Neck",e.head,.7);var p=t.current.blendShapeProxy,L=m.wZ.BlendShapePresetName;if(p&&L){e.eye.l=(0,g.t7)((0,g.uZ)(1-e.eye.l,0,1),null!==(n=p.getValue(L.Blink))&&void 0!==n?n:0,.5),e.eye.r=(0,g.t7)((0,g.uZ)(1-e.eye.r,0,1),null!==(i=p.getValue(L.Blink))&&void 0!==i?i:0,.5),e.eye=c.LR.stabilizeBlink(e.eye,e.head.y),p.setValue(L.Blink,e.eye.l),p.setValue(L.I,(0,g.t7)(e.mouth.shape.I,null!==(a=p.getValue(L.I))&&void 0!==a?a:0,.5)),p.setValue(L.A,(0,g.t7)(e.mouth.shape.A,null!==(o=p.getValue(L.A))&&void 0!==o?o:0,.5)),p.setValue(L.E,(0,g.t7)(e.mouth.shape.E,null!==(u=p.getValue(L.E))&&void 0!==u?u:0,.5)),p.setValue(L.O,(0,g.t7)(e.mouth.shape.O,null!==(s=p.getValue(L.O))&&void 0!==s?s:0,.5)),p.setValue(L.U,(0,g.t7)(e.mouth.shape.U,null!==(l=p.getValue(L.U))&&void 0!==l?l:0,.5));var x=new f.USm((0,g.t7)(r.current.x,e.pupil.y,.4),(0,g.t7)(r.current.y,e.pupil.x,.4),0,"XYZ");r.current.copy(x),null===(d=t.current.lookAt)||void 0===d||null===(h=d.applyer)||void 0===h||h.lookAt(x)}}},ee=function(e){var t,n;if(R.current&&r.current&&k.current){var i,a,o,u;"open"===(null===(t=E.current)||void 0===t?void 0:t.readyState)&&(null===(n=E.current)||void 0===n||n.send(JSON.stringify(e)));var s=e.faceLandmarks,l=e.ea,d=e.poseLandmarks,f=e.rightHandLandmarks,m=e.leftHandLandmarks;if(s){if(!(u=c.LR.solve(s,{runtime:"mediapipe",video:r.current}))||!k)return;$(u,k,v)}if(d&&l){if(!(i=c.DJ.solve(l,d,{runtime:"mediapipe",video:r.current})))return;K(k,"Hips",i.Hips.rotation,.7),Q(k,"Hips",{x:-i.Hips.position.x,y:i.Hips.position.y+1,z:-i.Hips.position.z},1,.07),K(k,"Chest",i.Spine,.25,.3),K(k,"Spine",i.Spine,.45,.3),K(k,"RightUpperArm",i.RightUpperArm,1,.3),K(k,"RightLowerArm",i.RightLowerArm,1,.3),K(k,"LeftUpperArm",i.LeftUpperArm,1,.3),K(k,"LeftLowerArm",i.LeftLowerArm,1,.3),K(k,"LeftUpperLeg",i.LeftUpperLeg,1,.3),K(k,"LeftLowerLeg",i.LeftLowerLeg,1,.3),K(k,"RightUpperLeg",i.RightUpperLeg,1,.3),K(k,"RightLowerLeg",i.RightLowerLeg,1,.3)}if(f){if(!(a=c.PA.solve(f,"Left"))||!i)return;K(k,"LeftHand",{z:i.LeftHand.z,y:a.LeftWrist.y,x:a.LeftWrist.x}),K(k,"LeftRingProximal",a.LeftRingProximal),K(k,"LeftRingIntermediate",a.LeftRingIntermediate),K(k,"LeftRingDistal",a.LeftRingDistal),K(k,"LeftIndexProximal",a.LeftIndexProximal),K(k,"LeftIndexIntermediate",a.LeftIndexIntermediate),K(k,"LeftIndexDistal",a.LeftIndexDistal),K(k,"LeftMiddleProximal",a.LeftMiddleProximal),K(k,"LeftMiddleIntermediate",a.LeftMiddleIntermediate),K(k,"LeftMiddleDistal",a.LeftMiddleDistal),K(k,"LeftThumbProximal",a.LeftThumbProximal),K(k,"LeftThumbIntermediate",a.LeftThumbIntermediate),K(k,"LeftThumbDistal",a.LeftThumbDistal),K(k,"LeftLittleProximal",a.LeftLittleProximal),K(k,"LeftLittleIntermediate",a.LeftLittleIntermediate),K(k,"LeftLittleDistal",a.LeftLittleDistal)}if(m){if(!(o=c.PA.solve(m,"Right"))||!i)return;K(k,"RightHand",{z:i.RightHand.z,y:o.RightWrist.y,x:o.RightWrist.x}),K(k,"RightRingProximal",o.RightRingProximal),K(k,"RightRingIntermediate",o.RightRingIntermediate),K(k,"RightRingDistal",o.RightRingDistal),K(k,"RightIndexProximal",o.RightIndexProximal),K(k,"RightIndexIntermediate",o.RightIndexIntermediate),K(k,"RightIndexDistal",o.RightIndexDistal),K(k,"RightMiddleProximal",o.RightMiddleProximal),K(k,"RightMiddleIntermediate",o.RightMiddleIntermediate),K(k,"RightMiddleDistal",o.RightMiddleDistal),K(k,"RightThumbProximal",o.RightThumbProximal),K(k,"RightThumbIntermediate",o.RightThumbIntermediate),K(k,"RightThumbDistal",o.RightThumbDistal),K(k,"RightLittleProximal",o.RightLittleProximal),K(k,"RightLittleIntermediate",o.RightLittleIntermediate),K(k,"RightLittleDistal",o.RightLittleDistal)}}},te=function(e){if(R.current&&r.current&&k.current){var t,n,i,a;console.log("remote results");var o=e.faceLandmarks,u=e.ea,s=e.poseLandmarks,l=e.rightHandLandmarks,d=e.leftHandLandmarks;if(o){if(!(a=c.LR.solve(o,{runtime:"mediapipe"})))return;$(a,M,Z)}if(s&&u){if(!(t=c.DJ.solve(u,s,{runtime:"mediapipe"})))return;K(M,"Hips",t.Hips.rotation,.7),Q(M,"Hips",{x:-t.Hips.position.x,y:t.Hips.position.y+1,z:-t.Hips.position.z},1,.07),K(M,"Chest",t.Spine,.25,.3),K(M,"Spine",t.Spine,.45,.3),K(M,"RightUpperArm",t.RightUpperArm,1,.3),K(M,"RightLowerArm",t.RightLowerArm,1,.3),K(M,"LeftUpperArm",t.LeftUpperArm,1,.3),K(M,"LeftLowerArm",t.LeftLowerArm,1,.3),K(M,"LeftUpperLeg",t.LeftUpperLeg,1,.3),K(M,"LeftLowerLeg",t.LeftLowerLeg,1,.3),K(M,"RightUpperLeg",t.RightUpperLeg,1,.3),K(M,"RightLowerLeg",t.RightLowerLeg,1,.3)}if(l){if(!(n=c.PA.solve(l,"Left"))||!t)return;K(M,"LeftHand",{z:t.LeftHand.z,y:n.LeftWrist.y,x:n.LeftWrist.x}),K(M,"LeftRingProximal",n.LeftRingProximal),K(M,"LeftRingIntermediate",n.LeftRingIntermediate),K(M,"LeftRingDistal",n.LeftRingDistal),K(M,"LeftIndexProximal",n.LeftIndexProximal),K(M,"LeftIndexIntermediate",n.LeftIndexIntermediate),K(M,"LeftIndexDistal",n.LeftIndexDistal),K(M,"LeftMiddleProximal",n.LeftMiddleProximal),K(M,"LeftMiddleIntermediate",n.LeftMiddleIntermediate),K(M,"LeftMiddleDistal",n.LeftMiddleDistal),K(M,"LeftThumbProximal",n.LeftThumbProximal),K(M,"LeftThumbIntermediate",n.LeftThumbIntermediate),K(M,"LeftThumbDistal",n.LeftThumbDistal),K(M,"LeftLittleProximal",n.LeftLittleProximal),K(M,"LeftLittleIntermediate",n.LeftLittleIntermediate),K(M,"LeftLittleDistal",n.LeftLittleDistal)}if(d){if(!(i=c.PA.solve(d,"Right"))||!t)return;K(M,"RightHand",{z:t.RightHand.z,y:i.RightWrist.y,x:i.RightWrist.x}),K(M,"RightRingProximal",i.RightRingProximal),K(M,"RightRingIntermediate",i.RightRingIntermediate),K(M,"RightRingDistal",i.RightRingDistal),K(M,"RightIndexProximal",i.RightIndexProximal),K(M,"RightIndexIntermediate",i.RightIndexIntermediate),K(M,"RightIndexDistal",i.RightIndexDistal),K(M,"RightMiddleProximal",i.RightMiddleProximal),K(M,"RightMiddleIntermediate",i.RightMiddleIntermediate),K(M,"RightMiddleDistal",i.RightMiddleDistal),K(M,"RightThumbProximal",i.RightThumbProximal),K(M,"RightThumbIntermediate",i.RightThumbIntermediate),K(M,"RightThumbDistal",i.RightThumbDistal),K(M,"RightLittleProximal",i.RightLittleProximal),K(M,"RightLittleIntermediate",i.RightLittleIntermediate),K(M,"RightLittleDistal",i.RightLittleDistal)}}};return(0,o.useEffect)((function(){return(0,i.Z)((0,n.Z)().mark((function r(){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!e.current){r.next=2;break}return r.abrupt("return");case 2:return e.current=(0,u.ZP)(x),r.next=5,W();case 5:return r.next=7,J();case 7:return r.next=9,_();case 9:return r.next=11,Y();case 11:return r.next=13,q();case 13:O.current&&t.current&&(O.current.addTrack(t.current.getTracks()[0]),O.current.onicecandidate=function(t){if(console.log("try candidate"),t.candidate){if(!e.current)return;console.log("receive candidate"),e.current.emit("candidate",t.candidate,B)}console.log("ok candidate")},console.log("set peer data channel handler"),O.current.ondatachannel=function(e){console.log("try peer data channel",e),E.current=e.channel,E.current.onmessage=function(e){b.current=JSON.parse(e.data)},E.current.onopen=function(){console.log("open channel")}},O.current.ontrack=function(e){console.log("wow")}),e.current&&(e.current.emit("join_room",{room:B}),e.current.on("all_users",(function(e){console.log("hello, new User!"),e.length>0&&X()})),e.current.on("getOffer",(function(e){console.log("receive Offer"),console.log("another user offer",e),G(e)})),e.current.on("getAnswer",(function(e){console.log("receive Answer"),console.log("another user offer",e),O.current&&O.current.setRemoteDescription(e)})),e.current.on("getCandidate",function(){var e=(0,i.Z)((0,n.Z)().mark((function e(t){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(O.current){e.next=2;break}return e.abrupt("return");case 2:return console.log("get candidate"),e.next=5,O.current.addIceCandidate(t);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),e.current.on("user_exit",(0,i.Z)((0,n.Z)().mark((function e(){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("user exit");case 1:case"end":return e.stop()}}),e)}))))),V.current.onResults(ee),C(!0),setInterval((function(){console.log("remote animate"),b.current&&te(b.current),H.current&&U.current&&T.current&&(M.current&&M.current.update(H.current.getDelta()),U.current.render(A.current,T.current))}),300);case 18:case"end":return r.stop()}}),r)})))(),function(){e.current&&e.current.disconnect(),O.current&&O.current.close(),t.current&&t.current.getTracks().forEach((function(e){e.stop()}))}}),[]),(0,o.useEffect)((function(){j&&(console.log("start my animate"),C(!1),F())}),[j]),(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)("div",{children:"Chat desu"}),(0,L.jsxs)("table",{children:[(0,L.jsx)("thead",{}),(0,L.jsxs)("tbody",{children:[(0,L.jsxs)("tr",{children:[(0,L.jsx)("td",{children:"Me"}),(0,L.jsx)("td",{children:"Another Person"})]}),(0,L.jsxs)("tr",{children:[(0,L.jsx)("td",{children:(0,L.jsx)("canvas",{ref:R})}),(0,L.jsx)("td",{children:(0,L.jsx)("canvas",{ref:D})})]})]})]}),(0,L.jsx)("button",{onClick:function(e){var t,r;e.preventDefault(),console.log(null===(t=E.current)||void 0===t?void 0:t.readyState),null===(r=E.current)||void 0===r||r.send("hello, world!")},children:"check!"}),(0,L.jsx)(l.rU,{to:"/",children:"back home"})]})}}}]);
//# sourceMappingURL=422.5e2a9bc0.chunk.js.map