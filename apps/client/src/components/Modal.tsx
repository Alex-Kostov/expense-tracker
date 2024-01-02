import React, {useEffect, useRef} from "react";
import {createPortal} from "react-dom";

interface ModalProps {
	children: React.ReactNode,
	open: boolean,
	onClose: () => void,
	className?: string,
}

const Modal = ({children, open, onClose, ...props}: ModalProps) => {
	const dialog = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const modal = dialog.current;

		if (open && modal) {
			modal.showModal();
		}

		return () => modal?.close();
	}, [open]);

	const modalContainer = document.getElementById("modal");
	if (!modalContainer) return null;

	return createPortal(
		<dialog ref={dialog} onClose={onClose} {...props}>
			{children}
		</dialog>,
		modalContainer
	);
};

export default Modal;