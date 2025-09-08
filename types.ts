
export interface UploadedFile {
  id: string;
  file: File;
  previewUrl: string;
}

export interface GeneratedImage {
  originalFileName: string;
  imageUrl: string;
  prompt: string;
}

export interface GenerationJob {
  id: string;
  originalFileName: string;
  prompt: string;
}
