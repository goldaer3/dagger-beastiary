import { dataRegistry } from '../data/registry'
import ModalLink from './ModalLink'
import './EnemyModal.css'

const EnemyModal = ({ enemy, onClose }) => {
  const allEnemies = dataRegistry.enemy.data

  if (!enemy) return null

  const {
    name, type, species, location, danger, status,
    combat, loot, appearance, backstory, abilities, image,
    master, minions,
    behavior, intellect, society
  } = enemy

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
            <div className="image-placeholder" style={{ display: image ? 'none' : 'flex' }}>👹</div>
          </div>
          <div className="modal-title-block">
            <h2 className="modal-name">{name}</h2>
            <div className="modal-badges">
              {status && <span className="badge status">{status}</span>}
              <span className="badge">{type}</span>
              <span className="badge">{species}</span>
            </div>
<p className="modal-location">
              Локация: {Array.isArray(location)
                ? location.map((loc, i) => (
                  <span key={loc}>
                    <ModalLink link={`location:${loc}`}>{loc}</ModalLink>
                    {i < location.length - 1 ? ', ' : ''}
                  </span>
                ))
                : <ModalLink link={`location:${location}`}>{location}</ModalLink>}
            </p>
            {master && (
              <p className="modal-master">
                Хозяин: <ModalLink link={`enemy:${master}`}>{allEnemies.find(e => e.id === master)?.name || master}</ModalLink>
              </p>
            )}
            {minions && minions.length > 0 && (
              <p className="modal-minions">
                Приспешники: {minions.map((id, i) => (
                  <span key={id}>
                    <ModalLink link={`enemy:${id}`}>{allEnemies.find(e => e.id === id)?.name || id}</ModalLink>
                    {i < minions.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>

        <div className="combat-bar">
          <div className="combat-stat">
            <span className="stat-icon">⚠️</span>
            <span className="stat-value">{danger}/100</span>
            <span className="stat-label">Опасность</span>
          </div>
          <div className="combat-stat">
            <span className="stat-icon">❤️</span>
            <span className="stat-value">{combat.wounds}</span>
            <span className="stat-label">Раны</span>
          </div>
          <div className="combat-stat">
            <span className="stat-icon">🛡️</span>
            <span className="stat-value">{combat.evasion}</span>
            <span className="stat-label">Уклонение</span>
          </div>
          <div className="combat-stat">
            <span className="stat-icon">📊</span>
            <span className="stat-value">{combat.thresholds.minor}/{combat.thresholds.major}</span>
            <span className="stat-label">Пороги</span>
          </div>
        </div>

        <div className="behavior-panel info-card">
          <h3>Характер и поведение</h3>
          <div className="behavior-grid">
            <div className="behavior-item">
              <strong>Поведение:</strong> <span className="behavior-value">{behavior || '—'}</span>
            </div>
            {intellect?.length > 0 && (
              <div className="behavior-item">
                <strong>Интеллект:</strong>
                <ul className="tag-list">
                  {intellect.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              </div>
            )}
            {society?.length > 0 && (
              <div className="behavior-item">
                <strong>Общество:</strong>
                <ul className="tag-list">
                  {society.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="modal-body enemy-body">
          <div className="modal-column">
            <section className="info-card">
              <h3>Лут</h3>
              <ul className="loot-list">
                {loot.map((item, i) => (
                  <li key={i}>
                    <ModalLink link={item.link}>{item.name}</ModalLink>
                  </li>
                ))}
              </ul>
            </section>
            <section className="info-card">
              <h3>Внешность</h3>
              <p>{appearance}</p>
            </section>
          </div>
          <div className="modal-column">
            <section className="info-card">
              <h3>Предыстория</h3>
              <p>{backstory}</p>
            </section>
            <section className="info-card">
              <h3>Способности</h3>
              <div className="abilities-list">
                {abilities.map((abil, i) => (
                  <div key={i} className="ability-item">
                    <strong>
                      <ModalLink link={abil.link}>{abil.name}</ModalLink>
                    </strong>
                    {abil.description && <p>{abil.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnemyModal