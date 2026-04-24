import { dataRegistry } from '../data/registry'
import ModalLink from './ModalLink'
import './LocationModal.css'

const LocationModal = ({ location, onClose }) => {
  const allEnemies = dataRegistry.enemy.data

  if (!location) return null

  const {
    id, name, type, rarity, danger,
    description, flora = [], structures = [], variants = [], image,
  } = location

  const inhabitants = allEnemies.filter(enemy => {
    const loc = enemy.location
    if (!loc) return false
    const locArray = Array.isArray(loc) ? loc : [loc]
    return locArray.some(l => l === name || l === id)
  })

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
              {type && <span className="badge">{type}</span>}
              {rarity && <span className="badge">{rarity}</span>}
              {danger && <span className="badge danger">⚠️ {danger}</span>}
            </div>
          </div>
        </div>

        <div className="combat-bar">
          <div className="combat-stat">
            <span className="stat-icon">⚠️</span>
            <span className="stat-value">{danger}</span>
            <span className="stat-label">Опасность</span>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-column">
            <section className="info-card">
              <h3>Описание</h3>
              <p>{description}</p>
            </section>
            {flora.length > 0 && (
              <section className="info-card">
                <h3>Флора</h3>
                <ul className="info-list">
                  {flora.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </section>
            )}
          </div>

          <div className="modal-column">
            {inhabitants.length > 0 && (
              <section className="info-card">
                <h3>Обитатели</h3>
                <ul className="info-list">
                  {inhabitants.map(enemy => (
                    <li key={enemy.id}>
                      <ModalLink link={`enemy:${enemy.id}`}>{enemy.name}</ModalLink>
                      {enemy.danger && <span className="mob-danger"> ({enemy.danger}/100)</span>}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {structures.length > 0 && (
              <section className="info-card">
                <h3>Структуры</h3>
                <ul className="info-list">
                  {structures.map(struct => (
                    <li key={struct.id}>
                      <a href="#">{struct.name}</a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {variants.length > 0 && (
              <section className="info-card">
                <h3>Варианты</h3>
                <ul className="info-list">
                  {variants.map(variant => (
                    <li key={variant.id}>
                      <ModalLink link={`location:${variant.id}`}>{variant.name}</ModalLink>
                    </li>
                  ))}
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