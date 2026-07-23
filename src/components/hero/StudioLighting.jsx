export default function StudioLighting() {
  return (
    <>
      <ambientLight intensity={0.12} color="#F5EDE3" />

      <directionalLight
        position={[5, 6, 3]}
        intensity={2.2}
        color="#FFE0C8"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <directionalLight
        position={[-4, 2.5, 3.5]}
        intensity={0.5}
        color="#D6E4F0"
      />

      <directionalLight
        position={[0.5, 3, -5]}
        intensity={0.8}
        color="#F0E6F0"
      />

      <directionalLight
        position={[0, -2, 4]}
        intensity={0.15}
        color="#FFE4E1"
      />
    </>
  )
}
