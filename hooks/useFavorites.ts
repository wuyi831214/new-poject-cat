import { useState, useEffect } from 'react';
import { Favorite, Pet } from '../types-extended';
import { FavoriteService } from '../services/favoriteService';

export const useFavorites = (userId: string) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchFavorites();
    }
  }, [userId]);

  const fetchFavorites = async () => {
    setLoading(true);
    setError(null);
    
    const response = await FavoriteService.getUserFavorites(userId);
    
    if (response.data) {
      setFavorites(response.data);
    } else if (response.error) {
      setError(response.error.message);
    }
    
    setLoading(false);
  };

  const toggleFavorite = async (petId: string) => {
    const response = await FavoriteService.toggleFavorite(userId, petId);
    
    if (response.data) {
      setFavorites(prev => [response.data!, ...prev]);
      return { success: true, isFavorite: true };
    } else if (response.data === null) {
      setFavorites(prev => prev.filter(f => f.pet_id !== petId));
      return { success: true, isFavorite: false };
    } else {
      return { success: false, error: response.error };
    }
  };

  const isFavorite = (petId: string): boolean => {
    return favorites.some(f => f.pet_id === petId);
  };

  return { favorites, loading, error, refetch: fetchFavorites, toggleFavorite, isFavorite };
};
