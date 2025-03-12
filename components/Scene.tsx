"use client"

import { Canvas, useThree } from "@react-three/fiber"
import Model from "./Model"
import { Suspense, useRef } from "react"
import { useProgress, Html, PerspectiveCamera, OrbitControls, CycleRaycast, Stage, Float } from "@react-three/drei"

interface SceneProps {
  onSubscriptionSuccess: boolean
}

// Shows the user a progress bar until the 3d model has loaded
function Loader() {
  const { progress, active } = useProgress()
  // TODO: Add better styling
  return <Html center>{progress.toFixed(1)} % loaded</Html>
}
/**
 * This component renders the 3D environment for the cube. It handles
 * the lighting , camera setup, and control scheme inside the canvas. 
 * To modify the cube itself, refer to the Model component.
 */
export default function Scene({ onSubscriptionSuccess }: SceneProps) {
  return (
    <Canvas gl={{ antialias: true }} dpr={[1, 1.5]} className="relative" shadows>
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
        <Stage adjustCamera={1.6} intensity={0.5} shadows="contact" environment="city">
          <Model onSubscriptionSuccess={onSubscriptionSuccess} />
        </Stage>
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}
