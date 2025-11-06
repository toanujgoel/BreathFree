
import React, { useState, useEffect, useCallback } from 'react';
import { UserProfile, ContentItem } from '../types';
import { findRelevantContent } from '../services/geminiService';
import { Book, Zap, Utensils, Heart } from 'lucide-react';

interface ContentHubProps {
  userProfile: UserProfile;
}

const interestTopics = [
  { name: 'Managing Cravings', icon: <Zap size={24} /> },
  { name: 'Healthy Eating', icon: <Utensils size={24} /> },
  { name: 'Exercise Benefits', icon: <Heart size={24} /> },
  { name: 'Mindfulness', icon: <Book size={24} /> },
];

const ContentHub: React.FC<ContentHubProps> = ({ userProfile }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>(interestTopics[0].name);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(async (topic: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const items = await findRelevantContent(topic);
      setContent(items);
    } catch (e) {
      setError('Failed to load content. Please try again.');
      setContent([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent(selectedTopic);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTopic]);

  return (
    <div className="p-4 space-y-6 pb-24">
      <header>
        <h1 className="text-2xl font-bold text-text-primary">Discover</h1>
        <p className="text-text-secondary">Find inspiration and tips for your journey.</p>
      </header>

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {interestTopics.map((topic) => (
          <button
            key={topic.name}
            onClick={() => setSelectedTopic(topic.name)}
            className={`flex-shrink-0 px-4 py-2 rounded-full font-semibold transition-colors flex items-center gap-2 ${
              selectedTopic === topic.name
                ? 'bg-brand-primary text-white'
                : 'bg-bg-card text-text-primary hover:bg-gray-200'
            }`}
          >
            {topic.icon}
            {topic.name}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
          </div>
        ) : error ? (
          <p className="text-center text-accent-red">{error}</p>
        ) : content.length > 0 ? (
          content.map((item, index) => (
            <a
              key={index}
              href={item.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-bg-card p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-bold text-brand-secondary">{item.title}</h3>
              <p className="text-xs text-text-secondary truncate mt-1">{item.uri}</p>
            </a>
          ))
        ) : (
          <p className="text-center text-text-secondary">No content found for this topic.</p>
        )}
      </div>
    </div>
  );
};

export default ContentHub;
