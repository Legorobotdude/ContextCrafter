'use client';

import { Question, UserResponse } from '@/types';
import { useState, useEffect } from 'react';

interface QuestionFlowProps {
  questions: Question[];
  initialResponses: UserResponse[];
  onResponsesChange: (responses: UserResponse[]) => void;
  onComplete: () => void;
}

export default function QuestionFlow({ 
  questions, 
  initialResponses, 
  onResponsesChange, 
  onComplete 
}: QuestionFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<UserResponse[]>(initialResponses);

  const currentQuestion = questions[currentStep];
  const currentResponse = responses.find(r => r.questionId === currentQuestion.id);

  useEffect(() => {
    onResponsesChange(responses);
  }, [responses, onResponsesChange]);

  const updateResponse = (questionId: string, value: string | string[]) => {
    setResponses(prev => {
      const existing = prev.find(r => r.questionId === questionId);
      if (existing) {
        return prev.map(r => r.questionId === questionId ? { ...r, value } : r);
      } else {
        return [...prev, { questionId, value }];
      }
    });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderQuestionInput = (question: Question) => {
    const value = currentResponse?.value || '';

    switch (question.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value as string}
            onChange={(e) => updateResponse(question.id, e.target.value)}
            placeholder={question.placeholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value as string}
            onChange={(e) => updateResponse(question.id, e.target.value)}
            placeholder={question.placeholder}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-500"
          />
        );

      case 'select':
        return (
          <select
            value={value as string}
            onChange={(e) => updateResponse(question.id, e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          >
            <option value="">Select an option...</option>
            {question.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={value === option}
                  onChange={(e) => updateResponse(question.id, e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-900">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'multiselect':
        const selectedValues = (value as string[]) || [];
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option)}
                  onChange={(e) => {
                    const newValues = e.target.checked
                      ? [...selectedValues, option]
                      : selectedValues.filter(v => v !== option);
                    updateResponse(question.id, newValues);
                  }}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded"
                />
                <span className="text-gray-900">{option}</span>
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const isCurrentQuestionAnswered = () => {
    if (!currentQuestion.required) return true;
    const response = responses.find(r => r.questionId === currentQuestion.id);
    if (!response) return false;
    
    if (Array.isArray(response.value)) {
      return response.value.length > 0;
    }
    return (response.value as string).trim().length > 0;
  };

  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-700 mb-2">
          <span>Question {currentStep + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {currentQuestion.label}
          {currentQuestion.required && <span className="text-red-500 ml-1">*</span>}
        </h2>
        
        {currentQuestion.description && (
          <p className="text-gray-600 mb-4">{currentQuestion.description}</p>
        )}

        {renderQuestionInput(currentQuestion)}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="px-6 py-3 border border-gray-400 rounded-lg text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        
        <button
          onClick={handleNext}
          disabled={!isCurrentQuestionAnswered()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {currentStep === questions.length - 1 ? 'Generate Prompt' : 'Next'}
        </button>
      </div>
    </div>
  );
}
