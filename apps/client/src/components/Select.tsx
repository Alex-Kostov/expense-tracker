import React from "react";

interface SelectProps {
	children: React.ReactNode;
	[key: string]: any;
}

const Select = ({children, ...props}: SelectProps) => {
	return (
		<select {...props}>
			{children}
		</select>
	);
};

export default Select;