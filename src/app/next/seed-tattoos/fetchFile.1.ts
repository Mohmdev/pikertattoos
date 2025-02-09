import fs from 'fs'
import path from 'path'
import type { File } from 'payload'

// Helper to fetch files from URLs
export async function fetchImageByURL(url: string): Promise<File> {
  try {
    const res = await fetch(url, {
      credentials: 'include',
      method: 'GET',
    })

    if (!res.ok) {
      console.error('Fetch failed:', res.status, res.statusText, res.headers)
      const errorText = await res.text()
      console.error('Response body:', errorText)
      throw new Error(
        `Failed to fetch file from ${url}, status: ${res.status} ${res.statusText}`,
      )
    }

    const data = await res.arrayBuffer()

    // Sanitize filename from URL
    const cleanUrl = url.split('?')[0] // Remove query parameters
    const filenameFromUrl = cleanUrl?.split('/').pop() || `file-${Date.now()}`

    // Improved MIME type detection
    let mimetype = 'application/octet-stream'
    const contentType = res.headers.get('content-type')
    const fileExtension = filenameFromUrl.split('.').pop()?.toLowerCase()

    if (contentType) {
      mimetype = contentType.split(';')[0] || 'application/octet-stream' // Remove charset if present, default if empty
    } else if (fileExtension) {
      mimetype = `image/${fileExtension}`
      // Common MIME type corrections
      if (fileExtension === 'jpg') mimetype = 'image/jpeg'
      if (fileExtension === 'svg') mimetype = 'image/svg+xml'
    }

    // Validate image buffer
    const buffer = Buffer.from(data)
    if (buffer.length === 0) {
      throw new Error('Received empty image buffer')
    }

    return {
      name: filenameFromUrl,
      data: buffer,
      mimetype: mimetype,
      size: buffer.length,
    }
  } catch (error) {
    console.error('Error in fetchImageByURL:', error)
    throw error
  }
}

// Helper to read local images
export const fetchLocalImage = async (filepath: string): Promise<File> => {
  const basePath = path.join(__dirname, 'img')
  const fullPath = path.join(basePath, path.basename(filepath))
  const buffer = await fs.promises.readFile(fullPath)
  const filename = path.basename(filepath)
  const ext = path.extname(filepath).substring(1)
  const stats = await fs.promises.stat(fullPath)

  return {
    name: filename,
    data: buffer,
    mimetype: `image/${ext}`,
    size: stats.size,
  }
}
