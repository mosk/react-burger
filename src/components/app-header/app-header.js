import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
	return (
		<header className={`${styles.header} p-4`}>
			<a href="/" className={styles.logo}>
				<Logo />
			</a>
			<nav className={styles.nav}>
				<a href="/" className={`${styles.button} p-5 m-1`}>
					<BurgerIcon type="primary" />
					<span className="text text_type_main-default pl-1">
						Конструктор
					</span>
				</a>
				<a href="/" className={`${styles.button} ${styles['button--secondary']} p-5 m-1`}>
					<ListIcon type="secondary" />
					<span className="text text_type_main-default pl-1">
						Лента заказов
					</span>
				</a>
			</nav>
			<nav className={`${styles.nav} ${styles['nav--user']}`}>
				<button className={`${styles.button} ${styles['button--secondary']} p-5 m-1`}>
					<ProfileIcon type="secondary" />
					<span className="text text_type_main-default pl-1">
						Личный кабинет
					</span>
				</button>
			</nav>
		</header>
	);
}

export default AppHeader;