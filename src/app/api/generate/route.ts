import { HfInference } from '@huggingface/inference'
import { NextResponse } from 'next/server'

if (!process.env.HUGGING_FACE_API_KEY) {
  throw new Error('HUGGING_FACE_API_KEY environment variable is not configured')
}

const hf = new HfInference(process.env.HUGGING_FACE_API_KEY)

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    const response = await hf.textToImage({
      inputs: prompt,
      model: "stabilityai/stable-diffusion-2-1",
      parameters: {
        negative_prompt: "blurry, bad quality, distorted, disfigured",
      }
    })

    return NextResponse.json({ imageData: response }, { status: 200 })

  } catch (error) {
    console.error('Error generating image:', error)
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    )
  }
} 