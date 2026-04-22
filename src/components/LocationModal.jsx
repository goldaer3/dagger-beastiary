// src/components/LocationModal.jsx
import { useState, useEffect, useMemo } from 'react';
import { useModal } from '../context/ModalContext';
import enemiesData from '../data/enemies.json';
import locationsData from '../data/locations.json';
import './LocationModal.css';

const LocationModal = ({ location, onClose }) => {
  const { openModal } = useModal();
  const [enemies, setEnemies] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    setEnemies(Array.isArray(enemiesData) ? enemiesData : []);
    setLocations(Array.isArray(locationsData) ? locationsData : []);
  }, []);

  if (!location) return null;

  const {
    id,
    name,
    type,
    rarity,
    danger,
    description,
    flora = [],
    structures = [],
    variants = [],
    image,
  } = location;

  // Находим обитателей: мобы, у которых в массиве location есть name или id локации
  const inhabitants = useMemo(() => {
    if (!enemies.length) return [];
    return enemies.filter(enemy => {
      const loc = enemy.location;
      if (!loc) return false;
      const locArray = Array.isArray(loc) ? loc : [loc];
      return locArray.some(l => l === name || l === id);
    });
  }, [enemies, name, id]);

  const handleOpenEnemy = (enemyId) => (e) => {
    e.preventDefault();
    const enemy = enemies.find(e => e.id === enemyId);
    if (enemy) {
      openModal('enemy', enemyId, enemy);
    }
  };

  const handleOpenVariant = (variantId) => (e) => {
    e.preventDefault();
    const variantLocation = locations.find(loc => loc.id === variantId);
    if (variantLocation) {
      openModal('location', variantId, variantLocation);
    }
  };

  const handleOpenStructure = (structureId) => (e) => {
    e.preventDefault();
    // Заглушка для структур – можно будет открыть отдельную модалку позже
    console.log('Open structure:', structureId);
  };

  return (
    <div className="location-modal-overlay" onClick={onClose}>
      <div className="location-modal-content" onClick={e => e.stopPropagation()}>
        <button className="location-modal-close" onClick={onClose}>✕</button>

        <div className="location-modal-header">
          <div className="location-modal-image">
            {image ? (
              <img src={image} alt={name} onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.querySelector('.location-image-placeholder').style.display = 'flex';
              }} />
            ) : null}
            <div
              className="location-image-placeholder"
              style={{ display: image ? 'none' : 'flex' }}
            >
              🗺️
            </div>
          </div>

          <div className="location-title-block">
            <h2 className="location-modal-name">{name}</h2>
            <div className="location-badges">
              {type && <span className="location-badge">{type}</span>}
              {rarity && <span className="location-badge">{rarity}</span>}
              {danger && (
                <span className="location-badge danger">⚠️ {danger}</span>
              )}
            </div>
          </div>
        </div>

        <div className="location-danger-bar">
          <div className="location-danger-stat">
            <span className="danger-icon">⚠️</span>
            <span className="danger-value">{danger}</span>
            <span className="danger-label">Опасность</span>
          </div>
        </div>

        <div className="location-modal-body">
          <div className="location-column">
            <section className="location-info-card">
              <h3>Описание</h3>
              <p>{description}</p>
            </section>

            {flora.length > 0 && (
              <section className="location-info-card">
                <h3>Флора</h3>
                <ul className="location-list flora">
                  {flora.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </section>
            )}
          </div>

          <div className="location-column">
            {inhabitants.length > 0 && (
              <section className="location-info-card">
                <h3>Обитатели</h3>
                <ul className="location-list inhabitants">
                  {inhabitants.map(enemy => (
                    <li key={enemy.id}>
                      <a href="#" onClick={handleOpenEnemy(enemy.id)}>
                        {enemy.name}
                      </a>
                      {enemy.danger && (
                        <span className="mob-danger"> ({enemy.danger}/100)</span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {structures.length > 0 && (
              <section className="location-info-card">
                <h3>Структуры</h3>
                <ul className="location-list structures">
                  {structures.map(struct => (
                    <li key={struct.id}>
                      <a href="#" onClick={handleOpenStructure(struct.id)}>
                        {struct.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {variants.length > 0 && (
              <section className="location-info-card">
                <h3>Варианты</h3>
                <ul className="location-list variants">
                  {variants.map(variant => (
                    <li key={variant.id}>
                      <a href="#" onClick={handleOpenVariant(variant.id)}>
                        {variant.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;