// src/components/ModalRenderer.jsx
import { useModal } from '../context/ModalContext';
import { useEffect, useState } from 'react';
import charactersData from '../data/characters.json';
import itemsData from '../data/items.json';
import enemiesData from '../data/enemies.json';
import locationsData from '../data/locations.json';
import CharacterModal from './CharacterModal';
import ItemModal from './ItemModal';
import EnemyModal from './EnemyModal';
import LocationModal from './LocationModal';

const ModalRenderer = () => {
  const { modal, closeModal } = useModal();
  const [data, setData] = useState(null);
  const [allEnemies] = useState(Array.isArray(enemiesData) ? enemiesData : []);

  useEffect(() => {
    if (!modal) {
      setData(null);
      return;
    }
    const { type, id, data: providedData } = modal;
    if (providedData) {
      setData(providedData);
      return;
    }

    // Загружаем данные по id из соответствующего файла
    switch (type) {
      case 'character':
        setData(charactersData.find(c => c.id === id) || null);
        break;
      case 'item':
        setData(itemsData.find(i => i.id === id) || null);
        break;
      case 'enemy':
        setData(enemiesData.find(e => e.id === id) || null);
        break;
      case 'location':
        setData(locationsData.find(loc => loc.id === id) || null);
        break;
      default:
        setData(null);
    }
  }, [modal]);

  if (!modal || !data) return null;

  const handleOpenEnemy = (enemy) => {
    // Используется внутри EnemyModal для открытия связанных врагов (хозяин/приспешники)
    // Но в нашем случае из локации мы вызываем openModal напрямую, так что это не обязательно
  };

  switch (modal.type) {
    case 'character':
      return <CharacterModal character={data} onClose={closeModal} />;
    case 'item':
      return <ItemModal item={data} onClose={closeModal} />;
    case 'enemy':
      return (
        <EnemyModal
          enemy={data}
          onClose={closeModal}
          allEnemies={allEnemies}
          onOpenEnemy={(enemy) => {
            // При клике на связанного врага открываем его модалку
            // Здесь используем openModal из контекста, но мы не можем вызвать хук внутри хука,
            // поэтому просто передаём enemy, а в EnemyModal уже вызывается openModal через контекст
          }}
        />
      );
    case 'location':
      return <LocationModal location={data} onClose={closeModal} />;
    default:
      return null;
  }
};

export default ModalRenderer;