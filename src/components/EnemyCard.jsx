import './Card.css'

const EnemyCard = ({ enemy, onClick }) => {
  const { name, image, type, danger } = enemy

  return (
    <div className="card" onClick={onClick}>
      <div className="card-image">
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <div className="image-placeholder">👹</div>
        )}
      </div>
      <div className="card-info">
        <h3 className="card-name">{name}</h3>
        <p className="card-subtitle">{type} · Опасность {danger}/100</p>
      </div>
    </div>
  )
}

export default EnemyCard