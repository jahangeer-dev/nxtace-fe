import React from 'react';
import { useFavorites } from '../hooks/useApi';
import TemplateCard from '../components/TemplateCard';
import Loader from '../components/Loader';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const FavoritesPage: React.FC = () => {
  const { data: favorites, isLoading, error } = useFavorites();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader size="lg" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load favorites</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          My Favorites
        </h1>
        <p className="text-gray-600">
          Templates you've saved for easy access
        </p>
      </div>
      
      {!favorites || favorites.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <svg className="mx-auto h-24 w-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No favorites yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start exploring templates and add them to your favorites for quick access.
          </p>
          <Link to="/templates">
            <Button>
              Browse Templates
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-gray-600">
              You have {favorites.length} favorite template{favorites.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map(template => (
              <TemplateCard key={template._id} template={template} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FavoritesPage;
