import React from "react";
import { StyleSheet } from "react-native";
import { TextInput as MaterialTextInput } from "react-native-paper";
import theme from "../theme";

const styles = StyleSheet.create({
	input: {},
});

const TextInput = ({ style, error, ...props }) => {
	const textInputStyle = [style, styles.input];

	return (
		<MaterialTextInput
			mode="outlined"
			theme={{
				colors: {
					primary: error ? theme.colors.error : theme.colors.primary,
					underlineColor: "transparent",
					placeholder: error ? theme.colors.error : "rgba(0,0,0,0.5)",
				},
			}}
			style={textInputStyle}
			{...props}
		/>
	);
};

export default TextInput;
