"use client";
import React, { useState, useRef } from "react";
import { CldImage } from "next-cloudinary";
import { Upload, Image as ImageIcon, Eraser, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function BackgroundRemoval() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const resultImgRef = useRef<HTMLImageElement>(null);
  const [resultLoading, setResultLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    // Reset state for new upload
    setResultImage(null);
    setIsProcessing(false);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/image-upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to upload image");
      const data = await response.json();
      setUploadedImage(data.publicId);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveBg = async () => {
    if (!uploadedImage) return;
    setIsProcessing(true);
    try {
      // Set the result image to trigger the processed view
      setResultImage(uploadedImage);
      toast.success("Background removed!");
    } catch (error) {
      toast.error("Failed to remove background.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = async () => {
    if (!resultImage) return;
    // Correct Cloudinary URL: do not append .png or duplicate folder
    const url = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/e_background_removal/${resultImage}`;
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'no-background.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error('Failed to download image');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 flex items-center gap-2">
          <Eraser className="w-7 h-7 text-primary" />
          Background Removal
        </h1>
        <p className="text-base-content/70">
          Instantly remove the background from your images using Cloudinary AI.
        </p>
      </div>
      <div className="card bg-base-100 shadow-xl border border-base-300 mb-8">
        <div className="card-body">
          <h2 className="card-title font-display mb-4">
            <ImageIcon className="w-6 h-6" /> Upload Image
          </h2>
          <input
            type="file"
            onChange={handleFileUpload}
            accept="image/*"
            className="file-input file-input-bordered file-input-primary w-full"
            disabled={isUploading}
          />
          {isUploading && (
            <div className="mt-4 flex items-center gap-2">
              <Loader2 className="animate-spin w-5 h-5" />
              <span>Uploading...</span>
            </div>
          )}
        </div>
      </div>
      {uploadedImage && (
        <div className="card bg-base-100 shadow-xl border border-base-300 mb-8">
          <div className="card-body">
            <h2 className="card-title font-display mb-4">
              <Eraser className="w-6 h-6" /> Remove Background
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start justify-center">
              <div className="flex flex-col items-center">
                <CldImage
                  width={320}
                  height={400}
                  src={uploadedImage}
                  alt="Original"
                  className="rounded-lg shadow object-cover w-[320px] h-[400px]"
                />
                <p className="text-center mt-2 text-xs">Original</p>
              </div>
              <div className="flex flex-col items-center">
                {isProcessing ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Loader2 className="animate-spin w-8 h-8 mb-2" />
                    <span className="text-base-content/70">Processing...</span>
                  </div>
                ) : resultImage ? (
                  <>
                    <div className="relative w-[320px] h-[400px] flex items-center justify-center">
                      {resultLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-70 z-10 rounded-lg">
                          <span className="loading loading-spinner loading-lg text-primary"></span>
                        </div>
                      )}
                      <img
                        ref={resultImgRef}
                        width={320}
                        height={400}
                        src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/e_background_removal/${resultImage}`}
                        alt="Background removal not possible for this image."
                        className="rounded-lg shadow object-cover w-[320px] h-[400px]"
                        onLoad={() => setResultLoading(false)}
                        onError={() => {
                          setResultLoading(false);
                          toast.error('Background removal is not possible for this image.');
                        }}
                        style={{ display: resultLoading ? 'none' : 'block' }}
                      />
                    </div>
                    <button
                      className="btn btn-secondary mt-4 w-3/4 mx-auto"
                      onClick={handleDownload}
                      disabled={resultLoading}
                    >
                      Download Result
                    </button>
                    <p className="text-center mt-2 text-xs">
                      {resultLoading ? '' : 'No Background'}
                      {!resultLoading && (
                        <span className="block text-error mt-2" style={{fontSize:'0.9em'}}>
                          {/* If image fails to load, alt text will show visually-impaired users the error */}
                        </span>
                      )}
                    </p>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary mt-4 w-3/4 mx-auto"
                      onClick={handleRemoveBg}
                      disabled={isProcessing}
                    >
                      Remove Background
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

