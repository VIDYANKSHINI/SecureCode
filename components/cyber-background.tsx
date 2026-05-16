"use client"

export function CyberBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Black video placeholder - replace with your video later */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Uncomment and add your video source when ready:
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/your-video.mp4" type="video/mp4" />
      </video>
      */}
    </div>
  )
}
