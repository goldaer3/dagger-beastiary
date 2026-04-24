export const cardConfigs = {
  character: {
    subtitleFn: (c) => `${c.race} · ${c.class}`,
    placeholder: '👤',
    titleKey: 'name'
  },
  location: {
    subtitleFn: (l) => `${l.type} · Опасность ${l.danger}`,
    placeholder: '🗺️',
    titleKey: 'name'
  },
  item: {
    subtitleFn: (i) => Array.isArray(i.type) ? i.type.join(' · ') : i.type,
    placeholder: '📦',
    titleKey: 'name'
  },
  spell: {
    subtitleFn: (s) => `${s.type} · ${s.level}`,
    placeholder: '✨',
    titleKey: 'name'
  },
  enemy: {
    subtitleFn: (e) => `${e.type} · Опасность ${e.danger}/100`,
    placeholder: '👹',
    titleKey: 'name'
  }
}