import { useState, useEffect } from 'react';
import { Application, AdoptionFormData } from '../types-extended';
import { ApplicationService } from '../services/applicationService';

export const useApplications = (userId?: string) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, [userId]);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    
    const response = await ApplicationService.getAllApplications({ userId });
    
    if (response.data) {
      setApplications(response.data);
    } else if (response.error) {
      setError(response.error.message);
    }
    
    setLoading(false);
  };

  const createApplication = async (formData: AdoptionFormData) => {
    const response = await ApplicationService.createApplication(formData);
    
    if (response.data) {
      setApplications(prev => [response.data!, ...prev]);
      return { success: true, data: response.data };
    } else {
      return { success: false, error: response.error };
    }
  };

  return { applications, loading, error, refetch: fetchApplications, createApplication };
};

export const useApplication = (id: string) => {
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchApplication();
    }
  }, [id]);

  const fetchApplication = async () => {
    setLoading(true);
    setError(null);
    
    const response = await ApplicationService.getApplicationById(id);
    
    if (response.data) {
      setApplication(response.data);
    } else if (response.error) {
      setError(response.error.message);
    }
    
    setLoading(false);
  };

  const updateStatus = async (status: '审核中' | '已通过' | '已完成' | '已拒绝') => {
    const response = await ApplicationService.updateApplicationStatus(id, status);
    
    if (response.data) {
      setApplication(response.data);
      return { success: true };
    } else {
      return { success: false, error: response.error };
    }
  };

  return { application, loading, error, refetch: fetchApplication, updateStatus };
};
