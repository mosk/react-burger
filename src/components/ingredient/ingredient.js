import React from 'react';
import styles from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';

const Ingredient = ({ data }) => {
	const [modalVisibility, setVisible] = React.useState(false);

	const handleOpenModal = (e) => {
		e.preventDefault();
		setVisible(true);
	}

	const handleCloseModal = (e) => {
		setVisible(false);
	}

	const modalOverlay = (
		<ModalOverlay onClose={handleCloseModal} item={data} />
	)

	return (
		<>
			<a href="/" onClick={handleOpenModal}>
				<img src={data.image} alt={data.name} className={`${styles.image} mb-1`} />
			</a>
			<h3 className={`${styles.name} text text_type_main-small`}>
				{data.name}
			</h3>
			<p className={styles.price}>
				<span className="text text_type_digits-default">{data.price}&nbsp;</span>
				<CurrencyIcon type="primary" />
			</p>
			<div className={`${styles.amount} mb-1`}>
				<span className="visually-hidden">Количество: </span>
				<Counter count={1} size="default" extraClass="m-1" />
			</div>
			{modalVisibility && modalOverlay}
		</>
	);
}

Ingredient.propTypes = {
	data: PropTypes.shape({
		calories: PropTypes.number.isRequired,
		carbohydrates: PropTypes.number.isRequired,
		fat: PropTypes.number.isRequired,
		image: PropTypes.string.isRequired,
		image_large: PropTypes.string.isRequired,
		image_mobile: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		proteins: PropTypes.number.isRequired,
		type: PropTypes.oneOf(['bun', 'sauce', 'main']),
		__v: PropTypes.number,
		_id: PropTypes.string.isRequired
	})
};

export default Ingredient;