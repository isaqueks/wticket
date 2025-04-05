import React from "react";
import Typography from "@mui/joy/Typography";

export default function Title(props) {
	return (
		<Typography variant="h5" color="primary" gutterBottom>
			{props.children}
		</Typography>
	);
}
