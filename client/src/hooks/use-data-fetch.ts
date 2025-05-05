"use client";

import { useState, useEffect } from "react";
import { api, ApiRequestOptions } from "@/lib/api";

interface UseFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for fetching data from the API
 * Includes loading state, error handling, and refetch functionality
 */
export function useFetch<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
  initialData: T | null = null
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get<T>(endpoint, options);

      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setData(response.data);
      } else {
        setError("No data received");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const refetch = async () => {
    await fetchData();
  };

  return { data, isLoading, error, refetch };
}

/**
 * Custom hook for fetching data with pagination
 */
export function usePaginatedFetch<T>(
  endpoint: string,
  options: ApiRequestOptions & { pageSize?: number } = {}
) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  const pageSize = options.pageSize || 10;
  const paginatedEndpoint = `${endpoint}?page=${page}&pageSize=${pageSize}`;
  
  const { data, isLoading, error, refetch } = useFetch<{
    items: T[];
    pagination: {
      total: number;
      page: number;
      pageSize: number;
      totalPages: number;
    };
  }>(paginatedEndpoint, options);
  
  useEffect(() => {
    if (data) {
      setTotalPages(data.pagination.totalPages);
      setTotalItems(data.pagination.total);
    }
  }, [data]);
  
  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  
  return {
    items: data?.items || [],
    isLoading,
    error,
    refetch,
    pagination: {
      page,
      pageSize,
      totalPages,
      totalItems,
      goToPage,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      nextPage: () => goToPage(page + 1),
      prevPage: () => goToPage(page - 1),
    },
  };
}

/**
 * Custom hook for fetching a single item by ID
 */
export function useFetchById<T>(
  baseEndpoint: string,
  id: number | string | null,
  options: ApiRequestOptions = {}
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!id) {
      setError("No ID provided");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const endpoint = `${baseEndpoint}/${id}`;
      const response = await api.get<T>(endpoint, options);

      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setData(response.data);
      } else {
        setError("No data received");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id, baseEndpoint]);

  const refetch = async () => {
    await fetchData();
  };

  return { data, isLoading, error, refetch };
}
