import './App.css';
import { Routes, Route } from 'react-router-dom';
import HandleImages from './components/images/image';
import { useEffect, useState } from 'react';
import IndividualImage from './components/individualImage/individualImage';

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const fetchImages = await fetch("https://www.reddit.com/r/pics/.json?jsonp=");
      const dataFetchImages = await fetchImages.json();
      setData(dataFetchImages.data.children);
      setLoading(false);
    })();
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HandleImages loading={loading} data={data} />} />
        <Route path="/:id" element={<IndividualImage data={data} />} />
      </Routes>
    </div>
  );
}

export default App;
