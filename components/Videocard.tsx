import React, {useState, useEffect, useCallback} from 'react'
import {getCldImageUrl, getCldVideoUrl} from "next-cloudinary"
import { Download, Clock, FileDown, FileUp, Play } from "lucide-react";
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"
import {filesize} from "filesize"
import { Video } from '@/types';
import { Badge } from './ui/badge';

dayjs.extend(relativeTime)

interface VideoCardProps {
    video: Video;
    onDownload: (url: string, title: string) => void;
}

const  VideoCard: React.FC<VideoCardProps> = ({video, onDownload}) => {
    const [isHovered, setIsHovered] = useState(false)
    const [previewError, setPreviewError] = useState(false)

    const getThumbnailUrl = useCallback((publicId: string) => {
        return getCldImageUrl({
            src: publicId,
            width: 400,
            height: 225,
            crop: "fill",
            gravity: "auto",
            format: "jpg",
            quality: "auto",
            assetType: "video"
        })
    }, [])

    const getFullVideoUrl = useCallback((publicId: string) => {
        return getCldVideoUrl({
            src: publicId,
            width: 1920,
            height: 1080,

        })
    }, [])

    const getPreviewVideoUrl = useCallback((publicId: string) => {
        return getCldVideoUrl({
            src: publicId,
            width: 400,
            height: 225,
            rawTransformations: ["e_preview:duration_15:max_seg_9:min_seg_dur_1"]

        })
    }, [])

    const formatSize = useCallback((size: number) => {
        return filesize(size)
    }, [])

    const formatDuration = useCallback((seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
      }, []);

      const compressionPercentage = Math.round(
        (1 - Number(video.compressedSize) / Number(video.originalSize)) * 100
      );

      useEffect(() => {
        setPreviewError(false);
      }, [isHovered]);

      const handlePreviewError = () => {
        setPreviewError(true);
      };

      return (
        <div
          className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-300 overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <figure className="aspect-video relative bg-base-200 group">
            {isHovered ? (
              previewError ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-base-200">
                  <Play className="w-12 h-12 text-base-content/30 mb-2" />
                  <p className="text-sm text-base-content/60">Preview not available</p>
                </div>
              ) : (
                <video
                  src={getPreviewVideoUrl(video.publicId)}
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover"
                  onError={handlePreviewError}
                />
              )
            ) : (
              <>
                <img
                  src={getThumbnailUrl(video.publicId)}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-80 transition-all duration-300" />
                </div>
              </>
            )}
            <div className="absolute bottom-2 right-2 badge badge-neutral gap-1">
              <Clock size={14} />
              {formatDuration(Number(video.duration))}
            </div>
          </figure>

          <div className="card-body p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="card-title text-lg font-display leading-tight flex-1">
                {video.title}
              </h3>
              {compressionPercentage > 0 && (
                <Badge variant="success" size="sm">
                  -{compressionPercentage}%
                </Badge>
              )}
            </div>

            {video.description && (
              <p className="text-sm text-base-content/70 line-clamp-2 mb-3">
                {video.description}
              </p>
            )}

            <div className="flex items-center gap-2 text-xs text-base-content/60 mb-4">
              <Clock size={14} />
              <span>Uploaded {dayjs(video.createdAt).fromNow()}</span>
            </div>

            <div className="divider my-0"></div>

            <div className="grid grid-cols-2 gap-3 my-3">
              <div className="bg-base-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <FileUp size={16} className="text-primary" />
                  <span className="text-xs font-semibold text-base-content/70">Original</span>
                </div>
                <div className="text-sm font-bold">
                  {formatSize(Number(video.originalSize))}
                </div>
              </div>

              <div className="bg-base-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <FileDown size={16} className="text-secondary" />
                  <span className="text-xs font-semibold text-base-content/70">Compressed</span>
                </div>
                <div className="text-sm font-bold">
                  {formatSize(Number(video.compressedSize))}
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary btn-sm w-full gap-2"
              onClick={() =>
                onDownload(getFullVideoUrl(video.publicId), video.title)
              }
            >
              <Download size={16} />
              Download Video
            </button>
          </div>
        </div>
      );
}

export default VideoCard