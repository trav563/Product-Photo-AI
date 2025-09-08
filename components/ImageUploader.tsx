
import React from 'react';
import type { UploadedFile } from '../types.ts';
import { XCircleIcon } from './icons/XCircleIcon.tsx';

interface ImageUploaderProps {
  uploadedFiles: UploadedFile[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ uploadedFiles, setUploadedFiles }) => {

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // FIX: Explicitly type `file` as `File` to resolve typing errors.
      const newFiles = Array.from(event.target.files).map((file: File) => ({
        id: `${file.name}-${file.lastModified}`,
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (id: string) => {
    const fileToRemove = uploadedFiles.find(f => f.id === id);
    if (fileToRemove) {
      URL.revokeObjectURL(fileToRemove.previewUrl);
    }
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">1. Upload Product Images</h2>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors">
        <label htmlFor="file-upload" className="cursor-pointer">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="mt-2 block text-sm font-medium text-indigo-600">
            Click to upload or drag and drop
          </span>
          <span className="mt-1 block text-xs text-gray-500">PNG, JPG, GIF up to 10MB</span>
        </label>
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          multiple
          className="sr-only"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>

      {uploadedFiles.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {uploadedFiles.map(file => (
            <div key={file.id} className="relative group">
              <img src={file.previewUrl} alt={file.file.name} className="w-full h-24 object-cover rounded-md" />
              <button
                onClick={() => removeFile(file.id)}
                className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <XCircleIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};