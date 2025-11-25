"use client"

import React, {useState, useEffect, useRef} from 'react'
import { CldImage } from 'next-cloudinary';
import { Upload, Download, Image as ImageIcon, Share2, Info } from 'lucide-react';
import toast from 'react-hot-toast';

const socialFormats = {
    "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
    "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
    "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
    "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
    "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
  };

  type SocialFormat = keyof typeof socialFormats;

  export default function SocialShare() {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [selectedFormat, setSelectedFormat] = useState<SocialFormat>("Instagram Square (1:1)");
    const [isUploading, setIsUploading] = useState(false);
    const [isTransforming, setIsTransforming] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if(uploadedImage){
            setIsTransforming(true);
        }
    }, [selectedFormat, uploadedImage])

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if(!file) return;
        
        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/image-upload", {
                method: "POST",
                body: formData
            })

            if(!response.ok) throw new Error("Failed to upload image");

            const data = await response.json();
            setUploadedImage(data.publicId);
            toast.success('Image uploaded successfully!');

        } catch (error) {
            console.log(error)
            toast.error('Failed to upload image. Please try again.');
        } finally{
            setIsUploading(false);
        }
    };

    const handleDownload = () => {
        if(!imageRef.current) return;

        toast.promise(
            fetch(imageRef.current.src)
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement("a");
                link.href = url;
                link.download = `${selectedFormat.replace(/\s+/g, "_").toLowerCase()}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            }),
            {
                loading: 'Preparing download...',
                success: 'Image downloaded successfully!',
                error: 'Failed to download image',
            }
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              Social Media Image Creator
            </h1>
            <p className="text-base-content/70">
              Transform your images for perfect social media posts
            </p>
          </div>

          {/* Info Alert */}
          <div className="alert alert-info mb-8">
            <Info className="w-5 h-5" />
            <div className="flex-1">
              <h3 className="font-semibold">How it works</h3>
              <p className="text-sm mt-1">
                Upload any image and we'll automatically resize it to fit perfectly on your chosen social media platform.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-6">
              <div className="card bg-base-100 shadow-xl border border-base-300">
                <div className="card-body">
                  <h2 className="card-title font-display mb-4">
                    <ImageIcon className="w-6 h-6" />
                    Upload Image
                  </h2>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Choose an image file</span>
                    </label>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="file-input file-input-bordered file-input-primary w-full"
                      disabled={isUploading}
                    />
                    <label className="label">
                      <span className="label-text-alt text-base-content/60">
                        Supported: JPG, PNG, GIF, WebP
                      </span>
                    </label>
                  </div>

                  {isUploading && (
                    <div className="mt-4">
                      <progress className="progress progress-primary w-full"></progress>
                      <p className="text-sm text-center mt-2 text-base-content/70">Uploading...</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Format Selection */}
              {uploadedImage && (
                <div className="card bg-base-100 shadow-xl border border-base-300">
                  <div className="card-body">
                    <h2 className="card-title font-display mb-4">
                      <Share2 className="w-6 h-6" />
                      Select Platform
                    </h2>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Social media format</span>
                      </label>
                      <select
                        className="select select-bordered w-full"
                        value={selectedFormat}
                        onChange={(e) =>
                          setSelectedFormat(e.target.value as SocialFormat)
                        }
                      >
                        {Object.keys(socialFormats).map((format) => (
                          <option key={format} value={format}>
                            {format}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mt-4 p-4 bg-base-200 rounded-lg">
                      <h3 className="text-sm font-semibold mb-2">Dimensions</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-base-content/60">Width:</span>
                          <span className="ml-2 font-medium">{socialFormats[selectedFormat].width}px</span>
                        </div>
                        <div>
                          <span className="text-base-content/60">Height:</span>
                          <span className="ml-2 font-medium">{socialFormats[selectedFormat].height}px</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Preview Section */}
            {uploadedImage && (
              <div className="card bg-base-100 shadow-xl border border-base-300">
                <div className="card-body">
                  <h2 className="card-title font-display mb-4">
                    Preview
                  </h2>

                  <div className="relative bg-base-200 rounded-lg p-4 flex items-center justify-center min-h-[300px]">
                    {isTransforming && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-base-100 bg-opacity-80 z-10 rounded-lg">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                        <p className="mt-2 text-sm text-base-content/70">Transforming...</p>
                      </div>
                    )}
                    <div className="max-w-full overflow-auto">
                      <CldImage
                        width={socialFormats[selectedFormat].width}
                        height={socialFormats[selectedFormat].height}
                        src={uploadedImage}
                        sizes="100vw"
                        alt="transformed image"
                        crop="fill"
                        aspectRatio={socialFormats[selectedFormat].aspectRatio}
                        gravity='auto'
                        ref={imageRef}
                        onLoad={() => setIsTransforming(false)}
                        className="rounded-lg shadow-lg"
                      />
                    </div>
                  </div>

                  <div className="card-actions justify-end mt-6">
                    <button 
                      className="btn btn-primary gap-2 w-full sm:w-auto" 
                      onClick={handleDownload}
                      disabled={isTransforming}
                    >
                      <Download className="w-5 h-5" />
                      Download for {selectedFormat.split(' (')[0]}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Popular Formats */}
          {!uploadedImage && (
            <div className="mt-8">
              <h3 className="font-display font-semibold text-lg mb-4">Popular Formats</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(socialFormats).map(([name, dims]) => (
                  <div key={name} className="card bg-base-200 border border-base-300">
                    <div className="card-body p-4">
                      <h4 className="font-semibold text-sm">{name}</h4>
                      <p className="text-xs text-base-content/70">
                        {dims.width} × {dims.height}px
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
}