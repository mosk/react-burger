import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './reset-password.module.css';

import { request } from '../utils/burger-api';

export const ResetPassword = () => {
	const [form, setForm] = useState({ password: '', code: '' });

	const codeRef = useRef(null);
	const passwordRef = useRef(null);

	const onChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const showPassword = (e) => {
		e.preventDefault();
		console.log(e.target);
		e.target.type = 'text';
	};

	const save = useCallback(
		(e) => {
			e.preventDefault();

			request('auth/register', {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				},
				redirect: 'follow',
				referrerPolicy: 'no-referrer',
				body: JSON.stringify({
					"email": "miiixsc@yandex.ru",
					"password": "starcraft",
					"name": "Mosk"
				})
			}).then(res => console.log(res));

			request('password-reset/reset', {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				},
				redirect: 'follow',
				referrerPolicy: 'no-referrer',
				body: JSON.stringify({
					"password": form.password,
					"token": form.token
				})
			}).then(res => console.log(res));
		},
		[form]
	);

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<form className={styles.form}>
					<p className="text text_type_main-medium mb-6">Восстановление пароля</p>
					<Input
						type={'password'}
						placeholder={'Введите новый пароль'}
						onChange={e => onChange(e)}
						icon={'ShowIcon'}
						value={form.password}
						name={'password'}
						error={false}
						ref={passwordRef}
						onIconClick={e => showPassword(e)}
						errorText={'Ошибка'}
						size={'default'}
						extraClass="mb-6"
					/>
					<Input
						type={'text'}
						placeholder={'Введите код из письма'}
						onChange={e => onChange(e)}
						value={form.code}
						name={'code'}
						error={false}
						ref={codeRef}
						errorText={'Ошибка'}
						size={'default'}
						extraClass="mb-6"
					/>
					<Button htmlType="button" type="primary" size="large" onClick={e => save(e)}>
						Сохранить
					</Button>
				</form>
				<p className="text text_type_main-default text_color_inactive mb-1">
					Вспомнили пароль? <Link to='/login' className={`text text_type_main-default ${styles.link}`}>Войти</Link>
				</p>
			</div>
		</div>
	);
}; 