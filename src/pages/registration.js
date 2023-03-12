import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './registration.module.css';

export const Registration = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const nameRef = useRef(null);
	const emailRef = useRef(null);
	const passwordRef = useRef(null);

	const showPassword = (e) => {
		e.preventDefault();
		console.log(e.target);
		e.target.type = 'text';
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<form className={styles.form}>
					<p className="text text_type_main-medium mb-6">Регистрация</p>
					<Input
						type={'text'}
						placeholder={'Имя'}
						onChange={e => setName(e.target.value)}
						value={name}
						name={'name'}
						error={false}
						ref={nameRef}
						errorText={'Ошибка'}
						size={'default'}
						extraClass="mb-6"
					/>
					<Input
						type={'email'}
						placeholder={'E-mail'}
						onChange={e => setEmail(e.target.value)}
						value={email}
						name={'email'}
						error={false}
						ref={emailRef}
						errorText={'Ошибка'}
						size={'default'}
						extraClass="mb-6"
					/>
					<Input
						type={'password'}
						placeholder={'Пароль'}
						onChange={e => setPassword(e.target.value)}
						icon={'ShowIcon'}
						value={password}
						name={'password'}
						error={false}
						ref={passwordRef}
						onIconClick={e => showPassword(e)}
						errorText={'Ошибка'}
						size={'default'}
						extraClass="mb-6"
					/>
					<Button htmlType="button" type="primary" size="large">
						Зарегистрироваться
					</Button>
				</form>
				<p className="text text_type_main-default text_color_inactive">
					Уже зарегистрированы? <Link to='/login' className={`text text_type_main-default ${styles.link}`}>Войти</Link>
				</p>
			</div>
		</div>
	);
}; 