import { NavLink, Outlet } from "react-router"
import { CurrencySelect } from "./CurrencySelect"

export const Layout = () => {
  return(
    <div>
      <header className="site-header">
        <div className="site-header__inner">
          <h1 className="site-header__brand">Equilibre</h1>
          <nav className="site-header__nav">
            <NavLink to="/" className="site-header__link" style={({isActive})=>({
              fontWeight: isActive ? "bold" : "normal"
            })}>Accueil</NavLink>
          </nav>
          <div className="site-header__currency">
            <CurrencySelect />
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  )
}
