'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { createGeneratedPrompt } from '@/lib/promptGenerator';
import { getTemplateById } from '@/lib/templates';
import { GeneratedPrompt } from '@/types';
import PromptDisplay from '@/components/PromptDisplay';

export default function ResultPage() {
  const router = useRouter();
  const [generatedPrompt, setGeneratedPrompt] = useState<GeneratedPrompt | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedState = storage.loadQuestionnaireState();
    
    if (!savedState || !savedState.isComplete) {
      router.push('/');
      return;
    }

    // Generate the prompt
    const prompt = createGeneratedPrompt(savedState.taskType, savedState.responses);
    setGeneratedPrompt(prompt);
    
    // Save to history
    storage.saveGeneratedPrompt(prompt);
    
    setLoading(false);
  }, [router]);

  const handleStartNew = () => {
    storage.clearQuestionnaireState();
    router.push('/');
  };

  const handleEdit = () => {
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating your prompt...</p>
        </div>
      </div>
    );
  }

  if (!generatedPrompt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">No prompt found</h1>
          <p className="text-gray-600 mb-4">Unable to generate a prompt. Please try again.</p>
          <button
            onClick={handleStartNew}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start New Prompt
          </button>
        </div>
      </div>
    );
  }

  const template = getTemplateById(generatedPrompt.taskType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => router.push('/')}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{template?.icon}</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Prompt Generated!</h1>
                <p className="text-gray-600">Your {template?.title} prompt is ready to use</p>
              </div>
            </div>
          </div>
        </div>

        {/* Prompt Display */}
        <div className="max-w-4xl mx-auto mb-8">
          <PromptDisplay prompt={generatedPrompt} />
        </div>

        {/* Action Buttons */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleStartNew}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Create New Prompt
            </button>
            <button
              onClick={handleEdit}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Edit This Prompt
            </button>
          </div>
        </div>

        {/* Tips */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Tips for using your prompt</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Copy the prompt and paste it into your preferred AI tool (ChatGPT, Claude, etc.)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Try both structured and conversational formats to see which works better for your needs</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Feel free to modify the prompt after copying to add any specific details</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Save successful prompts for future reference and iteration</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
