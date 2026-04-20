// src/components/LocationCard.jsx
import './Card.css'

const LocationCard = ({ location, onClick }) => {
  const { name, image, type, danger } = location

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
        <p className="card-subtitle">{type} · Опасность {danger}/100</p>
      </div>
    </div>
  )
}

export default LocationCard