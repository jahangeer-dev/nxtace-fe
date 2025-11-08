import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Heart, Tag } from 'lucide-react';
import type { Template } from '../types';
import { useTemplateStore } from '../store';
import { useAddFavorite, useRemoveFavorite } from '../hooks/useApi';

interface TemplatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: Template | null;
}

const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  isOpen,
  onClose,
  template,
}) => {
  const isFavorite = useTemplateStore(state => 
    template ? state.isFavorite(template._id) : false
  );
  const addFavoriteMutation = useAddFavorite();
  const removeFavoriteMutation = useRemoveFavorite();

  if (!template) return null;

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavoriteMutation.mutate(template._id);
    } else {
      addFavoriteMutation.mutate(template._id);
    }
  };

  const handleDownload = () => {
    // Open the template image in a new tab for download/view
    window.open(template.thumbnail_url, 'parent');
  };

  const isLoading = addFavoriteMutation.isPending || removeFavoriteMutation.isPending;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                    <Tag className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      {template.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {template.name}
                  </h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="flex flex-col lg:flex-row">
                {/* Image Preview */}
                <div className="lg:w-2/3 p-6">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={template.thumbnail_url}
                      alt={template.name}
                      className="w-full h-[400px] object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/800x400?text=Template+Preview';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>

                {/* Details */}
                <div className="lg:w-1/3 p-6 lg:border-l border-slate-200/50 dark:border-slate-700/50">
                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                        Description
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {template.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                        Features
                      </h3>
                      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                          Responsive Design
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                          Modern UI Components
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                          Clean Code Structure
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                          Easy to Customize
                        </li>
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3 pt-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleDownload}
                        className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg"
                      >
                        <ExternalLink className="w-5 h-5 mr-2" />
                        View Full Size
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleFavoriteToggle}
                        disabled={isLoading}
                        className={`w-full flex items-center justify-center px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                          isFavorite
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                        }`}
                      >
                        <Heart 
                          className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-current' : ''}`} 
                        />
                        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TemplatePreviewModal;
