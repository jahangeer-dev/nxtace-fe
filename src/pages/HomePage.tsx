import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Heart, Zap, ArrowRight, Sparkles } from 'lucide-react';

const HomePage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          className="text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-xl opacity-75 animate-pulse"></div>
              <div className="relative w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Welcome to
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              NxtAce Templates
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover, save, and manage amazing templates for your next project. 
            Build faster with our curated collection of high-quality templates.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Link to="/templates">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-semibold text-lg shadow-lg shadow-blue-500/25 transition-all duration-200 transform hover:shadow-xl hover:shadow-blue-500/30 w-full sm:w-auto"
              >
                Browse Templates
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
            </Link>
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center px-8 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-2xl font-semibold text-lg shadow-lg border border-slate-200/50 dark:border-slate-700/50 transition-all duration-200 w-full sm:w-auto"
              >
                Get Started
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center group">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-blue-500/25">
                  <Search className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Discover Templates
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Browse our extensive collection of professionally designed templates across various categories.
              </p>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-center group">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-pink-500/25">
                  <Heart className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Save Favorites
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Mark templates as favorites to easily access them later and build your personal collection.
              </p>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-center group">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-yellow-500/25">
                  <Zap className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Build Faster
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Use our templates as starting points to accelerate your development process and deliver projects faster.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
