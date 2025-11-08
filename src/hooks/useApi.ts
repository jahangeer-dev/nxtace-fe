import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi, templatesApi, favoritesApi } from '../services/api';
import { useAuthStore, useTemplateStore } from '../store';

export const useLogin = () => {
  const setAuth = useAuthStore(state => state.setAuth);
  
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setAuth(data.data.user, data.data.accessToken);
    },
  });
};

export const useRegister = () => {
  const setAuth = useAuthStore(state => state.setAuth);
  
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setAuth(data.data.user, data.data.accessToken);
    },
  });
};

export const useTemplates = () => {
  const setTemplates = useTemplateStore(state => state.setTemplates);
  
  return useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      const templates = await templatesApi.getAll();
      setTemplates(templates);
      return templates;
    },
  });
};

export const useTemplate = (id: string) => {
  return useQuery({
    queryKey: ['template', id],
    queryFn: () => templatesApi.getById(id),
    enabled: !!id,
  });
};

export const useFavorites = () => {
  const { isAuthenticated } = useAuthStore();
  const setFavorites = useTemplateStore(state => state.setFavorites);
  
  return useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const favorites = await favoritesApi.getAll();
      setFavorites(favorites);
      return favorites;
    },
    enabled: isAuthenticated,
  });
};

export const useAddFavorite = () => {
  const queryClient = useQueryClient();
  const addFavorite = useTemplateStore(state => state.addFavorite);
  
  return useMutation({
    mutationFn: favoritesApi.add,
    onSuccess: (_, templateId) => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      const { templates } = useTemplateStore.getState();
      const template = templates.find(t => t._id === templateId);
      if (template) {
        addFavorite(template);
      }
    },
  });
};

export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();
  const removeFavorite = useTemplateStore(state => state.removeFavorite);
  
  return useMutation({
    mutationFn: favoritesApi.remove,
    onSuccess: (_, templateId) => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      removeFavorite(templateId);
    },
  });
};
