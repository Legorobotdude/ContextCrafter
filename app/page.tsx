import { taskTemplates } from '@/lib/templates';
import TaskCard from '@/components/TaskCard';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Context Crafter
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your ideas into powerful prompts with our intelligent questionnaire system. 
            Choose your task type and let us guide you through creating the perfect context for any project.
          </p>
        </div>

        {/* Task Templates Grid */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            Choose Your Task Type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {taskTemplates.map((template) => (
              <TaskCard key={template.id} template={template} />
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Smart Questions
              </h3>
              <p className="text-gray-600">
                Answer targeted questions that adapt to your specific task type and goals.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Progress Tracking
              </h3>
              <p className="text-gray-600">
                See your prompt completeness in real-time with our visual progress indicator.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Perfect Prompts
              </h3>
              <p className="text-gray-600">
                Generate structured, copy-ready prompts tailored to your specific needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}