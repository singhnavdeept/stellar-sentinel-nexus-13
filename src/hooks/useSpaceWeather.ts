
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRecentEvents } from '@/services/nasaApi';

export const useSpaceWeather = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['spaceWeather'],
    queryFn: getRecentEvents,
    refetchInterval: 1000 * 60 * 30, // Refetch every 30 minutes
  });

  return {
    data,
    isLoading,
    error,
  };
};
