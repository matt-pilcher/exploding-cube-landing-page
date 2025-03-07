import { useGLTF } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react"
import { Group } from "three"
// TODO preload still works even when different file
useGLTF.preload("/cracked-cube.glb")


export default function Model()  {
  const group = useRef<Group>(null!);
  const {viewport} = useThree();
  const { nodes, materials, animations, scene } = useGLTF(
    "/cracked-cube.glb"
  )

  useFrame(({camera}) => {
    group.current.rotation.y += 0.001;
  });
  const state = useThree();
  console.log(scene);
//  const gltfTest = useAnimations(animations, scene)
// console.log(gltfTest);
  return (
    // face , intersections, objects.name all inside the raycaster class
    // CycleRaycast pulls the object info in a similar way
    // https://codesandbox.io/p/sandbox/ls503?file=%2Fsrc%2FApp.js%3A24%2C56 this uses event.stoppropagation

    //https://react.dev/reference/react/useImperativeHandle
    /**
     * Do not overuse refs. 
     * You should only use refs for imperative behaviors that you can't express as props: for example, scrolling to a node, 
     * focusing a node, triggering an animation, selecting text, and so on.
     * If you can express something as a prop, you should not use a ref. For example, 
     * instead of exposing an imperative handle like { open, close } from a Modal component, it is better to take isOpen as a 
     * prop like <Modal isOpen={isOpen} />. Effects can help you expose imperative behaviors via props.
     */
    <group scale={viewport.width / viewport.height} ref={group}>
      <primitive object={scene} />
    </group>
  )
}
