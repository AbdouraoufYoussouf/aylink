"use client"

import React, { useState, useCallback } from 'react'
import Cropper, { Area, Point } from 'react-easy-crop'
import { Button } from "@/components/ui/button"

interface ImageCropperProps {
  imageUrl: string
  onCropCompleted: (croppedImageUrl: string) => void
}

const ImageCropper: React.FC<ImageCropperProps> = ({ imageUrl, onCropCompleted }) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState<number>(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const onCropChange = (crop: Point) => {
    setCrop(crop)
  }

  const onZoomChange = (zoom: number) => {
    setZoom(zoom)
  }

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      if (croppedAreaPixels) {
        const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels)
        if (croppedImage) {
          onCropCompleted(croppedImage)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, imageUrl, onCropCompleted])

  return (
    <div className="h-[400px] relative">
      <Cropper
        image={imageUrl}
        crop={crop}
        zoom={zoom}
        aspect={1}
        onCropChange={onCropChange}
        onCropComplete={onCropComplete}
        onZoomChange={onZoomChange}
      />
      <div className="absolute bottom-4 left-4 right-4 flex justify-between">
        <Button onClick={() => setZoom((prevZoom) => Math.max(1, prevZoom - 0.1))}>-</Button>
        <Button onClick={showCroppedImage}>Confirmer</Button>
        <Button onClick={() => setZoom((prevZoom) => Math.min(3, prevZoom + 0.1))}>+</Button>
      </div>
    </div>
  )
}

async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<string | null> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return null
  }

  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        console.error('Canvas is empty')
        resolve(null)
        return
      }
      resolve(URL.createObjectURL(blob))
    }, 'image/jpeg')
  })
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // This can help with CORS issues
    image.src = url
  })
}

export default ImageCropper

