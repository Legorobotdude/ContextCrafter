'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getTemplateById } from '@/lib/templates';
import { storage } from '@/lib/storage';
import { QuestionnaireState, UserResponse } from '@/types';
import QuestionFlow from '@/components/QuestionFlow';
import CompletenessIndicator from '@/components/CompletenessIndicator';

export default function QuestionnairePage() {
  const params = useParams();
  const router = useRouter();
  const taskType = params.taskType as string;
  
  const [template] = useState(getTemplateById(taskType));
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [, setIsComplete] = useState(false);

  useEffect(() => {
    if (!template) {
      router.push('/');
      return;
    }

    // Load saved state if available
    const savedState = storage.loadQuestionnaireState();
    if (savedState && savedState.taskType === taskType) {
      setResponses(savedState.responses);
      setIsComplete(savedState.isComplete);
    }
  }, [taskType, template, router]);

  const calculateCompleteness = (): number => {
    if (!template) return 0;
    
    const requiredQuestions = template.questions.filter(q => q.required);
    const answeredRequired = requiredQuestions.filter(q => {
      const response = responses.find(r => r.questionId === q.id);
      if (!response) return false;
      
      if (Array.isArray(response.value)) {
        return response.value.length > 0;
      }
      return (response.value as string).trim().length > 0;
    });

    return (answeredRequired.length / requiredQuestions.length) * 100;
  };

  const handleResponsesChange = (newResponses: UserResponse[]) => {
    setResponses(newResponses);
    
    // Save state to localStorage
    const state: QuestionnaireState = {
      taskType,
      currentStep: 0, // We'll track this in QuestionFlow component
      responses: newResponses,
      isComplete: false,
    };
    storage.saveQuestionnaireState(state);
  };

  const handleComplete = () => {
    setIsComplete(true);
    
    // Save completed state
    const state: QuestionnaireState = {
      taskType,
      currentStep: 0,
      responses,
      isComplete: true,
    };
    storage.saveQuestionnaireState(state);
    
    // Navigate to result page
    router.push('/result');
  };

  if (!template) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Template not found</h1>
          <p className="text-gray-600 mb-4">The requested task template could not be found.</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={() => router.push('/')}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{template.icon}</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{template.title}</h1>
                <p className="text-gray-700">{template.description}</p>
              </div>
            </div>
          </div>
          
          <CompletenessIndicator percentage={calculateCompleteness()} />
        </div>

        {/* Question Flow */}
        <QuestionFlow
          questions={template.questions}
          initialResponses={responses}
          onResponsesChange={handleResponsesChange}
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
}
