import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Template } from '../types';
import { useTemplateStore } from '../store';
import { useAddFavorite, useRemoveFavorite } from '../hooks/useApi';
import { Heart, Tag, Sparkles } from 'lucide-react';
import TemplatePreviewModal from './TemplatePreviewModal';

interface TemplateCardProps {
  template: Template;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isFavorite = useTemplateStore(state => state.isFavorite(template._id));
  const addFavoriteMutation = useAddFavorite();
  const removeFavoriteMutation = useRemoveFavorite();
  
  const handleFavoriteToggle = () => {
    console.log('Toggling favorite for template:', template._id, 'Currently favorite:', isFavorite);
    if (isFavorite) {
      removeFavoriteMutation.mutate(template._id);
    } else {
      addFavoriteMutation.mutate(template._id);
    }
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };
  
  const isLoading = addFavoriteMutation.isPending || removeFavoriteMutation.isPending;
  
  return (
    <>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={handleCardClick}
        className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg shadow-slate-900/10 hover:shadow-2xl hover:shadow-slate-900/20 dark:shadow-slate-900/30 border border-slate-200/50 dark:border-slate-700/50 cursor-pointer"
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        {/* Image container */}
        <div className="relative overflow-hidden">
          <motion.img
            src={template.thumbnail_url}
            alt={template.name}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/400x200?text=Template';
            }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg"
            >
              <Tag className="w-3 h-3 mr-1 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                {template.category}
              </span>
            </motion.div>
          </div>

          {/* Favorite indicator */}
          {isFavorite && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-3 right-3 bg-red-500/90 backdrop-blur-sm p-2 rounded-full shadow-lg"
            >
              <Heart className="w-4 h-4 text-white fill-white" />
            </motion.div>
          )}

          {/* Click to preview overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg text-slate-700 dark:text-slate-300 font-medium"
            >
              Click to preview
            </motion.div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-3">
            <motion.h3 
              className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {template.name}
            </motion.h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed">
              {template.description}
            </p>
          </div>
          
          <div className="flex justify-end items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                handleFavoriteToggle();
              }}
              disabled={isLoading}
              className={`flex items-center justify-center w-12 h-12 rounded-xl font-medium transition-all duration-200 ${
                isFavorite
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-pink-100 dark:hover:bg-pink-900/30 hover:text-pink-600 dark:hover:text-pink-400'
              }`}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
              ) : (
                <Heart 
                  className={`w-5 h-5 transition-all duration-200 ${
                    isFavorite ? 'fill-current' : 'hover:fill-current'
                  }`} 
                />
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Preview Modal */}
      <TemplatePreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        template={template}
      />
    </>
  );
};

export default TemplateCard;
