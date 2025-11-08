import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { useTemplates, useFavorites } from '../hooks/useApi';
import TemplateCard from '../components/TemplateCard';
import { Search, Filter, Sparkles, FileText, ChevronDown } from 'lucide-react';

const TemplatesPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const { data: templates, isLoading, error } = useTemplates();
    // Load favorites to ensure they're available for the favorite buttons
    useFavorites();

    // Initialize category from URL params on component mount
    useEffect(() => {
        const categoryFromUrl = searchParams.get('category') || '';
        setSelectedCategory(categoryFromUrl);
    }, [searchParams]);

    // Update URL when category changes
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        if (category) {
            setSearchParams({ category });
        } else {
            setSearchParams({});
        }
    };

    const categories = useMemo(() => {
        if (!templates || !Array.isArray(templates)) return [];

        const uniqueCategories = [...new Set(
            templates
                .map(t => t?.category?.trim())
                .filter(Boolean) 
        )];
        
        return uniqueCategories.sort();
    }, [templates]);
    const filteredTemplates = useMemo(() => {
        if (!templates || !Array.isArray(templates)) return [];
        
        const filtered = templates.filter(template => {
            if (!template || typeof template !== 'object') {
                return false;
            }

            const templateName = template.name || '';
            const templateDescription = template.description || '';
            const templateCategory = template.category || '';

            const matchesSearch = !searchQuery ||
                templateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                templateDescription.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesCategory = !selectedCategory ||
                templateCategory.trim().toLowerCase() === selectedCategory.trim().toLowerCase();
            
            const shouldInclude = matchesSearch && matchesCategory;
            
            return shouldInclude;
        });
        
        return filtered;
    }, [templates, searchQuery, selectedCategory]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-xl opacity-75 animate-pulse"></div>
                        <div className="relative w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl mb-4 mx-auto">
                            <Sparkles className="w-8 h-8 text-white animate-spin" />
                        </div>
                    </div>
                    <p className="text-lg font-medium text-slate-700 dark:text-slate-300">Loading templates...</p>
                </motion.div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-pink-100 dark:from-slate-900 dark:via-red-900 dark:to-pink-900 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-red-200 dark:border-red-800"
                >
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <FileText className="w-8 h-8 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">Failed to load templates</h3>
                    <p className="text-red-500 dark:text-red-300 mb-4">Something went wrong while fetching templates</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors duration-200"
                    >
                        Try Again
                    </motion.button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    className="mb-12 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-xl opacity-75 animate-pulse"></div>
                            <div className="relative w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
                                <FileText className="w-8 h-8 text-white" />
                            </div>
                        </div>
                    </div>

                    <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-4">
                        Browse Templates
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Discover amazing templates for your next project and bring your ideas to life
                    </p>
                </motion.div>

                {/* Search and Filter */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search templates..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-300/50 dark:border-slate-600/50 rounded-xl bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                />
                            </div>
                            <div className="sm:w-64 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Filter className="h-5 w-5 text-slate-400" />
                                </div>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => handleCategoryChange(e.target.value)}
                                    className="block w-full pl-10 pr-8 py-3 border border-slate-300/50 dark:border-slate-600/50 rounded-xl bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <ChevronDown className="h-5 w-5 text-slate-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Results Info */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl px-6 py-4 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
                        <p className="text-slate-700 dark:text-slate-300 font-medium">
                            Showing <span className="text-blue-600 dark:text-blue-400 font-bold">{filteredTemplates.length}</span> of <span className="text-blue-600 dark:text-blue-400 font-bold">{templates?.length || 0}</span> templates
                            {selectedCategory && (
                                <>
                                    {' '}in "<span className="text-indigo-600 dark:text-indigo-400 font-semibold">{selectedCategory}</span>"
                                </>
                            )}
                            {searchQuery && (
                                <>
                                    {' '}matching "<span className="text-purple-600 dark:text-purple-400 font-semibold">{searchQuery}</span>"
                                </>
                            )}
                        </p>
                    </div>
                </motion.div>

                <AnimatePresence mode="wait" key={selectedCategory}>
                    {filteredTemplates.length === 0 ? (
                        <motion.div
                            key="no-results"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                            className="text-center py-16"
                        >
                            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-12 rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 max-w-md mx-auto">
                                <div className="w-24 h-24 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-3xl flex items-center justify-center mb-6 mx-auto">
                                    <FileText className="w-12 h-12 text-slate-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                                    No templates found
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 text-lg">
                                    {searchQuery || selectedCategory
                                        ? 'Try adjusting your search or filter criteria.'
                                        : 'No templates are available at the moment.'}
                                </p>
                                {(searchQuery || selectedCategory) && (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            setSearchQuery('');
                                            handleCategoryChange('');
                                        }}
                                        className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-200 transform shadow-lg"
                                    >
                                        Clear Filters
                                    </motion.button>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={`results-${selectedCategory}-${searchQuery}`}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {filteredTemplates.map((template, index) => (
                                <motion.div
                                    key={template._id}
                                    variants={itemVariants}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <TemplateCard template={template} />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TemplatesPage;
