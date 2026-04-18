import { useState, useEffect } from 'react';
import { fetchSavingsData, SavingTrend } from '../services/api';

export const useSavingsData = () => {
  const [data, setData] = useState<SavingTrend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchSavingsData();
        if (!result) {
          console.warn('Hook returned undefined, using fallback to prevent crash.');
          setData([]);
        } else {
          setData(result);
        }
      } catch (err) {
        console.error('Uncaught ReferenceError or similar in useSavingsData:', err);
        setError('Failed to fetch savings data.');
        setData([]); // fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
};
