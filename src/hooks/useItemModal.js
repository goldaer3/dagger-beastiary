// src/hooks/useItemModal.js
import { useState, useCallback } from 'react';

export const useItemModal = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemsCache, setItemsCache] = useState(null);

  const loadItems = useCallback(async () => {
    if (itemsCache) return itemsCache;
    const module = await import('../data/items.json');
    const items = module.default;
    setItemsCache(items);
    return items;
  }, [itemsCache]);

  const openItemFromLink = useCallback(async (link) => {
    if (!link?.startsWith('modal:')) return;
    const itemId = link.split(':')[2];
    const items = await loadItems();
    const foundItem = items.find(it => it.id === itemId);
    if (foundItem) setSelectedItem(foundItem);
  }, [loadItems]);

  const closeItem = useCallback(() => setSelectedItem(null), []);

  return { selectedItem, openItemFromLink, closeItem };
};