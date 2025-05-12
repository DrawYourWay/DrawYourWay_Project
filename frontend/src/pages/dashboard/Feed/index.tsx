import React, { useEffect, useState, ChangeEvent } from 'react';
import { getFeeds, createFeed, updateFeed, deleteFeed } from '../../../services/feedService';

// Define the Feed type based on your backend model
interface FeedType {
  id: number;
  title: string;
  content: string;
  created_at?: string;
  updated_at?: string;
}

const Feed: React.FC = () => {
  const [feeds, setFeeds] = useState<FeedType[]>([]);
  const [newFeed, setNewFeed] = useState<Omit<FeedType, 'id'>>({ title: '', content: '' });

  useEffect(() => {
    fetchFeeds();
  }, []);

  const fetchFeeds = async () => {
    const data = await getFeeds();
    setFeeds(data);
  };

  const handleCreate = async () => {
    await createFeed(newFeed);
    setNewFeed({ title: '', content: '' });
    fetchFeeds();
  };

  const handleUpdate = async (id: number) => {
    const updatedFeed = { title: 'Updated Title', content: 'Updated Content' };
    await updateFeed(id, updatedFeed);
    fetchFeeds();
  };

  const handleDelete = async (id: number) => {
    await deleteFeed(id);
    fetchFeeds();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewFeed({ ...newFeed, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Feed</h1>
      <div>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newFeed.title}
          onChange={handleInputChange}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={newFeed.content}
          onChange={handleInputChange}
        />
        <button onClick={handleCreate}>Create Feed</button>
      </div>
      <ul>
        {feeds.map((feed) => (
          <li key={feed.id}>
            <h2>{feed.title}</h2>
            <p>{feed.content}</p>
            <button onClick={() => handleUpdate(feed.id)}>Update</button>
            <button onClick={() => handleDelete(feed.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;