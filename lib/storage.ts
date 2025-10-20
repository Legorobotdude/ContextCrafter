import { QuestionnaireState, GeneratedPrompt } from '@/types';

const STORAGE_KEYS = {
  QUESTIONNAIRE_STATE: 'context-crafter-questionnaire-state',
  GENERATED_PROMPTS: 'context-crafter-generated-prompts',
} as const;

export const storage = {
  // Questionnaire state management
  saveQuestionnaireState: (state: QuestionnaireState): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.QUESTIONNAIRE_STATE, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save questionnaire state:', error);
    }
  },

  loadQuestionnaireState: (): QuestionnaireState | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.QUESTIONNAIRE_STATE);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Failed to load questionnaire state:', error);
      return null;
    }
  },

  clearQuestionnaireState: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.QUESTIONNAIRE_STATE);
    } catch (error) {
      console.error('Failed to clear questionnaire state:', error);
    }
  },

  // Generated prompts history
  saveGeneratedPrompt: (prompt: GeneratedPrompt): void => {
    try {
      const existing = storage.loadGeneratedPrompts();
      const updated = [prompt, ...existing].slice(0, 10); // Keep only last 10
      localStorage.setItem(STORAGE_KEYS.GENERATED_PROMPTS, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save generated prompt:', error);
    }
  },

  loadGeneratedPrompts: (): GeneratedPrompt[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.GENERATED_PROMPTS);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load generated prompts:', error);
      return [];
    }
  },

  clearGeneratedPrompts: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.GENERATED_PROMPTS);
    } catch (error) {
      console.error('Failed to clear generated prompts:', error);
    }
  },

  // Utility functions
  isStorageAvailable: (): boolean => {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  },
};
