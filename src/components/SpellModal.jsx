import './SpellModal.css'

const SpellModal = ({ spell, onClose }) => {
  if (!spell) return null

  const {
    name, type, school, difficulty, cost, castingTime,
    range, duration, image, applicationMethod, checkDifficulty,
    requirements, action, description
  } = spell

  const showField = (value) => {
    return value && value !== '-' && value !== null
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-header">
          <div className="modal-image">
            {image ? (
              <img src={image} alt={name} />
            ) : (
              <div className="image-placeholder">✨</div>
            )}
          </div>
          <div className="modal-title-block">
            <h2 className="modal-name">{name}</h2>
            <div className="modal-badges">
              {type && <span className="badge">{type}</span>}
              {school && <span className="badge">{school}</span>}
              {difficulty && <span className="badge">{difficulty}</span>}
            </div>
          </div>
        </div>

        <div className="spell-details">
          <section className="info-card">
            <h3>Параметры</h3>
            <div className="param-grid">
              {showField(castingTime) && <div><strong>Время:</strong> {castingTime}</div>}
              {showField(range) && <div><strong>Дистанция:</strong> {range}</div>}
              {showField(cost) && <div><strong>Стоимость:</strong> {cost}</div>}
              {showField(duration) && <div><strong>Длительность:</strong> {duration}</div>}
              {showField(applicationMethod) && <div><strong>Способ:</strong> {applicationMethod}</div>}
              {showField(checkDifficulty) && <div><strong>Сложность броска:</strong> {checkDifficulty}</div>}
            </div>
          </section>

          {showField(requirements) && (
            <section className="info-card">
              <h3>Требования</h3>
              <p>{requirements}</p>
            </section>
          )}

          {showField(action) && (
            <section className="info-card">
              <h3>Действие</h3>
              <p>{action}</p>
            </section>
          )}

          {showField(description) && (
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

export default SpellModal