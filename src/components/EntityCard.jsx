import './Card.css'

const EntityCard = ({ item, onClick, config }) => {
  const { titleKey = 'name', subtitleFn, placeholder = '📦' } = config || {}
  const name = item[titleKey]
  const subtitle = subtitleFn ? subtitleFn(item) : ''

  return (
    <div className="card" onClick={onClick}>
      <div className="card-image">
        {item.image ? (
          <img src={item.image} alt={name} />
        ) : (
          <div className="image-placeholder">{placeholder}</div>
        )}
      </div>
      <div className="card-info">
        <h3 className="card-name">{name}</h3>
        <p className="card-subtitle">{subtitle}</p>
      </div>
    </div>
  )
}

export default EntityCard