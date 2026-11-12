import {Canvas,useFrame} from '@react-three/fiber';
import {Float,MeshDistortMaterial,Stars} from '@react-three/drei';
import {Suspense,useRef} from 'react';
import {useReducedMotion} from 'framer-motion';
import './HeroScene.css';
function Object3D(){const ref=useRef();useFrame((state,delta)=>{if(ref.current){ref.current.rotation.x+=delta*.12;ref.current.rotation.y+=delta*.18;ref.current.position.y=Math.sin(state.clock.elapsedTime*.55)*.12}});return <Float speed={1.1} rotationIntensity={.25} floatIntensity={.45}><mesh ref={ref} scale={1.45}><icosahedronGeometry args={[1,1]}/><MeshDistortMaterial color="#477cff" roughness={.18} metalness={.72} distort={.28} speed={1.4}/></mesh></Float>}
export default function HeroScene(){const reduce=useReducedMotion();if(reduce)return <div className="hero-static-orb"/>;return <div className="hero-canvas"><Canvas dpr={[1,1.5]} camera={{position:[0,0,5],fov:45}} gl={{alpha:true,antialias:false,powerPreference:'low-power'}}><ambientLight intensity={1.3}/><pointLight position={[3,3,3]} intensity={22} color="#75a7ff"/><pointLight position={[-3,-2,2]} intensity={14} color="#8b5cf6"/><Suspense fallback={null}><Stars radius={30} depth={12} count={450} factor={2} fade speed={.25}/><Object3D/></Suspense></Canvas></div>}
