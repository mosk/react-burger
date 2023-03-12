import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './sign-in.module.css';

export const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

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
					<p className="text text_type_main-medium mb-6">Вход</p>
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
						Войти
					</Button>
				</form>
				<p className="text text_type_main-default text_color_inactive mb-1">
					Вы — новый пользователь? <Link to='/register' className={`text text_type_main-default ${styles.link}`}>Зарегистрироваться</Link>
				</p>
				<p className="text text_type_main-default text_color_inactive">
					Забыли пароль? <Link to='/forgot-password' className={`text text_type_main-default ${styles.link}`}>Восстановить пароль</Link>
				</p>
			</div>
		</div>
	);
}; 