import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import './App.css'

function App() {
  const mountRef = useRef(null)
  const [status, setStatus] = useState('Cargando...')

  useEffect(() => {
    let scene, camera, renderer, cross, lightParticles, jesusSprite
    let isMouseDown = false, lastMouseX = 0, lastMouseY = 0
    let rotationSpeed = { x: 0.005, y: 0.005 }
    let floatOffset = 0
    let time = 0

    // Colores sagrados
    const colors = {
      darkWood: 0x8B4513,
      mediumWood: 0xA0522D,
      lightWood: 0xCD853F,
      gold: 0xDAA520,
      lightGold: 0xFFD700,
      warm: 0xF5DEB3,
      sky: 0x87CEEB,
      orange: 0xFF8C00,
      darkOrange: 0xFF6347
    }

    function init() {
      // Escena
      scene = new THREE.Scene()
      scene.fog = new THREE.Fog(colors.warm, 15, 35)
      
      // Cámara
      camera = new THREE.PerspectiveCamera(
        55,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      camera.position.set(0, 2, 14)
      
      // Renderizador
      renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true
      })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(colors.warm, 1)
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.2
      
      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement)
      }
      
      // Crear cruz pixel art estilo imagen
      createOrnatePixelCross()
      
      // Crear figura de Jesús de fondo
      createJesusFigure()
      
      // Iluminación
      addDivineLighting()
      
      // Ambiente
      createSacredEnvironment()
      
      // Controles
      setupControls()
      
      // Animación
      animate()
      
      setStatus('Bendecido ✞')
    }

    function createOrnatePixelCross() {
      cross = new THREE.Group()
      
      // Patrón de cruz ornamentada como en la imagen (14x18)
      const ornatePattern = [
        [0,0,0,0,0,0,1,1,0,0,0,0,0,0],  // Punta superior
        [0,0,0,0,0,1,1,1,1,0,0,0,0,0],
        [0,0,0,0,1,1,1,1,1,1,0,0,0,0],  // Corona expandida
        [0,0,0,0,0,1,1,1,1,0,0,0,0,0],
        [0,0,0,0,0,0,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,1,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,0],  // Travesaño ornamentado
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,1,1,0,0,0,0,0,0],  // Cuerpo vertical
        [0,0,0,0,0,0,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,1,1,1,1,0,0,0,0,0],  // Base ornamentada
        [0,0,0,0,1,1,1,1,1,1,0,0,0,0]
      ]
      
      const pixelGeometry = new THREE.BoxGeometry(0.18, 0.18, 0.18)
      
      // Materiales con colores más vibrantes como en la imagen
      const ornateMaterials = [
        new THREE.MeshPhongMaterial({ 
          color: colors.darkWood,
          shininess: 70,
          transparent: true,
          opacity: 0.95
        }),
        new THREE.MeshPhongMaterial({ 
          color: colors.orange,
          shininess: 90,
          transparent: true,
          opacity: 0.9,
          emissive: new THREE.Color(colors.orange).multiplyScalar(0.1)
        }),
        new THREE.MeshPhongMaterial({ 
          color: colors.darkOrange,
          shininess: 80,
          transparent: true,
          opacity: 0.9,
          emissive: new THREE.Color(colors.darkOrange).multiplyScalar(0.1)
        }),
        new THREE.MeshPhongMaterial({ 
          color: colors.gold,
          shininess: 100,
          transparent: true,
          opacity: 0.95,
          emissive: new THREE.Color(colors.gold).multiplyScalar(0.2)
        })
      ]

      for (let y = 0; y < ornatePattern.length; y++) {
        for (let x = 0; x < ornatePattern[y].length; x++) {
          if (ornatePattern[y][x] === 1) {
            let materialIndex
            
            // Patrón de colores más ornamentado
            if (y <= 3) { // Corona - dorado
              materialIndex = 3
            } else if (y >= 6 && y <= 9) { // Travesaño - naranja y oro
              materialIndex = Math.random() < 0.5 ? 1 : 3
            } else if (y >= 16) { // Base - dorado
              materialIndex = 3
            } else if (x === 6 || x === 7) { // Centro vertical - mixto
              materialIndex = Math.random() < 0.4 ? 2 : 1
            } else { // Bordes - madera y naranja
              materialIndex = Math.random() < 0.3 ? 0 : 1
            }
            
            const pixelMesh = new THREE.Mesh(
              pixelGeometry,
              ornateMaterials[materialIndex]
            )
            
            pixelMesh.position.set(
              (x - 6.5) * 0.2,
              (8.5 - y) * 0.2,
              (Math.random() - 0.5) * 0.04
            )
            
            pixelMesh.userData = {
              originalPosition: pixelMesh.position.clone(),
              holyPhase: Math.random() * Math.PI * 2,
              breatheSpeed: 0.01 + Math.random() * 0.005,
              floatAmplitude: 0.015 + Math.random() * 0.015,
              glowIntensity: Math.random() * 0.6 + 0.4,
              materialType: materialIndex
            }
            
            pixelMesh.castShadow = true
            pixelMesh.receiveShadow = true
            
            cross.add(pixelMesh)
          }
        }
      }
      
      scene.add(cross)
    }

    function createJesusFigure() {
      // Crear una figura simplificada de Jesús en pixel art
      const jesusGroup = new THREE.Group()
      
      // Patrón simple de Jesús (10x14)
      const jesusPattern = [
        [0,0,0,1,1,1,1,0,0,0],  // Cabeza
        [0,0,1,1,1,1,1,1,0,0],
        [0,0,1,2,1,1,2,1,0,0],  // Ojos
        [0,0,1,1,3,3,1,1,0,0],  // Boca
        [0,0,0,1,1,1,1,0,0,0],
        [0,1,1,1,1,1,1,1,1,0],  // Túnica superior
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,4,4,1,1,1,1],  // Corazón sagrado
        [1,1,1,1,1,1,1,1,1,1],
        [0,1,1,1,1,1,1,1,1,0],
        [0,0,1,1,1,1,1,1,0,0],
        [0,0,1,1,0,0,1,1,0,0],  // Brazos
        [0,0,1,1,0,0,1,1,0,0],
        [0,0,1,1,0,0,1,1,0,0]
      ]
      
      const jesusGeometry = new THREE.BoxGeometry(0.12, 0.12, 0.05)
      const jesusMaterials = [
        new THREE.MeshPhongMaterial({ color: 0x000000, transparent: true, opacity: 0 }), // Vacío
        new THREE.MeshPhongMaterial({ color: 0xFFE4C4, transparent: true, opacity: 0.3 }), // Piel
        new THREE.MeshPhongMaterial({ color: 0x8B4513, transparent: true, opacity: 0.3 }), // Ojos
        new THREE.MeshPhongMaterial({ color: 0xCD853F, transparent: true, opacity: 0.3 }), // Boca
        new THREE.MeshPhongMaterial({ color: 0xFF0000, transparent: true, opacity: 0.4 })  // Corazón
      ]
      
      for (let y = 0; y < jesusPattern.length; y++) {
        for (let x = 0; x < jesusPattern[y].length; x++) {
          const pixelType = jesusPattern[y][x]
          if (pixelType > 0) {
            const jesusPixel = new THREE.Mesh(
              jesusGeometry,
              jesusMaterials[pixelType]
            )
            
            jesusPixel.position.set(
              (x - 4.5) * 0.14,
              (6.5 - y) * 0.14,
              -8 // Muy atrás
            )
            
            jesusPixel.userData = {
              breatheSpeed: 0.005,
              phase: Math.random() * Math.PI * 2
            }
            
            jesusGroup.add(jesusPixel)
          }
        }
      }
      
      // Hacer la figura más grande y centrada
      jesusGroup.scale.setScalar(2.5)
      jesusGroup.position.set(0, 0, -5)
      
      scene.add(jesusGroup)
    }

    function addDivineLighting() {
      const ambientLight = new THREE.AmbientLight(colors.warm, 0.8)
      scene.add(ambientLight)
      
      const mainLight = new THREE.DirectionalLight(colors.lightGold, 1.8)
      mainLight.position.set(12, 18, 10)
      mainLight.castShadow = true
      mainLight.shadow.mapSize.width = 2048
      mainLight.shadow.mapSize.height = 2048
      scene.add(mainLight)
      
      const accentLight = new THREE.PointLight(colors.orange, 1.0, 12)
      accentLight.position.set(-4, 6, 6)
      scene.add(accentLight)
      
      const haloLight = new THREE.PointLight(colors.gold, 0.9, 8)
      haloLight.position.set(0, 3, 3)
      // Agregar el halo después de que la cruz esté creada
      if (cross) {
        cross.add(haloLight)
      } else {
        scene.add(haloLight)
      }
    }

    function createSacredEnvironment() {
      lightParticles = new THREE.Group()
      
      const particleGeometry = new THREE.SphereGeometry(0.02, 6, 6)
      const particleMaterials = [
        new THREE.MeshBasicMaterial({
          color: colors.lightGold,
          transparent: true,
          opacity: 0.7
        }),
        new THREE.MeshBasicMaterial({
          color: colors.orange,
          transparent: true,
          opacity: 0.6
        })
      ]
      
      for (let i = 0; i < 100; i++) {
        const particle = new THREE.Mesh(
          particleGeometry,
          particleMaterials[Math.floor(Math.random() * particleMaterials.length)]
        )
        
        const radius = 4 + Math.random() * 12
        const theta = Math.random() * Math.PI * 2
        const phi = Math.random() * Math.PI
        
        particle.position.set(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.sin(theta)
        )
        
        particle.userData = {
          orbitSpeed: 0.003 + Math.random() * 0.002,
          angle: theta,
          elevation: phi,
          originalRadius: radius
        }
        
        lightParticles.add(particle)
      }
      
      scene.add(lightParticles)
    }

    function setupControls() {
      const canvas = renderer.domElement
      
      function onMouseDown(event) {
        isMouseDown = true
        lastMouseX = event.clientX
        lastMouseY = event.clientY
      }
      
      function onMouseMove(event) {
        if (isMouseDown) {
          const deltaX = event.clientX - lastMouseX
          const deltaY = event.clientY - lastMouseY
          
          rotationSpeed.y += deltaX * 0.0004
          rotationSpeed.x += deltaY * 0.0004
          
          lastMouseX = event.clientX
          lastMouseY = event.clientY
        }
      }
      
      function onMouseUp() {
        isMouseDown = false
      }
      
      function onWheel(event) {
        camera.position.z += event.deltaY * 0.004
        camera.position.z = Math.max(8, Math.min(25, camera.position.z))
      }
      
      canvas.addEventListener('mousedown', onMouseDown)
      canvas.addEventListener('mousemove', onMouseMove)
      canvas.addEventListener('mouseup', onMouseUp)
      canvas.addEventListener('wheel', onWheel)
    }

    function animate() {
      requestAnimationFrame(animate)
      time += 0.016
      
      if (cross) {
        cross.rotation.x += rotationSpeed.x
        cross.rotation.y += rotationSpeed.y
        
        floatOffset += 0.01
        cross.position.y = Math.sin(floatOffset) * 0.12
        
        cross.children.forEach(child => {
          if (child.userData && child.userData.originalPosition && child.userData.breatheSpeed) {
            const t = time * child.userData.breatheSpeed
            child.position.y = child.userData.originalPosition.y + 
                              Math.sin(t + child.userData.holyPhase) * 
                              child.userData.floatAmplitude
            
            if (child.userData.materialType === 3 || child.userData.materialType === 1) {
              const pulse = 1 + Math.sin(t * 2) * 0.15
              if (child.material && child.material.emissiveIntensity !== undefined) {
                child.material.emissiveIntensity = pulse * child.userData.glowIntensity
              }
            }
          }
        })
        
        rotationSpeed.x *= 0.98
        rotationSpeed.y *= 0.98
      }
      
      if (lightParticles) {
        lightParticles.children.forEach(particle => {
          if (particle.userData && particle.userData.orbitSpeed) {
            particle.userData.angle += particle.userData.orbitSpeed
            
            const x = particle.userData.originalRadius * 
                     Math.sin(particle.userData.elevation) * 
                     Math.cos(particle.userData.angle)
            const z = particle.userData.originalRadius * 
                     Math.sin(particle.userData.elevation) * 
                     Math.sin(particle.userData.angle)
            const y = particle.userData.originalRadius * 
                     Math.cos(particle.userData.elevation)
            
            particle.position.set(x, y, z)
          }
        })
      }
      
      // Animar figura de Jesús si existe
      scene.children.forEach(child => {
        if (child.children && child.children.length > 0) {
          child.children.forEach(jesusPixel => {
            if (jesusPixel.userData && jesusPixel.userData.breatheSpeed) {
              const t = time * jesusPixel.userData.breatheSpeed
              const breathe = 1 + Math.sin(t + jesusPixel.userData.phase) * 0.02
              jesusPixel.scale.setScalar(breathe)
            }
          })
        }
      })
      
      renderer.render(scene, camera)
    }

    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    
    init()

    return () => {
      window.removeEventListener('resize', handleResize)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div className="app">
      <div ref={mountRef} className="canvas-container" />
      
      <div className="overlay">
        <div className="info">
          <h2>✞ Cruz Sagrada ✞</h2>
          <p><strong>Paz y Bendición</strong></p>
          <p>Pixel Art 3D</p>
          <p>Estado: <span>{status}</span></p>
        </div>
        
        <div className="controls">
          <p>🖱️ Arrastra para contemplar</p>
          <p>🔍 Scroll para acercarte</p>
          <p>📱 Touch para móvil</p>
        </div>
        
        <div className="meditation">
          <p>"Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar."</p>
          <p style={{textAlign: 'right', marginTop: '8px', fontSize: '12px'}}>- Mateo 11:28</p>
        </div>
        
        <div className="blessing">
          Que la paz sea contigo
        </div>
      </div>
    </div>
  )
}

export default App