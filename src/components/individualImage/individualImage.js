import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './individualImage.css';

export default function IndividualImage({ data }) {
  const { id } = useParams();
  const [imageData, setImageData] = useState(null);
  useEffect(() => {
    if (data) {
      const [result] = data.filter(data => data.data.id === id);
      setImageData(result.data);
    }
  }, [id, data]);
  const handleImageError = (e, url) => {
    const result = /\.(jpeg|jpg|gif|png)$/.test(url);
    e.target.src = result ? url : 'default.png';
  }
  return(
    <>
      { !data || !imageData
        ? <p style={{ textAlign: 'center' }}>Loading</p>
        : (<>
          <h2>{imageData.title}</h2>
          <p className="author"><span>Clicked by </span>{imageData.author}</p>
          <div className="imgContainer">
            <img 
              src={imageData.thumbnail} 
              onError={(e) => handleImageError(e, imageData.url)} 
              alt={imageData.title} 
            />
          </div>
        </>)
      }
    </>
  );
}