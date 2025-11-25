"use client";
import React, { useState, useRef } from "react";
import { CldImage } from "next-cloudinary";
import { Upload, Image as ImageIcon, Sparkles, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function AiEnhancer() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const resultImgRef = useRef<HTMLImageElement>(null);

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

  const handleEnhance = async () => {
    if (!uploadedImage) return;
    setIsProcessing(true);
    try {
      // Set the result image to trigger the processed view
      setResultImage(uploadedImage);
      toast.success("Image enhanced!");
    } catch (error) {
      toast.error("Failed to enhance image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = async () => {
    if (!resultImage) return;
    // Correct Cloudinary URL: do not append .png or duplicate folder
    const url = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/e_enhance/${resultImage}`;
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'enhanced.png';
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
          <Sparkles className="w-7 h-7 text-primary" />
          AI Image Enhancer
        </h1>
        <p className="text-base-content/70">
          Instantly enhance your images using Cloudinary AI.
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
              <Sparkles className="w-6 h-6" /> Enhance Image
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start justify-center">
              <div className="flex flex-col items-center">
                <div className="w-full max-w-sm bg-base-200 rounded-lg p-2 flex items-center justify-center min-h-[200px]">
                  <CldImage
                    width={800}
                    height={800}
                    src={uploadedImage}
                    alt="Original"
                    className="rounded-lg shadow max-w-full max-h-[400px] w-auto h-auto object-contain"
                  />
                </div>
                <p className="text-center mt-2 text-xs">Original</p>
              </div>
              <div className="flex flex-col items-center">
                {isProcessing ? (
                  <div className="flex flex-col items-center justify-center min-h-[200px]">
                    <Loader2 className="animate-spin w-8 h-8 mb-2" />
                    <span>Processing...</span>
                  </div>
                ) : resultImage ? (
                  <>
                    <div className="w-full max-w-sm bg-base-200 rounded-lg p-2 flex items-center justify-center min-h-[200px]">
                      <img
                        ref={resultImgRef}
                        src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/e_enhance/${resultImage}`}
                        alt="Enhanced"
                        className="rounded-lg shadow max-w-full max-h-[400px] w-auto h-auto object-contain"
                      />
                    </div>
                    <button className="btn btn-secondary mt-4 w-3/4 mx-auto" onClick={handleDownload}>
                      Download Result
                    </button>
                    <p className="text-center mt-2 text-xs">Enhanced</p>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary mt-4 w-3/4 mx-auto"
                      onClick={handleEnhance}
                    >
                      Enhance Image
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
