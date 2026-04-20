// src/components/LocationModal.jsx
import './EnemyModal.css'   // используем общие стили модалок

const LocationModal = ({ location, onClose }) => {
  if (!location) return null

  const {
    name, type, region, climate, danger,
    description, features, inhabitants, image
  } = location

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-header">
          <div className="modal-image">
            {image ? (
              <img src={image} alt={name} onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentNode.querySelector('.image-placeholder').style.display = 'flex'
              }} />
            ) : null}
            <div className="image-placeholder" style={{ display: image ? 'none' : 'flex' }}>🗺️</div>
          </div>
          <div className="modal-title-block">
            <h2 className="modal-name">{name}</h2>
            <div className="modal-badges">
              <span className="badge">{type}</span>
              {region && <span className="badge">{region}</span>}
              {climate && <span className="badge">{climate}</span>}
            </div>
          </div>
        </div>

        <div className="combat-bar">
          <div className="combat-stat">
            <span className="stat-icon">⚠️</span>
            <span className="stat-value">{danger}/100</span>
            <span className="stat-label">Опасность</span>
          </div>
        </div>

        <div className="modal-body enemy-body">
          <div className="modal-column">
            <section className="info-card">
              <h3>Описание</h3>
              <p>{description}</p>
            </section>
            {features?.length > 0 && (
              <section className="info-card">
                <h3>Особенности</h3>
                <ul className="loot-list">
                  {features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </section>
            )}
          </div>
          <div className="modal-column">
            {inhabitants?.length > 0 && (
              <section className="info-card">
                <h3>Обитатели</h3>
                <ul className="loot-list">
                  {inhabitants.map((inh, i) => <li key={i}>{inh}</li>)}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocationModal