import React from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

import ModalOverlay from '../modal-overlay/modal-overlay';

// RIGHT
const BurgerConstructor = ({data}) => {
	const [modalVisibility, setVisible] = React.useState(false);
	const getOrderID = () => {
		return 9999999;
	}

	const handleOpenModal = (e) => {
		setVisible(true);
	}

	const handleCloseModal = (e) => {
		setVisible(false);
	}

	const modalOverlay = (
		<ModalOverlay onClose={handleCloseModal} orderID={getOrderID()} />
	)

	return (
		<section className={`${styles.section} ml-5 mr-5 pt-25`}>
			<h2 className="mt-10 mb-5 text text_type_main-large visually-hidden">
				Состав бургера
			</h2>
			{	
				data.map((item, i) => i === 0 &&
				<div className={`${styles['ingredient-top']} mb-4`} key={item._id}>
					<ConstructorElement 
						text={item.name}
						price={item.price}
						thumbnail={item.image}
						type="top"
						isLocked={true}
					/>
				</div>
				)
			}
			<div className={`${styles.wrapper} custom-scroll`}>
				<ul className={`${styles.list} mb-4`}>
					{	
						data.map((item, i) =>
							<li className={`${styles.list__item} ml-3 mr-3 mb-4`} key={item._id}>
								<ConstructorElement 
									text={item.name}
									price={item.price}
									thumbnail={item.image}
								/>
							</li>
						)
					}
				</ul>
			</div>
			{	
				data.map((item, i) => i === 1 &&
				<div className={`${styles['ingredient-bottom']} mb-10`} key={item._id}>
					<ConstructorElement key={item._id}
						text={item.name}
						price={item.price}
						thumbnail={item.image}
						type="bottom"
						isLocked={true}
					/>
				</div>
				)
			}
			<div className={styles.order}>
				<p className={`${styles.price} mr-10`}>
					<span className="text text_type_digits-default">999999&nbsp;</span>
					<CurrencyIcon type="primary" />
				</p>
				<Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}>
					Оформить заказ
				</Button>
				{modalVisibility && modalOverlay}
			</div>
		</section>
	);
}

// проверить, нужно ли передавать все данные объекта или нужна тоько часть
BurgerConstructor.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		calories: PropTypes.number,
		carbohydrates: PropTypes.number,
		fat: PropTypes.number,
		image: PropTypes.string,
		image_large: PropTypes.string,
		image_mobile: PropTypes.string,
		name: PropTypes.string.isRequired,
		price: PropTypes.number,
		proteins: PropTypes.number,
		type: PropTypes.oneOf(['bun', 'sauce', 'main']),
		__v: PropTypes.number,
		_id: PropTypes.string.isRequired
	})).isRequired
};

export default BurgerConstructor;