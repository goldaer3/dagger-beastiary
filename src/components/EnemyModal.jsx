import './EnemyModal.css'

const EnemyModal = ({ enemy, onClose, allEnemies = [], onOpenEnemy }) => {
  if (!enemy) return null

  const {
    name, type, species, location, danger, status,
    combat, loot, appearance, backstory, abilities, image,
    master, minions,
    behavior, intellect, society   // новые поля
  } = enemy

  const handleOpenEnemy = (id) => (e) => {
    e.preventDefault()
    const target = allEnemies.find(e => e.id === id)
    if (target && onOpenEnemy) onOpenEnemy(target)
  }

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
              <span className="badge"><a href="#">{type}</a></span>
              <span className="badge"><a href="#">{species}</a></span>
            </div>
            <p className="modal-location">
              Локация: {Array.isArray(location) 
                ? location.map((loc, i) => (
                    <span key={loc}>
                      <a href="#">{loc}</a>{i < location.length - 1 ? ', ' : ''}
                    </span>
                  )) 
                : <a href="#">{location}</a>}
            </p>
            {master && (
              <p className="modal-master">
                Хозяин: <a href="#" onClick={handleOpenEnemy(master)}>
                  {allEnemies.find(e => e.id === master)?.name || master}
                </a>
              </p>
            )}
            {minions && minions.length > 0 && (
              <p className="modal-minions">
                Приспешники: {minions.map((id, i) => (
                  <span key={id}>
                    <a href="#" onClick={handleOpenEnemy(id)}>
                      {allEnemies.find(e => e.id === id)?.name || id}
                    </a>{i < minions.length - 1 ? ', ' : ''}
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

        {/* НОВАЯ СЕКЦИЯ: Поведение, интеллект, общество */}
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
                    {item.link ? <a href={item.link}>{item.name}</a> : item.name}
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
                      {abil.link ? <a href="#" onClick={handleOpenEnemy(abil.link.split(':')[1])}>{abil.name}</a> : abil.name}
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