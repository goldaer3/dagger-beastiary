import './ItemModal.css'

const ItemModal = ({ item, onClose }) => {
  if (!item) return null

  const {
    name, type, image, marketValue, creator,
    relatedSociety, property, description, materials,
    armor, damage, damageType, range, grip, characteristic
  } = item

  const typeArray = Array.isArray(type) ? type : [type]
  const isArmor = typeArray.includes('Броня') || typeArray.some(t => t.includes('Броня'))
  const isWeapon = typeArray.includes('Оружие') || typeArray.some(t => t.includes('Оружие'))
  const hasWeaponStats = !!(damage || damageType || range || grip || characteristic)

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
              {typeArray.map(t => <span key={t} className="badge">{t}</span>)}
            </div>
            {marketValue && (
              <p className="modal-cost">Стоимость: <strong>{marketValue.gold} золотых</strong></p>
            )}
            {creator && <p className="modal-creator">Создатель: {creator}</p>}
          </div>
        </div>

        <div className="modal-body item-body">
          {isArmor && armor && (
            <div className="item-stats-row">
              <section className="info-card item-def">
                <h3>Защита</h3>
                <div className="combat-bar">
                    {armor.rank && (
                      <div className="combat-stat">
                        <span className="stat-icon">📶</span>
                        <span className="stat-value">{armor.rank}</span>
                        <span className="stat-label">Ранг</span>
                      </div>
                    )}
                    {armor.thresholds && (
                      <div className="combat-stat">
                        <span className="stat-icon">⚡</span>
                        <span className="stat-value">{armor.thresholds.minor}/{armor.thresholds.major}</span>
                        <span className="stat-label">Пороги</span>
                      </div>
                    )}
                    {armor.baseClass && (
                      <div className="combat-stat">
                        <span className="stat-icon">🛡️</span>
                        <span className="stat-value">{armor.baseClass}</span>
                        <span className="stat-label">Класс</span>
                      </div>
                    )}
                  </div>
                </section>
              </div>
          )}

          {isWeapon && hasWeaponStats && (
            <section className="info-card item-stats">
              <h3>Боевые характеристики</h3>
              <div className="combat-bar">
                <div className="combat-stat">
                  <span className="stat-icon">🎯</span>
                  <span className="stat-value">{damage}</span>
                  <span className="stat-label">Урон</span>
                </div>
                <div className="combat-stat">
                  <span className="stat-icon">🗡️</span>
                  <span className="stat-value">{damageType}</span>
                  <span className="stat-label">Тип</span>
                </div>
                <div className="combat-stat">
                  <span className="stat-icon">📏</span>
                  <span className="stat-value">{range}</span>
                  <span className="stat-label">Дистанция</span>
                </div>
                <div className="combat-stat">
                  <span className="stat-icon">✋</span>
                  <span className="stat-value">{grip}</span>
                  <span className="stat-label">Хват</span>
                </div>
                <div className="combat-stat">
                  <span className="stat-icon">📊</span>
                  <span className="stat-value">{characteristic}</span>
                  <span className="stat-label">Характеристика</span>
                </div>
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