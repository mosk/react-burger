import styles from './burger-ingredients.module.css';
import Tabs from '../tabs/tabs';
import Ingredient from '../ingredient/ingredient';
import PropTypes from 'prop-types';

const BurgerIngredients = ({data}) => {
	return (
		<section className="ml-5 mr-5">
			<h1 className="mt-10 mb-5 text text_type_main-large">
				Соберите бургер
			</h1>
			<Tabs />
			<h2 className="mb-6 text text_type_main-medium">
				Булки
			</h2>
			<ul className={`${styles.list} pt-3 pl-1 pr-1`}>
				{	
					data.filter(item => item.type === 'bun').map(item => 
						<li className={`${styles.list__item} ml-3 mr-3 mb-10`}>
							<Ingredient data={item} key={item._id} />
						</li>
					)
				}
			</ul>

			<h2 className="mb-6 text text_type_main-medium">
				Соусы
			</h2>
			<ul className={`${styles.list} pt-3 pl-1 pr-1`}>
				{
					data.filter(item => item.type === 'sauce').map(item => 
						<li className={`${styles.list__item} ml-3 mr-3 mb-10`}>
							<Ingredient data={item} key={item._id} />
						</li>
					)
				}
			</ul>

			<h2 className="mb-6 text text_type_main-medium">
				Начинка
			</h2>
			<ul className={`${styles.list} pt-3 pl-1 pr-1`}>
				{
					data.filter(item => item.type === 'main').map(item => 
						<li className={`${styles.list__item} ml-3 mr-3 mb-10`}>
							<Ingredient data={item} key={item._id} />
						</li>
					)
				}
			</ul>
		</section>
	);
}

BurgerIngredients.propTypes = {
	data: PropTypes.array
};

export default BurgerIngredients;