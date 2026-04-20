import './Card.css'

const ItemCard = ({ item, onClick }) => {
  const { name, image, type } = item

  return (
    <div className="card" onClick={onClick}>
      <div className="card-image">
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <div className="image-placeholder">📦</div>
        )}
      </div>
      <div className="card-info">
        <h3 className="card-name">{name}</h3>
        <p className="card-subtitle">
          {Array.isArray(type) ? type.join(' · ') : type}
        </p>
      </div>
    </div>
  )
}

export default ItemCard