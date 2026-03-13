import Image from 'next/image'

function WebcamIcon() {
  return (
    <Image 
      src="/webcam.png"   // points to public/webcam.png
      alt="Webcam Icon" 
      width={50} 
      height={50} 
    />
  )
}

export default WebcamIcon