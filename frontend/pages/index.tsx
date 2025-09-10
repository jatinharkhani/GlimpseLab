import { useEffect, useState } from 'react';
import Head from 'next/head';
import TrendCard from '../components/TrendCard';

export default function Home() {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    fetch('/api/trends')
      .then(res => res.json())
      .then(data => setTrends(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Head>
        <title>GlimpseLab - Discover What’s Trending</title>
      </Head>
      <main className="container">
        <h1>🔥 Latest Trends</h1>
        <div className="trend-grid">
          {trends.map((trend: any, idx: number) => (
            <TrendCard key={idx} trend={trend} />
          ))}
        </div>
      </main>
    </>
  );
}
