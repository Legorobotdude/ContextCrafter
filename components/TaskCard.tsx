'use client';

import { TaskTemplate } from '@/types';
import Link from 'next/link';

interface TaskCardProps {
  template: TaskTemplate;
}

export default function TaskCard({ template }: TaskCardProps) {
  return (
    <Link
      href={`/questionnaire/${template.id}`}
      className="group block p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
    >
      <div className="flex items-start space-x-4">
        <div className="text-4xl">{template.icon}</div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {template.title}
          </h3>
          <p className="text-gray-600 mt-2 leading-relaxed">
            {template.description}
          </p>
          <div className="mt-4 flex items-center text-sm text-blue-600 group-hover:text-blue-700">
            <span>Start questionnaire</span>
            <svg
              className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
