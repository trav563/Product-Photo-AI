
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header.tsx';
import { ImageUploader } from './components/ImageUploader.tsx';
import { PromptManager } from './components/PromptManager.tsx';
import { ResultsDisplay } from './components/ResultsDisplay.tsx';
import { UploadedFile, GeneratedImage, GenerationJob } from './types.ts';
import { editImage } from './services/geminiService.ts';

const App: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [prompts, setPrompts] = useState<string[]>(['Make the background pure white #FFFFFF', 'Place the product on a rustic wooden table']);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [processingJobs, setProcessingJobs] = useState<GenerationJob[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isGenerating = processingJobs.length > 0;

  // FIX: Removed aspectRatio from dependencies and logic as it's not supported for image editing.
  const handleGenerate = useCallback(async () => {
    if (uploadedFiles.length === 0 || prompts.length === 0) {
      setError("Please upload at least one image and add at least one prompt.");
      return;
    }
    setError(null);
    setGeneratedImages([]);

    const jobs: GenerationJob[] = [];
    for (const file of uploadedFiles) {
      for (const prompt of prompts) {
        jobs.push({
          id: `${file.id}-${prompt}`,
          originalFileName: file.file.name,
          prompt,
        });
      }
    }
    setProcessingJobs(jobs);

    const promises = uploadedFiles.flatMap(file =>
      prompts.map(prompt =>
        editImage(file.file, prompt)
          .then(imageData => {
            if (imageData) {
              setGeneratedImages(prev => [
                ...prev,
                {
                  originalFileName: file.file.name,
                  imageUrl: `data:image/png;base64,${imageData}`,
                  prompt,
                },
              ]);
            }
          })
          .catch(err => {
            console.error(`Failed to process ${file.file.name} with prompt "${prompt}":`, err);
            setError(`An error occurred while generating images. Check the console for details.`);
          })
          .finally(() => {
            setProcessingJobs(prev => prev.filter(job => job.id !== `${file.id}-${prompt}`));
          })
      )
    );
    
    await Promise.all(promises);

  }, [uploadedFiles, prompts]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Controls Column */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg space-y-8 h-fit sticky top-8">
            <ImageUploader uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
            <PromptManager prompts={prompts} setPrompts={setPrompts} />
            {/* FIX: Removed AspectRatioSelector as it is not supported by the image editing model. */}
            
            <button
              onClick={handleGenerate}
              disabled={isGenerating || uploadedFiles.length === 0 || prompts.length === 0}
              className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg disabled:shadow-none"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating... ({processingJobs.length} left)
                </>
              ) : (
                'Generate Images'
              )}
            </button>
            {error && <p className="text-sm text-red-500 mt-4 text-center">{error}</p>}
          </div>

          {/* Results Column */}
          <div className="lg:col-span-2">
            <ResultsDisplay 
              jobs={processingJobs} 
              results={generatedImages}
              isLoading={isGenerating}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;