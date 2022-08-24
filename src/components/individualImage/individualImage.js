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
  return(
    <div>
      { !data || !imageData
        ? 'Loading'
        : (<div>
          <h2>{imageData.title}</h2>
          <p><span style={{ color: 'grey' }}>Clicked by </span>{imageData.author}</p>
          <div className="imgContainer">
            <img 
              src={imageData.thumbnail} 
              onError={(e) => e.target.src = imageData.url} 
              alt={imageData.title} 
            />
          </div>
        </div>)
      }
    </div>
  );
}