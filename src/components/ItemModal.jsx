import './ItemModal.css'

const ItemModal = ({ item, onClose }) => {
  if (!item) return null

  const {
    name, type, image, marketValue, creator,
    relatedSociety, property, description, materials,
    armor
  } = item

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content item-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-header">
          <div className="modal-image">
            {image ? (
              <img src={image} alt={name} onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentNode.querySelector('.image-placeholder').style.display = 'flex'
              }} />
            ) : null}
            <div className="image-placeholder" style={{ display: image ? 'none' : 'flex' }}>📦</div>
          </div>

          <div className="modal-title-block">
            <h2 className="modal-name">{name}</h2>
            <div className="modal-badges">
              {Array.isArray(type) ? type.map(t => <span key={t} className="badge">{t}</span>) : <span className="badge">{type}</span>}
            </div>
            {creator && <p className="modal-creator">Создатель: {creator}</p>}
          </div>
        </div>

        <div className="item-details">
          {marketValue && (
            <section className="info-card">
              <h3>Стоимость</h3>
              <p><strong>{marketValue.gold} золотых</strong></p>
            </section>
          )}

          {armor && (
            <section className="info-card">
              <h3>Броня</h3>
              <div className="armor-stats">
                {armor.rank && <p><strong>Ранг:</strong> {armor.rank}</p>}
                {armor.thresholds && <p><strong>Пороги урона:</strong> {armor.thresholds.minor} / {armor.thresholds.major}</p>}
                {armor.baseClass && <p><strong>Показатель брони:</strong> {armor.baseClass}</p>}
              </div>
            </section>
          )}

          {materials && (
            <section className="info-card">
              <h3>Материалы</h3>
              <p>{materials}</p>
            </section>
          )}

          {relatedSociety && relatedSociety.length > 0 && (
            <section className="info-card">
              <h3>Связанные общества</h3>
              <div className="tags-container">
                {relatedSociety.map(soc => <span key={soc} className="tag">{soc}</span>)}
              </div>
            </section>
          )}

          {property && (
            <section className="info-card">
              <h3>Свойство</h3>
              <p className="property-text">{property}</p>
            </section>
          )}

          {description && (
            <section className="info-card">
              <h3>Описание</h3>
              <p>{description}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default ItemModal