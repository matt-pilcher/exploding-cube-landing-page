import { useAnimations, useGLTF, CycleRaycast } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"
import { AnimationAction, Group, MeshPhysicalMaterial } from "three"
// The cube model file located in /public directory
useGLTF.preload("/cracked-cube.glb")

interface ModelProps {
  onSubscriptionSuccess: boolean
}
/**
 * This component renders the cube which is loaded from the external
 * .glb file. For example, you can change the color of the cube by 
 * updating the color hex value inside the physicalMaterial object
 * on line 36.
 */
export default function Model({ onSubscriptionSuccess }: ModelProps)  {
    const motionVal = useMotionValue(0)

    // Triggers the cube animation after a user subscribes
    useEffect(() => {
      motionVal.set(onSubscriptionSuccess ? 1 : 0)
    }, [onSubscriptionSuccess])
  
    const group = useRef<Group>(null!);
    const {viewport} = useThree();
    const { animations, scene } = useGLTF(
      "/cracked-cube.glb"
    )
  
    const spring = useSpring(motionVal, { stiffness: 50});
    const { actions } = useAnimations(animations, scene)
  
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
      // Change the cube rotation speed and axis
      group.current.rotation.y += 0.001;
      // Handles the built-in animations from the .glb file
      Object.keys(actions).forEach((key) => {
        const action = actions[key] as AnimationAction
        action.play().paused = true
        action.time = spring.get()
      })
    });

    return (
      <group onPointerUp={() => motionVal.set(0)} onPointerDown={() => motionVal.set(1)}  scale={viewport.width / viewport.height} ref={group}>
        <primitive object={scene} />
      </group>
    )
  }
