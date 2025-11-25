"use client"
import React, {useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import VideoCard from '@/components/Videocard'
import { Video } from '@/types';
import { Video as VideoIcon, AlertCircle } from 'lucide-react'
import Link from 'next/link'

function Home() {
    const [videos, setVideos] = useState<Video[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchVideos = useCallback(async () => {
        try {
            const response = await axios.get("/api/video")
            if(Array.isArray(response.data)) {
                setVideos(response.data)
            } else {
                throw new Error(" Unexpected response format");

            }
        } catch (error) {
            console.log(error);
            setError("Failed to fetch videos")

        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchVideos()
    }, [fetchVideos])

    const handleDownload = useCallback((url: string, title: string) => {
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${title}.mp4`);
        link.setAttribute("target", "_blank");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [])

    if(loading){
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="mt-4 text-base-content/70">Loading your videos...</p>
          </div>
        )
    }

    if(error){
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="alert alert-error max-w-md">
              <AlertCircle className="w-6 h-6" />
              <span>{error}</span>
            </div>
            <button 
              onClick={fetchVideos} 
              className="btn btn-primary mt-4"
            >
              Try Again
            </button>
          </div>
        )
    }

    return (
        <div>
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                  Video Gallery
                </h1>
                <p className="text-base-content/70">
                  Manage and download your compressed videos
                </p>
              </div>
              <Link href="/video-upload" className="btn btn-primary gap-2">
                <VideoIcon className="w-5 h-5" />
                Upload New Video
              </Link>
            </div>
          </div>

          {/* Stats */}
          {videos.length > 0 && (
            <div className="stats stats-vertical sm:stats-horizontal shadow mb-8 w-full">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <VideoIcon className="w-8 h-8" />
                </div>
                <div className="stat-title">Total Videos</div>
                <div className="stat-value text-primary">{videos.length}</div>
                <div className="stat-desc">In your library</div>
              </div>

              <div className="stat">
                <div className="stat-title">Total Original Size</div>
                <div className="stat-value text-secondary">
                  {(videos.reduce((acc, v) => acc + Number(v.originalSize), 0) / (1024 * 1024)).toFixed(1)} MB
                </div>
                <div className="stat-desc">Before compression</div>
              </div>

              <div className="stat">
                <div className="stat-title">Total Compressed Size</div>
                <div className="stat-value text-accent">
                  {(videos.reduce((acc, v) => acc + Number(v.compressedSize), 0) / (1024 * 1024)).toFixed(1)} MB
                </div>
                <div className="stat-desc">After compression</div>
              </div>
            </div>
          )}

          {/* Video Grid */}
          {videos.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <VideoIcon className="w-20 h-20 mx-auto text-base-content/20 mb-4" />
                <h2 className="text-2xl font-display font-bold mb-2">No videos yet</h2>
                <p className="text-base-content/70 mb-6">
                  Upload your first video to get started with compression and optimization
                </p>
                <Link href="/video-upload" className="btn btn-primary gap-2">
                  <VideoIcon className="w-5 h-5" />
                  Upload Your First Video
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {
                videos.map((video) => (
                    <VideoCard
                        key={video.id}
                        video={video}
                        onDownload={handleDownload}
                    />
                ))
              }
            </div>
          )}
        </div>
      );
}

export default Home