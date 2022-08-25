import { useState } from "react";
import { Link } from 'react-router-dom';
import './image.css';
import Selection from "./selection";

export default function HandleImages({ loading, data}) {
  return(
    <>
      { loading 
        ? "Fetching images" 
        : <RenderImages data={data} />
      }
    </>
  )
}

export function RenderImages({ data }) {
  const handleImageError = (e, url) => {
    const result = /\.(jpeg|jpg|gif|png)$/.test(url);
    e.target.src = result ? url : 'default.png';
  }
  return (
    <>
      <h1>Reddit images</h1>
      <Selection />
      <div className="renderImages">
          {
            data.map(data => {
              const { thumbnail, title, id, url } = data.data;
              return(
                <Link className="cardContainer" key={id} to={`/${id}`} >
                  <img 
                    src={thumbnail} 
                    onError={(e) => handleImageError(e, url)} 
                    alt={title} 
                  />
                  <div className="imgTitle">
                    {title}
                  </div>
                </Link>
              )
            })
          }
      </div>
    </>
  );
}