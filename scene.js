{\rtf1\ansi\ansicpg1252\cocoartf2867
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const scene = new THREE.Scene();\
\
const camera = new THREE.PerspectiveCamera(\
  75,\
  window.innerWidth / window.innerHeight,\
  0.1,\
  1000\
);\
\
camera.position.z = 30;\
\
const renderer = new THREE.WebGLRenderer(\{\
  canvas: document.getElementById("webgl"),\
  alpha: true\
\});\
\
renderer.setSize(window.innerWidth, window.innerHeight);\
\
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);\
const material = new THREE.MeshStandardMaterial(\{\
  color: 0x00ffff,\
  wireframe: true\
\});\
\
const shape = new THREE.Mesh(geometry, material);\
scene.add(shape);\
\
const light = new THREE.PointLight(0xffffff);\
light.position.set(10, 10, 10);\
scene.add(light);\
\
function animate() \{\
  requestAnimationFrame(animate);\
  shape.rotation.x += 0.003;\
  shape.rotation.y += 0.002;\
  renderer.render(scene, camera);\
\}\
\
animate();}