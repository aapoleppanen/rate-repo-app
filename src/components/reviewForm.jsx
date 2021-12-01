import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import { useHistory } from "react-router-native";
import { View, ScrollView, Pressable, StyleSheet } from "react-native";
import useCreateReview from "../hooks/useCreateReview";
import theme from "../theme";

const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.white,
		flex: 1,
		padding: 10,
	},
	button: {
		backgroundColor: theme.colors.primary,
		padding: 15,
		margin: 5,
		borderRadius: 5,
	},
	buttonText: {
		color: theme.colors.white,
	},
});

const validationSchema = yup.object().shape({
	username: yup.string().required("username is required"),
	name: yup.string().required("name is required"),
	ratingString: yup.number().min(0).max(100).required(),
	review: yup.string(),
});

const initialValues = {
	username: "",
	name: "",
	ratingString: "",
	review: "",
};

const ReviewForm = ({ onSubmit }) => {
	return (
		<View style={styles.container}>
			<ScrollView keyboardShouldPersistTaps="handled" scrollEnabled={false}>
				<FormikTextInput
					name="username"
					label="Repository owner name"
				></FormikTextInput>
				<FormikTextInput name="name" label="Repository name"></FormikTextInput>
				<FormikTextInput
					name="ratingString"
					label="Rating between 0 and 100"
				></FormikTextInput>
				<FormikTextInput name="review" label="Review"></FormikTextInput>
				<Pressable onPress={onSubmit} style={styles.button}>
					<Text style={styles.buttonText}>Create a review</Text>
				</Pressable>
			</ScrollView>
		</View>
	);
};

const ReviewFormContainer = ({ onSubmit }) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

const CreateReview = () => {
	const [createReview] = useCreateReview();
	const history = useHistory();

	const onSubmit = async (values) => {
		const { username, name, ratingString, review } = values;

		const rating = parseInt(ratingString);

		try {
			const data = await createReview({
				username,
				name,
				rating,
				review,
			});
			console.log(data, "review revfo");
			history.push(`/repo/${data.createReview.repositoryId}`);
		} catch (e) {
			console.log(e, "error revfo");
		}
	};

	return <ReviewFormContainer onSubmit={onSubmit}></ReviewFormContainer>;
};

export default CreateReview;
