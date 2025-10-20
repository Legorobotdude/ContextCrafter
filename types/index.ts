export interface Question {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'radio';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  description?: string;
}

export interface TaskTemplate {
  id: string;
  title: string;
  description: string;
  icon: string;
  questions: Question[];
}

export interface UserResponse {
  questionId: string;
  value: string | string[];
}

export interface QuestionnaireState {
  taskType: string;
  currentStep: number;
  responses: UserResponse[];
  isComplete: boolean;
}

export interface GeneratedPrompt {
  taskType: string;
  responses: UserResponse[];
  structured: string;
  conversational: string;
  timestamp: number;
}

export type PromptStyle = 'structured' | 'conversational';
