import React from 'react';
import styles from './modal.module.css';
import { CloseIcon, CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const Modal = (props) => {
	const { onClose, item = false, modalTitle = `Детали ингредиента`, orderID = false } = props;

	const handleClickModal = (e) => {
		console.log(e.currentTarget);
	};

	return (
		<>
			<div className={`${styles.modal}`} onClick={handleClickModal}>
				{ 	
					orderID ? 
					<h2 className={`${styles.title} text text_type_main-large visually-hidden`}>
						Ваш заказ
					</h2> :
					<h2 className={`${styles.title} text text_type_main-large`}>
						{modalTitle}
					</h2>
				}
				{ item && (
					<>
						<img className={`${styles.image} mb-4`} src={item.image_large} alt={item.name} width="480" height="240" /> 
						<p className="text text_type_main-medium mb-8">{item.name}</p>
						<table className={`${styles.table} mb-5`}>
							<thead className={`${styles.table__header}`}>
								<tr>
									<th className={`${styles.table__th}`}>
										<p className={`${styles.table__text} text text_type_main-default text_color_inactive`}>
											Калории, ккал
										</p>
									</th>
									<th className={`${styles.table__th}`}>
										<p className={`${styles.table__text} text text_type_main-default text_color_inactive`}>
											Белки, г
										</p>
									</th>
									<th className={`${styles.table__th}`}>
										<p className={`${styles.table__text} text text_type_main-default text_color_inactive`}>
											Жиры, г
										</p>
									</th>
									<th className={`${styles.table__th}`}>
										<p className={`${styles.table__text} text text_type_main-default text_color_inactive`}>
											Углеводы, г
										</p>
									</th>
								</tr>
							</thead>
							<tbody className={`${styles.table__body}`}>
								<tr>
									<td className={`${styles.table__td}`}>
										<p className={`${styles.table__text} text text_type_digits-default text_color_inactive`}>
											{item.calories}
										</p>
									</td>
									<td className={`${styles.table__td}`}>
										<p className={`${styles.table__text} text text_type_digits-default text_color_inactive`}>
											{item.proteins}
										</p>
									</td>
									<td className={`${styles.table__td}`}>
										<p className={`${styles.table__text} text text_type_digits-default text_color_inactive`}>
											{item.fat}
										</p>
									</td>
									<td className={`${styles.table__td}`}>
										<p className={`${styles.table__text} text text_type_digits-default text_color_inactive`}>
											{item.carbohydrates}
										</p>
									</td>
								</tr>
							</tbody>
						</table>
					</>
				)}
				{ orderID && (
					<>
						<p className="text_type_digits-large mt-20 mb-8">{orderID}</p>
						<p className="text text_type_main-medium mb-10 pb-10">
							идентификатор заказа
						</p>
						<i className={`${styles['icon--success']} mb-10`}><CheckMarkIcon type="primary" /></i>
						<p className="text text_type_main-default mb-2 pt-10">
							Ваш заказ начали готовить
						</p>
						<p className="text text_type_main-default text_color_inactive mb-20">
							Дождитесь готовности на&nbsp;орбитальной станции
						</p>
					</>
				)}
				<button className={`${styles['button--close']}`} onClose={onClose}>
					<CloseIcon type="primary" />
					<span className="visually-hidden">
						Закрыть окно
					</span>
				</button>
			</div>
		</>
	);
};

Modal.propTypes = {
	onClose: PropTypes.func.isRequired,
	item: PropTypes.shape({
		calories: PropTypes.number.isRequired,
		carbohydrates: PropTypes.number.isRequired,
		fat: PropTypes.number.isRequired,
		image: PropTypes.string,
		image_large: PropTypes.string.isRequired,
		image_mobile: PropTypes.string,
		name: PropTypes.string.isRequired,
		price: PropTypes.number,
		proteins: PropTypes.number.isRequired,
		type: PropTypes.oneOf(['bun', 'sauce', 'main']),
		__v: PropTypes.number,
		_id: PropTypes.string
	}),
	orderID: PropTypes.oneOfType([
		PropTypes.number.isRequired,
		PropTypes.string.isRequired
	])
};

export default Modal;