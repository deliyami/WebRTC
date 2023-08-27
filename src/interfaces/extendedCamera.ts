import { Camera } from '@mediapipe/camera_utils'

interface ExtendedCamera extends Camera {  
  g: MediaStream
}

export type { ExtendedCamera }