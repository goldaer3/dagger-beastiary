import './Card.css'

const SpellCard = ({ spell, onClick }) => {
  const { name, image, type, level } = spell

  return (
    <div className="card" onClick={onClick}>
      <div className="card-image">
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <div className="image-placeholder">✨</div>
        )}
      </div>
      <div className="card-info">
        <h3 className="card-name">{name}</h3>
        <p className="card-subtitle">{type} · {level}</p>
      </div>
    </div>
  )
}

export default SpellCard