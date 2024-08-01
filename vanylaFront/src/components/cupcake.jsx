import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function CupcakeModel(props) {

    const { scene } = useGLTF('/assets/img/cupcake.glb');
    const modelRef = useRef();

    useFrame(() => {
        modelRef.current.rotation.y += 0.02;
        modelRef.current.rotation.x += 0.006;
    });

    return <primitive ref={modelRef} scale={[40, 40, 40]} object={scene} {...props} />;
}

export default function Cupcake() {
    return (
        <Canvas style={{width: '300px', height: '300px'}} camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={2} />
            <pointLight position={[10, 10, 10]} />
            <CupcakeModel />
            <OrbitControls enableZoom={false} />
        </Canvas>
    );
}