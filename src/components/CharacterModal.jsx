import ModalLink from './ModalLink'
import './CharacterModal.css'

const attrLabels = {
  agility: 'Проворность',
  strength: 'Сила',
  finesse: 'Искусность',
  instinct: 'Инстинкт',
  presence: 'Влияние',
  knowledge: 'Знание',
}

const Section = ({ title, children }) => (
  <section className="info-card">
    <h3>{title}</h3>
    {children}
  </section>
)

const EquipmentSection = ({ armor, primaryWeapon, secondaryWeapon }) => (
  <Section title="Снаряжение">
    <div className="equipment-list">
      {armor && (
        <div className="equipment-item">
          <span>Броня:</span>{' '}
          <ModalLink link={armor.link}>{armor.name}</ModalLink>
          {armor.note && <span className="equip-note"> ({armor.note})</span>}
        </div>
      )}
      {primaryWeapon && (
        <div className="equipment-item">
          <span>Оружие:</span>{' '}
          <ModalLink link={primaryWeapon.link}>{primaryWeapon.name}</ModalLink>
        </div>
      )}
      {secondaryWeapon && (
        <div className="equipment-item">
          <span>Доп.:</span>{' '}
          <ModalLink link={secondaryWeapon.link}>{secondaryWeapon.name}</ModalLink>
        </div>
      )}
    </div>
  </Section>
)

const InventorySection = ({ inventory }) => (
  <Section title="Инвентарь">
    <ul className="inventory-list">
      {inventory.map((item, i) => (
        <li key={i}>
          <ModalLink link={item.link}>{item.name}</ModalLink>
          {item.note && <span className="item-note"> ({item.note})</span>}
        </li>
      ))}
    </ul>
  </Section>
)

const CharacterModal = ({ character, onClose }) => {
  if (!character) return null

  const {
    name, race, origin, level, class: charClass, subclass, patron,
    domainCards = [], attributes = {}, armor, primaryWeapon, secondaryWeapon,
    mastery, experience = [], inventory = [], appearance, backstory, personality = [],
    relationships = [], image, session, kingdom, society, alignment,
    wounds = 0, stress = 0, evasion = 0, armorClass = 0, hope = 6, thresholds,
    author,
  } = character

  const renderSociety = () => {
    if (!society) return null
    const arr = Array.isArray(society) ? society : [society]
    return arr.map((s, i) => (
      <span key={s}>
        <a href="#">{s}</a>{i < arr.length - 1 ? ', ' : ''}
      </span>
    ))
  }

  return (
    <>
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
              <div className="image-placeholder" style={{ display: image ? 'none' : 'flex' }}>👤</div>
            </div>

            <div className="modal-title-block">
              <h2 className="modal-name">{name}</h2>
              <div className="modal-badges">
                <span className="badge">{race}</span>
                <span className="badge">{charClass}</span>
                {subclass && <span className="badge">{subclass}</span>}
                {level && <span className="badge">Ур. {level}</span>}
              </div>
              <p className="modal-origin">{origin}</p>
              {(session || kingdom || society || alignment || patron || author) && (
                <div className="modal-meta">
                  {session && <span>📜 <a href="#">{session}</a></span>}
                  {kingdom && <span>👑 <a href="#">{kingdom}</a></span>}
                  {society && <span>🏛️ {renderSociety()}</span>}
                  {alignment && <span>⚖️ {alignment}</span>}
                  {patron && <span>🍄 Покровитель: <ModalLink link={patron.link}>{patron.name}</ModalLink></span>}
                  {author && <span>✍️ {author}</span>}
                </div>
              )}
            </div>
          </div>

          <div className="combat-bar">
            <div className="combat-stat"><span className="stat-icon">❤️</span><span className="stat-value">{wounds}</span><span className="stat-label">Раны</span></div>
            <div className="combat-stat"><span className="stat-icon">💔</span><span className="stat-value">{stress}</span><span className="stat-label">Стресс</span></div>
            <div className="combat-stat"><span className="stat-icon">🛡️</span><span className="stat-value">{evasion}</span><span className="stat-label">Уклонение</span></div>
            <div className="combat-stat"><span className="stat-icon">⚔️</span><span className="stat-value">{armorClass}</span><span className="stat-label">Броня</span></div>
            <div className="combat-stat"><span className="stat-icon">✨</span><span className="stat-value">{hope}</span><span className="stat-label">Надежда</span></div>
            <div className="combat-stat"><span className="stat-icon">🎯</span><span className="stat-value">{mastery || 0}</span><span className="stat-label">Мастерство</span></div>
            {thresholds && <div className="combat-stat"><span className="stat-icon">📊</span><span className="stat-value">{thresholds.minor}/{thresholds.major}</span><span className="stat-label">Пороги</span></div>}
          </div>

          <div className="modal-body">
            <div className="modal-column">
              <Section title="Характеристики">
                <div className="attributes-grid">
                  {Object.entries(attributes).map(([k, v]) => (
                    <div key={k} className="attribute-row">
                      <span className="attr-label">{attrLabels[k]}</span>
                      <span className={`attr-value ${v > 0 ? 'positive' : v < 0 ? 'negative' : ''}`}>
                        {v > 0 ? '+' : ''}{v}
                      </span>
                    </div>
                  ))}
                </div>
              </Section>

              <EquipmentSection armor={armor} primaryWeapon={primaryWeapon} secondaryWeapon={secondaryWeapon} />

              {domainCards.length > 0 && (
                <Section title="Карты домена">
                  <ul className="domain-list">{domainCards.map(c => <li key={c}>{c}</li>)}</ul>
                </Section>
              )}

              {experience.length > 0 && (
                <Section title="Опыт">
                  <ul className="experience-list">
                    {experience.map((exp, i) => (
                      <li key={i} className="exp-item">
                        <span className="exp-name">
                          <ModalLink link={exp.link}>{exp.name}</ModalLink>
                        </span>
                        {exp.value != null && <span className="exp-value">+{exp.value}</span>}
                        {exp.description && <span className="exp-description">{exp.description}</span>}
                      </li>
                    ))}
                  </ul>
                </Section>
              )}
            </div>

            <div className="modal-column">
              <InventorySection inventory={inventory} />
              <Section title="Внешность"><p>{appearance}</p></Section>

              {personality.length > 0 && (
                <Section title="Характер">
                  <div className="personality-tags">{personality.map(t => <span key={t} className="tag">{t}</span>)}</div>
                </Section>
              )}

              {relationships.length > 0 && (
                <Section title="Взаимоотношения">
                  <div className="relationships-container">
                    {relationships.map((rel, i) => (
                      <div key={i} className="relationship-card">
                        <div className="rel-header">
                          <span className="rel-name">{rel.name}</span>
                          <div className="rel-scores">
                            <span className={`rel-score ${rel.from >= 0 ? 'positive' : 'negative'}`}>{rel.from > 0 ? '+' : ''}{rel.from}</span>
                            <span className="rel-divider">/</span>
                            <span className={`rel-score ${rel.to >= 0 ? 'positive' : 'negative'}`}>{rel.to > 0 ? '+' : ''}{rel.to}</span>
                          </div>
                        </div>
                        {rel.note && <div className="rel-note">{rel.note}</div>}
                      </div>
                    ))}
                  </div>
                </Section>
              )}
            </div>

            {backstory && (
              <div className="modal-fullwidth">
                <Section title="Предыстория"><p>{backstory}</p></Section>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default CharacterModal