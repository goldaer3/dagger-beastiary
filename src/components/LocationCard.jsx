// src/components/LocationCard.jsx
import './Card.css';

const LocationCard = ({ location, onClick }) => {
  const { name, type, danger, image } = location;

  return (
    <div className="card" onClick={onClick}>
      <div className="card-image">
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <div className="image-placeholder">🗺️</div>
        )}
      </div>
      <div className="card-info">
        <h3 className="card-name">{name}</h3>
        <p className="card-subtitle">
          {type} · Опасность {danger}
        </p>
      </div>
    </div>
  );
};

export default LocationCard;