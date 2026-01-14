import { useState, useEffect } from 'react';
import { Pet, PetFilter } from '../types-extended';
import { PetService } from '../services/petService';

export const usePets = (filters?: PetFilter) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPets();
  }, [filters?.status, filters?.breed, filters?.gender, filters?.search]);

  const fetchPets = async () => {
    setLoading(true);
    setError(null);
    
    const response = await PetService.getAllPets(filters);
    
    if (response.data) {
      setPets(response.data);
    } else if (response.error) {
      setError(response.error.message);
    }
    
    setLoading(false);
  };

  return { pets, loading, error, refetch: fetchPets };
};

export const usePet = (id: string) => {
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchPet();
    }
  }, [id]);

  const fetchPet = async () => {
    setLoading(true);
    setError(null);
    
    const response = await PetService.getPetById(id);
    
    if (response.data) {
      setPet(response.data);
    } else if (response.error) {
      setError(response.error.message);
    }
    
    setLoading(false);
  };

  return { pet, loading, error, refetch: fetchPet };
};
