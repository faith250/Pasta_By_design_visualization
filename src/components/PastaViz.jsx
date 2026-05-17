import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function PointCloud({ positions, size, color }) {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return geo
  }, [positions])

  return (
    <points geometry={geometry}>
      <pointsMaterial color={color} size={size} sizeAttenuation transparent opacity={0.85} />
    </points>
  )
}

export default function PastaViz({ positions, cameraPos, target, pointSize, color = '#1a1a1a' }) {
  return (
    <div style={{ width: '100%', height: '460px', borderRadius: '2px', overflow: 'hidden', border: '1px solid #ddd', background: '#f2f1ef' }}>
      <Canvas
        camera={{ position: cameraPos, fov: 45, near: 0.001, far: 1000 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
        style={{ background: '#f2f1ef' }}
      >
        <color attach="background" args={['#f2f1ef']} />
        <PointCloud positions={positions} size={pointSize} color={color} />
        <OrbitControls
          target={target}
          enableDamping
          dampingFactor={0.06}
          rotateSpeed={0.6}
        />
      </Canvas>
    </div>
  )
}
