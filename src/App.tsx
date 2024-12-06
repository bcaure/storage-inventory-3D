import './App.css'

import { Canvas } from '@react-three/fiber'
import { useState } from 'react';

import { Coords } from './types';
import { AnimatedCamera } from './AnimatedCamera';
import { OrbitControls } from '@react-three/drei';
import { Rack } from './Rack';

function App() {
  // CAMERA
  const initPosition = [20, 2, 50] as Coords;
  const [position, setPosition] = useState<Coords>(initPosition);

  return (
    <>
      <button onClick={() => setPosition([20, 2, 150])}>Move camera</button>
      <div id="canvas-container" style={{ width: '80vw', height: '80vh' }}>
        <Canvas>
          <ambientLight intensity={0.1} />
          <AnimatedCamera initPosition={initPosition} position={position} />

          <OrbitControls />

          <Rack boxNumberX={30} boxNumberY={5} />
          
        </Canvas>
      </div>
    </>
  )
}

export default App
