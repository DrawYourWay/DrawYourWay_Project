import api from '../api/axios';

// Define the Feed type based on your backend model
export interface FeedType {
  id: number;
  title: string;
  content: string;
  created_at?: string;
  updated_at?: string;
}

// Get all feeds
export const getFeeds = async (): Promise<FeedType[]> => {
  const response = await api.get<FeedType[]>('feed/feeds/');
  return response.data;
};

// Create a new feed
export const createFeed = async (data: Omit<FeedType, 'id'>): Promise<FeedType> => {
  const response = await api.post<FeedType>('feed/feeds/', data);
  return response.data;
};

// Update a feed
export const updateFeed = async (id: number, data: Partial<Omit<FeedType, 'id'>>): Promise<FeedType> => {
  const response = await api.put<FeedType>(`feed/feeds/${id}/`, data);
  return response.data;
};

// Delete a feed
export const deleteFeed = async (id: number): Promise<void> => {
  await api.delete(`feed/feeds/${id}/`);
};