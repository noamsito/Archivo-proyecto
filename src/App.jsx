import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import './App.css'

function App() {
  const mountRef = useRef(null)
  const floatingCrossRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const crossRef = useRef(null)
  const animationRef = useRef(null)
  const floatingAnimationRef = useRef(null)
  const [status, setStatus] = useState('Cargando...')

  useEffect(() => {
    // Variables de la escena
    let scene, camera, renderer, cross, lightParticles, jesusGroup
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
      darkOrange: 0xFF6347,
      skin: 0xFFE4C4,
      tunic: 0x4169E1,
      heart: 0xFF0000
    }

    function init() {
      if (!mountRef.current) return

      try {
        // Crear escena
        scene = new THREE.Scene()
        scene.fog = new THREE.Fog(colors.warm, 15, 35)
        sceneRef.current = scene
        
        // Crear cámara
        camera = new THREE.PerspectiveCamera(
          55,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        )
        camera.position.set(0, 2, 14)
        
        // Crear renderizador
        renderer = new THREE.WebGLRenderer({ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setClearColor(colors.warm, 1)
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        rendererRef.current = renderer
        
        mountRef.current.appendChild(renderer.domElement)
        
        // Crear elementos de la escena
        createOrnatePixelCross()
        createCrossFigure()
        addLighting()
        createSacredEnvironment()
        setupControls()
        
        // Iniciar animación
        animate()
        
        setStatus('Bendecido ✞')
        
      } catch (error) {
        console.error('Error al inicializar Three.js:', error)
        setStatus('Error al cargar')
      }
    }

    function createOrnatePixelCross() {
      cross = new THREE.Group()
      crossRef.current = cross
      
      // Patrón simplificado pero elegante (12x16)
      const ornatePattern = [
        [0,0,0,0,1,1,1,1,0,0,0,0],  // Corona
        [0,0,0,1,1,1,1,1,1,0,0,0],
        [0,0,0,0,1,1,1,1,0,0,0,0],
        [0,0,0,0,1,1,1,1,0,0,0,0],
        [0,0,0,0,1,1,1,1,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1],  // Travesaño
        [1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1],
        [0,0,0,0,1,1,1,1,0,0,0,0],  // Cuerpo
        [0,0,0,0,1,1,1,1,0,0,0,0],
        [0,0,0,0,1,1,1,1,0,0,0,0],
        [0,0,0,0,1,1,1,1,0,0,0,0],
        [0,0,0,0,1,1,1,1,0,0,0,0],
        [0,0,0,0,1,1,1,1,0,0,0,0],
        [0,0,0,1,1,1,1,1,1,0,0,0],  // Base
        [0,0,1,1,1,1,1,1,1,1,0,0]
      ]
      
      const pixelGeometry = new THREE.BoxGeometry(0.18, 0.18, 0.18)
      
      // Materiales simplificados
      const materials = [
        new THREE.MeshPhongMaterial({ 
          color: colors.darkWood,
          shininess: 50
        }),
        new THREE.MeshPhongMaterial({ 
          color: colors.orange,
          shininess: 70,
          emissive: new THREE.Color(colors.orange).multiplyScalar(0.1)
        }),
        new THREE.MeshPhongMaterial({ 
          color: colors.darkOrange,
          shininess: 60,
          emissive: new THREE.Color(colors.darkOrange).multiplyScalar(0.1)
        }),
        new THREE.MeshPhongMaterial({ 
          color: colors.gold,
          shininess: 90,
          emissive: new THREE.Color(colors.gold).multiplyScalar(0.15)
        })
      ]

      // Crear pixels
      for (let y = 0; y < ornatePattern.length; y++) {
        for (let x = 0; x < ornatePattern[y].length; x++) {
          if (ornatePattern[y][x] === 1) {
            let materialIndex = 0
            
            // Distribución de colores
            if (y <= 2 || y >= 14) {
              materialIndex = 3 // Dorado para corona y base
            } else if (y >= 5 && y <= 7) {
              materialIndex = Math.random() < 0.6 ? 1 : 3 // Naranja/oro en travesaño
            } else {
              materialIndex = Math.random() < 0.7 ? 1 : 2 // Naranjas en cuerpo
            }
            
            const pixelMesh = new THREE.Mesh(pixelGeometry, materials[materialIndex])
            
            pixelMesh.position.set(
              (x - 5.5) * 0.2,
              (7.5 - y) * 0.2,
              0
            )
            
            // Datos seguros para animación
            pixelMesh.userData = {
              originalY: pixelMesh.position.y,
              phase: Math.random() * Math.PI * 2,
              speed: 0.01 + Math.random() * 0.005,
              amplitude: 0.02 + Math.random() * 0.02,
              materialIndex: materialIndex
            }
            
            pixelMesh.castShadow = true
            pixelMesh.receiveShadow = true
            cross.add(pixelMesh)
          }
        }
      }
      
      scene.add(cross)
    }

    function createCrossFigure() {
      jesusGroup = new THREE.Group()

      // Figura simplificada de la cruz (8x12)
      const crossPattern = [
        [0,0,1,1,1,1,0,0],  // Cabeza
        [0,1,1,1,1,1,1,0],
        [0,1,2,1,1,2,1,0],  // Ojos
        [0,1,1,3,3,1,1,0],  // Boca
        [1,1,1,1,1,1,1,1],  // Túnica
        [1,1,1,4,4,1,1,1],  // Corazón
        [1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1],
        [0,1,1,1,1,1,1,0],
        [0,1,1,0,0,1,1,0],  // Brazos
        [0,1,1,0,0,1,1,0],
        [0,1,1,0,0,1,1,0]
      ]
      
      const jesusGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.05)
      const jesusMaterials = [
        new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0 }), // Transparente
        new THREE.MeshBasicMaterial({ color: colors.skin, transparent: true, opacity: 0.4 }), // Piel
        new THREE.MeshBasicMaterial({ color: colors.darkWood, transparent: true, opacity: 0.4 }), // Ojos
        new THREE.MeshBasicMaterial({ color: colors.darkOrange, transparent: true, opacity: 0.4 }), // Boca
        new THREE.MeshBasicMaterial({ color: colors.heart, transparent: true, opacity: 0.5 })  // Corazón
      ]
      
      for (let y = 0; y < crossPattern.length; y++) {
        for (let x = 0; x < crossPattern[y].length; x++) {
          const pixelType = crossPattern[y][x]
          if (pixelType > 0) {
            const jesusPixel = new THREE.Mesh(jesusGeometry, jesusMaterials[pixelType])
            
            jesusPixel.position.set(
              (x - 3.5) * 0.12,
              (5.5 - y) * 0.12,
              -6
            )
            
            jesusPixel.userData = {
              phase: Math.random() * Math.PI * 2,
              speed: 0.003
            }
            
            jesusGroup.add(jesusPixel)
          }
        }
      }
      
      jesusGroup.scale.setScalar(2)
      scene.add(jesusGroup)
    }

    function addLighting() {
      // Luz ambiental
      const ambientLight = new THREE.AmbientLight(colors.warm, 0.6)
      scene.add(ambientLight)
      
      // Luz principal
      const mainLight = new THREE.DirectionalLight(colors.lightGold, 1.5)
      mainLight.position.set(10, 15, 8)
      mainLight.castShadow = true
      scene.add(mainLight)
      
      // Luz de acento
      const accentLight = new THREE.PointLight(colors.orange, 0.8, 10)
      accentLight.position.set(-3, 5, 5)
      scene.add(accentLight)
    }

    function createSacredEnvironment() {
      lightParticles = new THREE.Group()
      
      const particleGeometry = new THREE.SphereGeometry(0.02, 6, 6)
      const particleMaterial = new THREE.MeshBasicMaterial({
        color: colors.lightGold,
        transparent: true,
        opacity: 0.6
      })
      
      // Crear 50 partículas
      for (let i = 0; i < 50; i++) {
        const particle = new THREE.Mesh(particleGeometry, particleMaterial)
        
        const radius = 3 + Math.random() * 8
        const angle = Math.random() * Math.PI * 2
        
        particle.position.set(
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 10,
          Math.sin(angle) * radius
        )
        
        particle.userData = {
          speed: 0.01 + Math.random() * 0.01,
          radius: radius,
          angle: angle
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
          
          rotationSpeed.y += deltaX * 0.001
          rotationSpeed.x += deltaY * 0.001
          
          lastMouseX = event.clientX
          lastMouseY = event.clientY
        }
      }
      
      function onMouseUp() {
        isMouseDown = false
      }
      
      function onWheel(event) {
        camera.position.z += event.deltaY * 0.01
        camera.position.z = Math.max(8, Math.min(25, camera.position.z))
      }
      
      canvas.addEventListener('mousedown', onMouseDown)
      canvas.addEventListener('mousemove', onMouseMove)
      canvas.addEventListener('mouseup', onMouseUp)
      canvas.addEventListener('wheel', onWheel)
    }

    function animate() {
      animationRef.current = requestAnimationFrame(animate)
      time += 0.016
      
      // Animar cruz
      if (cross) {
        cross.rotation.x += rotationSpeed.x
        cross.rotation.y += rotationSpeed.y
        
        floatOffset += 0.01
        cross.position.y = Math.sin(floatOffset) * 0.1
        
        // Animar pixels de la cruz
        cross.children.forEach(child => {
          if (child.userData && typeof child.userData.originalY === 'number') {
            const t = time * child.userData.speed
            child.position.y = child.userData.originalY + 
                              Math.sin(t + child.userData.phase) * child.userData.amplitude
          }
        })
        
        rotationSpeed.x *= 0.99
        rotationSpeed.y *= 0.99
      }
      
      // // Animar figura de Jesús
      // if (jesusGroup) {
      //   jesusGroup.children.forEach(pixel => {
      //     if (pixel.userData && typeof pixel.userData.speed === 'number') {
      //       const breathe = 1 + Math.sin(time * pixel.userData.speed + pixel.userData.phase) * 0.05
      //       pixel.scale.setScalar(breathe)
      //     }
      //   })
      // }
      
      // // Animar partículas
      // if (lightParticles) {
      //   lightParticles.children.forEach(particle => {
      //     if (particle.userData && typeof particle.userData.speed === 'number') {
      //       particle.userData.angle += particle.userData.speed
      //       particle.position.x = Math.cos(particle.userData.angle) * particle.userData.radius
      //       particle.position.z = Math.sin(particle.userData.angle) * particle.userData.radius
      //     }
      //   })
      // }
      
      renderer.render(scene, camera)
    }

    function handleResize() {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
    }

    // Inicializar
    init()
    
    // Event listeners
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      
      if (floatingAnimationRef.current) {
        cancelAnimationFrame(floatingAnimationRef.current)
      }
      
      if (mountRef.current && renderer && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      
      if (floatingCrossRef.current && floatingCrossRef.current.firstChild) {
        floatingCrossRef.current.removeChild(floatingCrossRef.current.firstChild)
      }
      
      if (renderer) {
        renderer.dispose()
      }
    }
  }, [])

  return (
    <div className="app">
      <div ref={mountRef} className="canvas-container" />
      
      <div className="overlay">
        <div className="info">
          <h2>✞ Cruz Sagrada ✞</h2>
          <p><strong>Noam Tanaka</strong></p>
          <p>Estado: <span>{status}</span></p>
        </div>
        
        <div className="floating-cross-container">
          <div ref={floatingCrossRef} className="floating-cross" />
        </div>
      </div>
    </div>
  )
}

export default App