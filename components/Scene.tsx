"use client"

import { Canvas, useThree } from "@react-three/fiber"
import Model from "./Model"
import { Suspense, useRef } from "react"
import { useProgress, Html, PerspectiveCamera, OrbitControls, CycleRaycast } from "@react-three/drei"

function Loader() {
  const { progress, active } = useProgress()

  return <Html center>{progress.toFixed(1)} % loaded</Html>
}

export default function Scene() {
  return (
    <Canvas gl={{ antialias: true }} dpr={[1, 1.5]} className="relative">
      <directionalLight position={[0, 0, 4]} intensity={8} color={0xffffff} />
      <directionalLight position={[-3,0, 4]} intensity={8} color={0x1338BE} />
      <PerspectiveCamera 
        makeDefault 
        position={[1,2,4]} 
        fov={45} 
        aspect={1} 
        near={0.1} 
        far={100} 
      />
      <Suspense fallback={<Loader />}>
        <Model />
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}
