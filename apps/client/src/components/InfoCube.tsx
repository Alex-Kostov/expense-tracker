import React, {useState} from "react";
import InfoIcon from "@mui/icons-material/Info";

import "./InfoCube.scss";

interface InfoCubeProps {
	label: string;
	amount: number;
	infoText: string;
}

const InfoCube = ({label, amount, infoText}: InfoCubeProps) => {
	const [infoVisibility, setInfoVisibility] = useState(false);

	const handleMouseEnter = () => setInfoVisibility(true);
	const handleMouseLeave = () => setInfoVisibility(false);


	return (
		<div className="cube">
			<div className="label">
				<div>{label}</div>
				<div className="icon" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
					<InfoIcon/>
					{infoVisibility ? <p className="icon-text">{infoText}</p> : null}
				</div>
			</div>
			<div className="value">{amount} $</div>
		</div>
	);
};

export default InfoCube;