"use client"
import React, {useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Upload, Video, FileVideo, AlertCircle, CheckCircle, Info } from 'lucide-react'
import toast from 'react-hot-toast'

function VideoUpload() {
    const [file, setFile] = useState<File | null>(null)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)

    const router = useRouter()
    const MAX_FILE_SIZE = 70 * 1024 * 1024 // 70MB

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null
        if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
            toast.error('File size exceeds 70MB limit')
            setFile(null)
            return
        }
        setFile(selectedFile)
        if (selectedFile && !title) {
            setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!file) {
            toast.error('Please select a video file')
            return
        }

        if (file.size > MAX_FILE_SIZE) {
            toast.error('File size exceeds 70MB limit')
            return
        }

        setIsUploading(true)
        setUploadProgress(0)
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("originalSize", file.size.toString());

        try {
            const response = await axios.post("/api/video-upload", formData, {
                onUploadProgress: (progressEvent) => {
                    const progress = progressEvent.total 
                        ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        : 0
                    setUploadProgress(progress)
                }
            })
            
            toast.success('Video uploaded successfully!')
            router.push("/home")
        } catch (error) {
            console.log(error)
            toast.error('Failed to upload video. Please try again.')
        } finally{
            setIsUploading(false)
            setUploadProgress(0)
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              Upload Video
            </h1>
            <p className="text-base-content/70">
              Upload your video for automatic compression and optimization
            </p>
          </div>

          {/* Info Alert */}
          <div className="alert alert-info mb-8">
            <Info className="w-5 h-5" />
            <div className="flex-1">
              <h3 className="font-semibold">Before you upload</h3>
              <div className="text-sm mt-1">
                <ul className="list-disc list-inside space-y-1">
                  <li>Maximum file size: 70MB</li>
                  <li>Supported formats: MP4, MOV, AVI, WebM</li>
                  <li>Your video will be automatically compressed and optimized</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Upload Form */}
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* File Upload */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <FileVideo className="w-4 h-4" />
                      Video File *
                    </span>
                    {file && (
                      <span className="label-text-alt badge badge-success gap-1">
                        <CheckCircle className="w-3 h-3" />
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    )}
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="file-input file-input-bordered file-input-primary w-full"
                    required
                    disabled={isUploading}
                  />
                  <label className="label">
                    <span className="label-text-alt text-base-content/60">
                      Choose a video file to upload (max 70MB)
                    </span>
                  </label>
                </div>

                {/* Title */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Title *</span>
                    <span className="label-text-alt">{title.length}/100</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value.slice(0, 100))}
                    className="input input-bordered w-full"
                    placeholder="Enter a descriptive title for your video"
                    required
                    disabled={isUploading}
                  />
                </div>

                {/* Description */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Description (Optional)</span>
                    <span className="label-text-alt">{description.length}/500</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                    className="textarea textarea-bordered h-24 w-full"
                    placeholder="Add a description to help you identify this video later"
                    disabled={isUploading}
                  />
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-base-content/70">Uploading...</span>
                      <span className="font-semibold">{uploadProgress}%</span>
                    </div>
                    <progress 
                      className="progress progress-primary w-full" 
                      value={uploadProgress} 
                      max="100"
                    ></progress>
                  </div>
                )}

                {/* Submit Button */}
                <div className="card-actions justify-end pt-4">
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => router.push("/home")}
                    disabled={isUploading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary gap-2"
                    disabled={isUploading || !file}
                  >
                    {isUploading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Uploading... {uploadProgress}%
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        Upload Video
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Fast Upload</h3>
                <p className="text-sm text-base-content/70">
                  Powered by Cloudinary for lightning-fast uploads
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Video className="w-5 h-5 text-secondary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Auto Compression</h3>
                <p className="text-sm text-base-content/70">
                  Automatic optimization while maintaining quality
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Secure Storage</h3>
                <p className="text-sm text-base-content/70">
                  Your videos are securely stored in the cloud
                </p>
              </div>
            </div>
          </div>
        </div>
      );
}

export default VideoUpload