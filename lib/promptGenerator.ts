import { TaskTemplate, UserResponse, GeneratedPrompt, PromptStyle } from '@/types';
import { getTemplateById } from './templates';

export const generatePrompt = (
  taskType: string,
  responses: UserResponse[],
  style: PromptStyle = 'structured'
): string => {
  const template = getTemplateById(taskType);
  if (!template) {
    throw new Error(`Template not found: ${taskType}`);
  }

  const responseMap = new Map(responses.map(r => [r.questionId, r.value]));
  
  if (style === 'structured') {
    return generateStructuredPrompt(template, responseMap);
  } else {
    return generateConversationalPrompt(template, responseMap);
  }
};

const generateStructuredPrompt = (template: TaskTemplate, responses: Map<string, string | string[]>): string => {
  const sections: string[] = [];
  
  // Header
  sections.push(`# ${template.title} Prompt`);
  sections.push('');
  
  // Task Overview
  sections.push('## Task Overview');
  sections.push(template.description);
  sections.push('');
  
  // Requirements
  sections.push('## Requirements');
  
  template.questions.forEach(question => {
    const response = responses.get(question.id);
    if (response && isValidResponse(response)) {
      const formattedResponse = formatResponse(response);
      sections.push(`- **${question.label}**: ${formattedResponse}`);
    }
  });
  
  sections.push('');
  
  // Instructions
  sections.push('## Instructions');
  sections.push('Please provide a comprehensive response that addresses all the requirements listed above. Ensure your output is well-structured, clear, and directly applicable to the specified context.');
  
  return sections.join('\n');
};

const generateConversationalPrompt = (template: TaskTemplate, responses: Map<string, string | string[]>): string => {
  const parts: string[] = [];
  
  // Opening
  parts.push(`I need help with ${template.title.toLowerCase()}. ${template.description}`);
  parts.push('');
  
  // Context building
  parts.push('Here are the details:');
  
  template.questions.forEach(question => {
    const response = responses.get(question.id);
    if (response && isValidResponse(response)) {
      const formattedResponse = formatResponse(response);
      parts.push(`- ${question.label}: ${formattedResponse}`);
    }
  });
  
  parts.push('');
  
  // Closing
  parts.push('Could you please help me with this? I\'m looking for a comprehensive response that takes into account all the context I\'ve provided above.');
  
  return parts.join('\n');
};

const isValidResponse = (response: string | string[]): boolean => {
  if (Array.isArray(response)) {
    return response.length > 0;
  }
  return typeof response === 'string' && response.trim().length > 0;
};

const formatResponse = (response: string | string[]): string => {
  if (Array.isArray(response)) {
    return response.join(', ');
  }
  return response as string;
};

export const createGeneratedPrompt = (
  taskType: string,
  responses: UserResponse[]
): GeneratedPrompt => {
  const timestamp = Date.now();
  
  return {
    taskType,
    responses,
    structured: generatePrompt(taskType, responses, 'structured'),
    conversational: generatePrompt(taskType, responses, 'conversational'),
    timestamp,
  };
};

export const getPromptByStyle = (prompt: GeneratedPrompt, style: PromptStyle): string => {
  return style === 'structured' ? prompt.structured : prompt.conversational;
};
