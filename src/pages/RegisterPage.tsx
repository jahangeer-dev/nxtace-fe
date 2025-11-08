import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useRegister } from '../hooks/useApi';
import type { RegisterCredentials } from '../types';
import { AlertCircle, Mail, Lock, User, ArrowRight, UserPlus, Eye } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterCredentials & { confirmPassword: string }>();
  
  const registerMutation = useRegister();
  const password = watch('password');
  
  const onSubmit = async (data: RegisterCredentials & { confirmPassword: string }) => {
    try {
      setServerError('');
      const { confirmPassword, ...registerData } = data;
      await registerMutation.mutateAsync(registerData);
      navigate('/templates', { replace: true });
    } catch (error: any) {
      setServerError(error.response?.data?.message || 'Registration failed');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-purple-900 dark:to-indigo-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <motion.div 
        className="sm:mx-auto sm:w-full sm:max-w-md relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur-xl opacity-75 animate-pulse"></div>
            <div className="relative w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.h2 variants={itemVariants} className="text-center text-4xl font-bold bg-gradient-to-r from-slate-900 to-purple-700 dark:from-white dark:to-purple-300 bg-clip-text text-transparent mb-2">
          Join NxtAce
        </motion.h2>
        
        <motion.p variants={itemVariants} className="text-center text-lg text-slate-600 dark:text-slate-400 mb-8">
          Create your account to get started
        </motion.p>
      </motion.div>

      <motion.div 
        className="sm:mx-auto sm:w-full sm:max-w-md relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          variants={itemVariants}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl py-8 px-8 shadow-2xl shadow-slate-900/10 sm:rounded-3xl border border-slate-200/50 dark:border-slate-700/50"
        >
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {serverError && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center bg-red-50/80 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm backdrop-blur-sm"
              >
                <AlertCircle className="w-5 h-5 mr-3" />
                {serverError}
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Name (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  autoComplete="name"
                  {...register('name')}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300/50 dark:border-slate-600/50 rounded-xl bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                  placeholder="Enter your name"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  autoComplete="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300/50 dark:border-slate-600/50 rounded-xl bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  autoComplete="new-password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300/50 dark:border-slate-600/50 rounded-xl bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                  placeholder="Create a password"
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.password.message}
                </p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Eye className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  autoComplete="new-password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === password || 'Passwords do not match',
                  })}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300/50 dark:border-slate-600/50 rounded-xl bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                  placeholder="Confirm your password"
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={registerMutation.isPending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25 transition-all duration-200 transform hover:shadow-xl hover:shadow-purple-500/30"
              >
                {registerMutation.isPending ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Create account
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                )}
              </motion.button>
            </motion.div>
          </form>

          <motion.div variants={itemVariants} className="mt-6 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
