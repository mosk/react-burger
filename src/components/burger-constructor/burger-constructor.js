import styles from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const BurgerConstructor = ({data}) => {
	return (
		<section className="ml-5 mr-5">
			<h2 className="mt-10 mb-5 text text_type_main-large visually-hidden">
				Состав бургера
			</h2>
			<ul className={`${styles.list} mb-6 pt-25 pl-1 pr-1`}>
				{	
					data.map((item, i) => i === 0 ? 
						<li className={`${styles.list__item} ml-3 mr-3 mb-4`}>
							<ConstructorElement 
								isLocked={true}
								type="top"	
								text={item.name}
								price={item.price}
								thumbnail={item.image}
							/>
						</li>
						: i === (data.length - 1) ? 
						<li className={`${styles.list__item} ml-3 mr-3 mb-4`}>
							<ConstructorElement 
								type="bottom"
								text={item.name}
								price={item.price}
								thumbnail={item.image}
							/>
						</li> 
						: 
						<li className={`${styles.list__item} ml-3 mr-3 mb-4`}>
							<ConstructorElement 
								text={item.name}
								price={item.price}
								thumbnail={item.image}
							/>
						</li>
					)
				}
			</ul>
			<div className={styles.order}>
				<p className={`${styles.price} mr-10`}>
					<span className="text text_type_digits-default">999999&nbsp;</span>
					<CurrencyIcon type="primary" />
				</p>
				<Button htmlType="button" type="primary" size="large">
					Оформить заказ
				</Button>
			</div>
		</section>
	);
}

export default BurgerConstructor;