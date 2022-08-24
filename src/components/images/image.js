import { useState } from "react";
import { Link } from 'react-router-dom';
import './image.css';

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
  const [imageArray] = useState(data);
  return (
    <>
      <h1>Reddit images</h1>
      <div className="renderImages">
          {
            imageArray.map(data => {
              const { thumbnail, title, id, url } = data.data;
              return(
                <Link className="cardContainer" key={id} to={`/${id}`} >
                  <img 
                    src={thumbnail} 
                    onError={(e) => e.target.src = url} 
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