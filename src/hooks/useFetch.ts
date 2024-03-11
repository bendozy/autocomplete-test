import { useState, useEffect } from 'react';
import { GitHubUser } from '../types';

type FetchState = {
  data?: GitHubUser[];
  error: Error | null;
  isLoading: boolean;
};

const useFetch = (url: string, searchTerm: string): FetchState => {
  const [data, setData] = useState<GitHubUser[] | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      setError(null);
    }

    if (data) {
      setData(undefined);
    }

    const fetchData = async () => {
      if (!url || !searchTerm) {
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch(url);
        const responseData = await response.json();

        if (response.status === 200) {
          setData(responseData.items);
        }

        //Rate Limiting 403 errors are not thrown as error by github api so it cant be caught
        if (response.status === 403) {
          setError(new Error(responseData.message));
        }
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
