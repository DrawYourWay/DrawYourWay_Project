import React, { useEffect, useState, ChangeEvent } from 'react';
import { getFeeds, createFeed, updateFeed, deleteFeed } from '../../../services/feedService';
import { BasicLayout } from '@/layouts';
import './Feed.css';

interface FeedType {
  id: number;
  title: string;
  content: string;
  drawingUrl?: string;
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
    <BasicLayout useImage={true}>
    <div>
      <h2 style={{
    textAlign: "center",
    marginBottom: "2rem",
    fontFamily: "armstrong",
    fontSize: "2.5rem",
    color: "black",
  }}>
    Draw Your Way
  </h2>
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
       <ul className="feed-list">
          {feeds.map((feed) => (
            <li key={feed.id} className="feed-item">
              <h2>{feed.title}</h2>
              <p>{feed.content}</p>
              {/* Display drawing if available */}
              {feed.drawingUrl && (
                <img
                  src={feed.drawingUrl}
                  alt={`Drawing for ${feed.title}`}
                  className="feed-drawing"
                />
              )}
              <button onClick={() => handleUpdate(feed.id)}>Update</button>
              <button onClick={() => handleDelete(feed.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </BasicLayout>
  );
};

export default Feed;