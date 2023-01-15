import styles from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const Ingredient = ({data}) => {
	return (
		<>
			<img src={data.image} alt={data.name} className={`mb-1`} />
			<h3 className={`${styles.name} text text_type_main-small`}>
				{data.name}
			</h3>
			<p className={styles.price}>
				<span className="text text_type_digits-default">{data.price}&nbsp;</span>
				<CurrencyIcon type="primary" />
			</p>
			<p className={`${styles.amount} mb-1`}>
				<span className="visually-hidden">Количество: </span>
				<Counter count={1} size="default" extraClass="m-1" />
			</p>
		</>
	);
}

export default Ingredient;