import React from "react";
import { Formik } from "formik";
import { ScrollView, StyleSheet, View, Pressable } from "react-native";
import * as yup from "yup";
import theme from "../theme";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import { useHistory } from "react-router";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignin";

const styles = StyleSheet.create({
	container: {
		padding: 10,
		backgroundColor: theme.colors.white,
	},
	input: {
		margin: 5,
	},
	button: {
		backgroundColor: theme.colors.primary,
		padding: 15,
		margin: 5,
		borderRadius: 5,
	},
});

const validationSchema = yup.object().shape({
	username: yup.string().required("Username is required"),
	password: yup.string().required("Password is required"),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref("password"), null], "Passwords must match")
		.required("Password confirmation is required"),
});

const initialValues = {
	username: "",
	password: "",
	passwordConfirmation: "",
};

const SignUpForm = ({ onSubmit }) => {
	return (
		<View styles={styles.container}>
			<ScrollView
				keyboardShouldPersistTaps="handled"
				scrollEnabled={false}
				contentContainerStyle={styles.container}
			>
				<FormikTextInput
					name="username"
					label="Username"
					style={styles.input}
					testId="username"
				></FormikTextInput>
				<FormikTextInput
					name="password"
					label="Password"
					secureTextEntry={true}
					style={styles.input}
				></FormikTextInput>
				<FormikTextInput
					name="passwordConfirmation"
					label="password Confirmation"
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
						Sign Up
					</Text>
				</Pressable>
			</ScrollView>
		</View>
	);
};

export const SignUpFormContainer = ({ onSubmit }) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

const SignUp = () => {
	const [signUp] = useSignUp();
	const [signIn] = useSignIn();
	const history = useHistory();

	const onSubmit = async (values) => {
		const { username, password } = values;

		try {
			const { data1 } = await signUp({ username, password });
			const { data2 } = await signIn({ username, password });
			console.log(data1);
			console.log(data2);
			history.push("/");
		} catch (e) {
			console.log(e);
		}
	};

	return <SignUpFormContainer onSubmit={onSubmit}></SignUpFormContainer>;
};

export default SignUp;
