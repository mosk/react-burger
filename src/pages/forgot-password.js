import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './forgot-password.module.css';

import { request } from '../utils/burger-api';

export const ForgotPassword = () => {
	const [form, setForm] = useState({ email: '' });

	const emailRef = useRef(null);

	const onChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const restore = useCallback(
		(e) => {
			e.preventDefault();

			request('password-reset', {
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
					"email": form.email
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
						type={'email'}
						placeholder={'Укажите e-mail'}
						onChange={e => onChange(e)}
						value={form.email}
						name={'email'}
						error={false}
						ref={emailRef}
						errorText={'Ошибка'}
						size={'default'}
						required={true}
						extraClass="mb-6"
					/>
					<Button htmlType="button" type="primary" size="large" onClick={e => restore(e)}>
						Восстановить
					</Button>
				</form>
				<p className="text text_type_main-default text_color_inactive mb-1">
					Вспомнили пароль? <Link to='/login' className={`text text_type_main-default ${styles.link}`}>Войти</Link>
				</p>
			</div>
		</div>
	);
}; 