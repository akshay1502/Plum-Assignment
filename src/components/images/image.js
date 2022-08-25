import { useState } from "react";
import { Link } from 'react-router-dom';
import './image.css';

export default function HandleImages({ data }) {
  return(
    <>
      { 
        data 
          ? <RenderImages data={data} />
          : <p style={{ textAlign: 'center' }}>Loading</p>
      }
    </>
  )
}

export function RenderImages({ data }) {
  const [imagesData, setImagesData] = useState(data);
  const [category, setCategory] = useState("default")
  const [order, setOrder] = useState("1");
  const handleImageError = (e, url) => {
    const result = /\.(jpeg|jpg|gif|png)$/.test(url);
    e.target.src = result ? url : 'default.png';
  }
  const sortByCategory = (e) => {
    const category = e.target.value;
    setCategory(category);
    if (category === "default") {
      setImagesData(data);
    } else {
      const result = order === "1"
        ? imagesData.sort((a,b) => a.data[category] - b.data[category])
        : imagesData.sort((a,b) => b.data[category] - a.data[category]);
      setImagesData(result)
    }
  }
  const orderBy = (e) => {
    setOrder(e.target.value);
    setImagesData(imagesData.reverse());
  }
  return (
    <>
      <h1>Reddit Image Gallery</h1>
      <div className="selection_group">
        <select value={category} onChange={(e) => sortByCategory(e)}>
          <option value="default">All</option>
          <option value="upvote_ratio">Upvote</option>
          <option value="score">Score</option>
          <option value="total_awards_received">Awards Received</option>
        </select>
        <select value={order} onChange={(e) => orderBy(e)}>
          <option value="1">Asc</option>
          <option value="0">Desc</option>
        </select>
      </div>
      <div className="renderImages">
          {
            imagesData.map(data => {
              const { thumbnail, title, id, url } = data.data;
              return(
                <div key={id} className="cardContainer">
                  <Link className="card"  to={`/${id}`} >
                    <img 
                      src={thumbnail} 
                      onError={(e) => handleImageError(e, url)} 
                      alt={title} 
                    />
                    <div className="imgTitle">
                      {title}
                    </div>
                  </Link>
                  <p className="metaData">{category !== "default" && data.data[category]}</p>
                </div>
              )
            })
          }
      </div>
    </>
  );
}