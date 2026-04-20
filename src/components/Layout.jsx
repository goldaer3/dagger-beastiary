import { Outlet, NavLink } from 'react-router-dom'
import './Layout.css'

const Layout = () => {
  const mainNavItems = [
    { path: '/', label: 'Главная' },
    { path: '/characters', label: 'Персонажи' },
    { path: '/enemies', label: 'Мобы' },
    { path: '/items', label: 'Артефакты' },
    { path: '/spells', label: 'Заклинания' },
  ]

  const worldNavItems = [
    { path: '/locations', label: 'Локации' },
    { path: '/settings', label: 'Сеттинги' },
    { path: '/species', label: 'Виды' },
    { path: '/events', label: 'События' },
    { path: '/countries', label: 'Страны' },
    { path: '/societies', label: 'Общества' },
  ]

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <h1 className="app-title">📜 Daggerheart Бестиарий</h1>
        <nav className="nav-container">
          <ul className="nav-list">
            {mainNavItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  end={item.path === '/'}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="nav-dropdown-wrapper">
              <span className="nav-link nav-dropdown-trigger">Мир ▼</span>
              <ul className="nav-dropdown">
                {worldNavItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        <div className="footer-decoration">❧</div>
        <p>Daggerheart Beastiary — свиток ведущего</p>
        <div className="footer-decoration">❧</div>
      </footer>
    </div>
  )
}

export default Layout