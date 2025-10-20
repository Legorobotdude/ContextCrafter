'use client';

import { useState } from 'react';
import { GeneratedPrompt, PromptStyle } from '@/types';

interface PromptDisplayProps {
  prompt: GeneratedPrompt;
  className?: string;
}

export default function PromptDisplay({ prompt, className = '' }: PromptDisplayProps) {
  const [currentStyle, setCurrentStyle] = useState<PromptStyle>('structured');
  const [copied, setCopied] = useState(false);

  const currentPrompt = currentStyle === 'structured' ? prompt.structured : prompt.conversational;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = currentPrompt;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Generated Prompt</h2>
          <button
            onClick={handleCopy}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
              copied
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy to Clipboard</span>
              </>
            )}
          </button>
        </div>

        {/* Style Toggle */}
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentStyle('structured')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentStyle === 'structured'
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Structured
          </button>
          <button
            onClick={() => setCurrentStyle('conversational')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentStyle === 'conversational'
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Conversational
          </button>
        </div>
      </div>

      {/* Prompt Content */}
      <div className="p-6">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
            {currentPrompt}
          </pre>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Generated on {new Date(prompt.timestamp).toLocaleString()}</span>
          <span className="text-blue-600 font-medium">
            {currentStyle === 'structured' ? 'Structured Format' : 'Conversational Format'}
          </span>
        </div>
      </div>
    </div>
  );
}
