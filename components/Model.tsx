import { useAnimations, useGLTF, CycleRaycast } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"
import { AnimationAction, Group, MeshPhysicalMaterial } from "three"
useGLTF.preload("/cracked-cube.glb")

export default function Model()  {
    const motionVal = useMotionValue(0)
  
    const group = useRef<Group>(null!);
    const {viewport} = useThree();
    const { nodes, materials, animations, scene } = useGLTF(
      "/cracked-cube.glb"
    )
  
    const spring = useSpring(motionVal, { stiffness: 50});
    const { actions, clips } = useAnimations(animations, scene)
    
  
    // Apply the material to each mesh in the GLTF model
  
    const physicalMaterial = new MeshPhysicalMaterial({
      color: 0x1338BE,
      roughness: 0.5,
      clearcoat: 0.9,
      metalness: 0.8,
    });
    // TODO: modify this so that the material is not overwriting the emission cube
    useEffect(() => {
      scene.traverse((child) => {
        //@ts-ignore
        if (child.isMesh && child.name !== "Cube") {
          //@ts-ignore
          child.material = physicalMaterial;
        }
      });
    }, [scene]);
  
  
    useFrame(({camera}) => {
      group.current.rotation.y += 0.001;
      Object.keys(actions).forEach((key) => {
        const action = actions[key] as AnimationAction
        action.play().paused = true
        action.time = spring.get()
      })
    });

    return (
      <group
        onPointerMove={({ object }) => {
          console.log(object.name)
        }} 
        onPointerUp={() => motionVal.set(0)} onPointerDown={() => motionVal.set(1)}  scale={viewport.width / viewport.height} ref={group}>
        <primitive object={scene} />
      </group>
    )
  }
