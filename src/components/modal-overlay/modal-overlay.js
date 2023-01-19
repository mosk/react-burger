import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal-overlay.module.css';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("modals");

const ModalOverlay = (props) => {
	const { onClose } = props;
	const KEY_NAME_ESC = `Escape`;
	const KEY_EVENT_TYPE = `keyup`;

	const handleCloseModal = (e) => {
		onClose();
	}

	const handleEscKey = (e) => {
		if (e.key === KEY_NAME_ESC) {
			onClose();
		}
	}

	React.useEffect(() => {
		document.addEventListener(KEY_EVENT_TYPE, handleEscKey);
		
		return () => {
			document.removeEventListener(KEY_EVENT_TYPE, handleEscKey);
		};
	}, []);

	return ReactDOM.createPortal(
		<div className={`${styles.overlay}`} onClick={handleCloseModal}>
			<Modal onClose={onClose} {...props} />
		</div>,
		modalRoot
	);
};

// в этом компоненте использую только onClose – надо ли указывать остальное в PropTypes?
ModalOverlay.propTypes = {
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

export default ModalOverlay;