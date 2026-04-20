import './Card.css'

const CharacterCard = ({ character, onClick }) => {
  const { name, image, race, class: charClass } = character

  return (
    <div className="card" onClick={onClick}>
      <div className="card-image">
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <div className="image-placeholder">👤</div>
        )}
      </div>
      <div className="card-info">
        <h3 className="card-name">{name}</h3>
        <p className="card-subtitle">{race} · {charClass}</p>
      </div>
    </div>
  )
}

export default CharacterCard