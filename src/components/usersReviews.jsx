import React from "react";
import {
	FlatList,
	View,
	Text,
	StyleSheet,
	Pressable,
	Alert,
} from "react-native";
import useUsersReviews from "../hooks/useUsersReviews";
import { styles } from "./RepositoryItem";
import theme from "../theme";
import { useHistory } from "react-router";
import useDeleteReview from "../hooks/useDeleteReview";

const rStyle = StyleSheet.create({
	reviewContainer: {
		display: "flex",
		flexDirection: "row",
	},
	ratingContainer: {
		borderRadius: 90,
		borderColor: theme.colors.primary,
		borderWidth: 5,
		padding: 10,
		marginBottom: theme.gaps.listGap,
	},
	ratingText: {
		color: theme.colors.primary,
		fontWeight: "bold",
		fontSize: 15,
	},
	dateText: {
		fontWeight: "300",
		marginBottom: 3,
		marginTop: 3,
	},
	userName: {
		fontWeight: "bold",
	},
	textContainer: {
		paddingLeft: 15,
		paddingRight: 15,
		textAlign: "left",
		display: "flex",
		flexDirection: "column",
		width: 0,
		flexGrow: 1,
	},
	reviewText: {
		flexWrap: "wrap",
	},
	separator: {
		height: 10,
	},
	buttonsContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
	},
	reviewButton: {
		backgroundColor: theme.colors.primary,
		padding: 10,
		borderRadius: 5,
		marginTop: 10,
		marginRight: 15,
	},
	buttonText: {
		color: theme.colors.white,
	},
});

const formatDate = (date) => {
	return `${date.substring(8, 10)}-${date.substring(5, 7)}-${date.substring(
		0,
		4
	)}`;
};

const ItemSeparator = () => <View style={styles.separator}></View>;

const SingleReview = ({ review, handleDelete }) => {
	const history = useHistory();

	return (
		<View style={styles.container} key={review.id}>
			<View style={rStyle.reviewContainer}>
				<View>
					<View style={rStyle.ratingContainer}>
						<Text style={rStyle.ratingText}>{review.rating}</Text>
					</View>
				</View>
				<View style={rStyle.textContainer}>
					<Text style={rStyle.userName}>{review.user.username}</Text>
					<Text style={rStyle.dateText}>{formatDate(review.createdAt)}</Text>
					<Text style={rStyle.reviewText}>{review.text}</Text>
				</View>
			</View>
			<View style={rStyle.buttonsContainer}>
				<Pressable
					style={rStyle.reviewButton}
					onPress={() => history.push(`/repo/${review.repositoryId}`)}
				>
					<Text style={rStyle.buttonText}>View repository</Text>
				</Pressable>
				<Pressable
					style={{
						...rStyle.reviewButton,
						backgroundColor: theme.colors.error,
					}}
					onPress={() => handleDelete(review.id)}
				>
					<Text style={rStyle.buttonText}>Delete review</Text>
				</Pressable>
			</View>
		</View>
	);
};

const UsersReviews = () => {
	const { reviews, refetch } = useUsersReviews(true);

	const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

	const [deleteReview] = useDeleteReview();

	const deleteFunction = async (id) => {
		try {
			await deleteReview({ id });
			refetch({ includeReviews: true });
		} catch (e) {
			console.log(e);
		}
	};

	const handleDelete = (id) => {
		Alert.alert(
			"Delete Review",
			"Are you sure you want to delete this review?",
			[
				{
					text: "Cancel",
					onPress: () => console.log("Cancel Pressed"),
				},
				{
					text: "Delete",
					onPress: () => {
						deleteFunction(id);
					},
				},
			]
		);
	};

	return (
		<>
			<FlatList
				data={reviewNodes}
				ItemSeparatorComponent={ItemSeparator}
				renderItem={({ item }) => (
					<SingleReview
						review={{ ...item }}
						handleDelete={handleDelete}
					></SingleReview>
				)}
				keyExtractor={(item) => item.id}
			></FlatList>
		</>
	);
};

export default UsersReviews;
