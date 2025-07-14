import { useEffect, useState } from 'react';
import CounterApi from 'counterapi';

const counter = new CounterApi({ namespace: 'your-namespace', key: 'your-key' });

export default function Footer() {
  const [views, setViews] = useState(null);

  useEffect(() => {
    async function incrementView() {
      try {
        const result = await counter.hit('page-views');
        setViews(result.value);
      } catch (error) {
        console.error('Counter API error:', error);
      }
    }
    incrementView();
  }, []);

  return (
    <footer>
      <p>Page views: {views !== null ? views : 'Loading...'}</p>
    </footer>
  );
}