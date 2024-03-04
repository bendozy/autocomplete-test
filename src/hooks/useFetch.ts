import { useState, useEffect } from 'react';
import { GitHubUser } from '../types';

type FetchState = {
  data: GitHubUser[];
  error: Error | null;
  isLoading: boolean;
};

const useFetch = (url: string, searchTerm: string): FetchState => {
  const [data, setData] = useState<GitHubUser[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      setError(null);
    }

    if (!url || !searchTerm) {
      if (data.length > 0) {
        setData([]);
      }

      return;
    }

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(url);
        const responseData = await response.json();
        setData(responseData.items);
      } catch (error) {
        setError(error as Error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return { data, error, isLoading };
};

export default useFetch;
