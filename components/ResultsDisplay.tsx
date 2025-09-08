
import React from 'react';
import type { GeneratedImage, GenerationJob } from '../types';
import { Spinner } from './Spinner';

interface ResultsDisplayProps {
  jobs: GenerationJob[];
  results: GeneratedImage[];
  isLoading: boolean;
}

const ResultCard: React.FC<{ image: GeneratedImage }> = ({ image }) => {
  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = image.imageUrl;
    link.download = `${image.originalFileName.split('.')[0]}_${image.prompt.replace(/\s/g, '_')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group relative">
      <img src={image.imageUrl} alt={`Generated from ${image.originalFileName}`} className="w-full h-auto object-cover aspect-square" />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-4">
        <p className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-y-0 translate-y-4 duration-300">
          <strong>Original:</strong> {image.originalFileName}<br/>
          <strong>Prompt:</strong> {image.prompt}<br/>
        </p>
        <button 
          onClick={downloadImage}
          className="mt-2 text-sm bg-indigo-600 text-white font-semibold py-2 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-indigo-700"
        >
          Download
        </button>
      </div>
    </div>
  );
};

const PlaceholderCard: React.FC<{ job: GenerationJob }> = ({ job }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden aspect-square flex flex-col items-center justify-center text-center p-4">
    <Spinner />
    <p className="text-sm font-medium text-gray-700 mt-4">Generating Image</p>
    <p className="text-xs text-gray-500 mt-1 truncate w-full" title={job.originalFileName}>from: {job.originalFileName}</p>
    <p className="text-xs text-gray-500 mt-1 truncate w-full" title={job.prompt}>prompt: "{job.prompt}"</p>
  </div>
);

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ jobs, results, isLoading }) => {
  const hasJobsOrResults = jobs.length > 0 || results.length > 0;

  if (!isLoading && !hasJobsOrResults) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white p-8 rounded-2xl shadow-lg text-center">
        <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        <h3 className="mt-4 text-xl font-semibold text-gray-800">Your results will appear here</h3>
        <p className="mt-1 text-gray-500">Upload images, add prompts, and click "Generate" to start.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
       <h2 className="text-2xl font-bold text-gray-900">Generated Images</h2>
       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {results.map((image, index) => (
          <ResultCard key={index} image={image} />
        ))}
        {jobs.map(job => (
          <PlaceholderCard key={job.id} job={job} />
        ))}
       </div>
    </div>
  );
};
