// src/pages/HomePage.jsx
import { Link } from 'react-router-dom'
import './HomePage.css'

const HomePage = () => {
  const categories = [
    { path: '/characters', icon: '👤', title: 'Персонажи', desc: 'Союзники, наставники, NPC' },
    { path: '/enemies', icon: '👹', title: 'Враги', desc: 'Монстры, противники, боссы' },
    { path: '/items', icon: '⚡', title: 'Артефакты', desc: 'Магические предметы и оружие' },
    { path: '/spells', icon: '✨', title: 'Заклинания', desc: 'Чары, ритуалы, проклятия' },
    { path: '/locations', icon: '🗺️', title: 'Локации', desc: 'Города, земли, подземелья' },
    { path: '/settings', icon: '🌌', title: 'Сеттинги', desc: 'Миры, эпохи, реальности' },
    { path: '/species', icon: '🧬', title: 'Виды', desc: 'Расы, существа, народы' },
    { path: '/events', icon: '⏳', title: 'События', desc: 'Исторические вехи, катаклизмы' },
    { path: '/countries', icon: '🌍', title: 'Страны', desc: 'Королевства, империи, земли' },
    { path: '/societies', icon: '🏛️', title: 'Общества', desc: 'Гильдии, ордена, культы' },
  ]

  return (
    <div className="homepage">
      <section className="hero">
        <div className="hero-ornament">❦</div>
        <h2>Добро пожаловать в Бестиарий</h2>
        <div className="hero-subtitle">Daggerheart</div>
        <p className="hero-description">
          Сей древний свиток содержит знания о мире, его обитателях и тайнах. 
          Листай страницы, дабы подготовиться к грядущим испытаниям.
        </p>
        <div className="hero-ornament">❦</div>
      </section>

      <section className="categories-section">
        <h3 className="section-title">
          <span className="title-decoration">◈</span> 
          Разделы свитка 
          <span className="title-decoration">◈</span>
        </h3>
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link to={cat.path} key={cat.path} className="category-card">
              <div className="card-icon">{cat.icon}</div>
              <h4>{cat.title}</h4>
              <p>{cat.desc}</p>
              <div className="card-footer">⌲</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage