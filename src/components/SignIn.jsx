import { Formik } from "formik";
import React from "react";
import { Pressable, View, StyleSheet, ScrollView, Image } from "react-native";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";
import * as yup from "yup";

const styles = StyleSheet.create({
	container: {
		padding: 10,
		backgroundColor: theme.colors.white,
		flex: 1,
	},
	scrollViewStyle: {
		flex: 1,
		justifyContent: "flex-start",
	},
	button: {
		backgroundColor: theme.colors.primary,
		padding: 15,
		margin: 5,
		borderRadius: 5,
	},
	input: {
		margin: 5,
	},
	logoImg: {
		width: 100,
		height: 100,
		alignSelf: "center",
	},
	// ...
});

//validationschema
//username & password: required

const validationSchema = yup.object().shape({
	username: yup.string().required("Username is required"),
	password: yup.string().required("Password is required"),
});

const initialValues = {
	username: "",
	password: "",
};

const SignInForm = ({ onSubmit }) => {
	return (
		<View style={styles.container}>
			<ScrollView
				keyboardShouldPersistTaps="handled"
				scrollEnabled={false}
				contentContainerStyle={styles.scrollViewStyle}
			>
				<Image
					style={styles.logoImg}
					source={{
						uri: "https://www.influxdata.com/wp-content/uploads/GitHub-logo.jpg",
					}}
				></Image>
				<FormikTextInput
					name="username"
					label="Username"
					style={styles.input}
				></FormikTextInput>
				<FormikTextInput
					name="password"
					label="Password"
					secureTextEntry={true}
					style={styles.input}
				></FormikTextInput>
				<Pressable style={styles.button} onPress={onSubmit}>
					<Text
						style={{
							color: theme.colors.white,
							textAlign: "center",
						}}
					>
						Sign In
					</Text>
				</Pressable>
			</ScrollView>
		</View>
	);
};

const SignIn = () => {
	const onSubmit = (values) => {
		console.log(values);
	};
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

export default SignIn;
