import { Formik } from "formik";
import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import * as yup from "yup";
import useSignIn from "../hooks/useSignin";
import theme from "../theme";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import { useHistory } from "react-router-native";

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
					testID="username"
				></FormikTextInput>
				<FormikTextInput
					name="password"
					label="Password"
					secureTextEntry={true}
					style={styles.input}
					testID="password"
				></FormikTextInput>
				<Pressable
					style={styles.button}
					onPress={onSubmit}
					testID="submitButton"
				>
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

export const SignInFormContainer = ({ onSubmit }) => {
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

const SignIn = () => {
	const [signIn] = useSignIn();
	const history = useHistory();

	const onSubmit = async (values) => {
		const { username, password } = values;

		try {
			const { data } = await signIn({ username, password });
			console.log(data);
			history.push("/");
		} catch (e) {
			console.log(e);
		}
	};

	return <SignInFormContainer onSubmit={onSubmit}></SignInFormContainer>;
};

export default SignIn;
