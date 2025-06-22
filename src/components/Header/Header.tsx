import { NavLink, useLocation } from 'react-router-dom';
import styles from './header.module.css'
import logo from '../../image/Logo SS.svg';
import analitic from '../../image/mage_upload.svg'
import generator from '../../image/oui_ml-create-multi-metric-job.svg'
import history from '../../image/solar_history-linear.svg'

function Header() {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    }

    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <NavLink
                    to="/">
                    <img src={logo} alt="Летние школы" />
                </NavLink>
                <h1 className={styles.logoText}>МЕЖГАЛАКТИЧЕСКАЯ АНАЛИТИКА</h1>
            </div>

            <nav className={styles.navLinks}>
                <NavLink
                    to="/"
                    className={`${styles.navLink} ${isActive('/') ? styles.activeLink : ''}`}
                >
                    <img src={analitic} alt="СSV Аналитик" />
                    CSV Аналитик
                </NavLink>
                <NavLink
                    to="/generate"
                    className={`${styles.navLink} ${isActive('/generate') ? styles.activeLink : ''}`}
                >
                    <img src={generator} alt="СSV Генератор" />
                    CSV Генератор
                </NavLink>
                <NavLink
                    to="/history"
                    className={`${styles.navLink} ${isActive('/history') ? styles.activeLink : ''}`}
                >
                    <img src={history} alt="История" />
                    История
                </NavLink>
            </nav>
        </header>
    )
}
export default Header;