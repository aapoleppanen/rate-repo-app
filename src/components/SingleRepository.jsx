import React from "react";
import RepoListItem from "./RepositoryItem";
import useSingleRepo from "../hooks/useSingleRepo";
import { useParams } from "react-router-native";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { styles } from "./RepositoryItem";
import theme from "../theme";

export const rStyle = StyleSheet.create({
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
});

const RepositoryInfo = ({ repo }) => {
	if (typeof repo == "undefined") {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	} else {
		return <RepoListItem item={repo}></RepoListItem>;
	}
};

const formatDate = (date) => {
	return `${date.substring(8, 10)}-${date.substring(5, 7)}-${date.substring(
		0,
		4
	)}`;
};

const SingleReview = ({ review }) => {
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
		</View>
	);
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepoView = () => {
	const { id } = useParams();

	const { repo, fetchMore } = useSingleRepo(id);

	const reviews = repo ? repo.reviews.edges.map((edge) => edge.node) : [];

	const onEndReach = () => {
		fetchMore();
	};

	return (
		<FlatList
			data={reviews}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => <SingleReview review={item} />}
			keyExtractor={(item) => item.id}
			ListHeaderComponent={() => <RepositoryInfo repo={repo} />}
			ListHeaderComponentStyle={{ marginBottom: 10 }}
			onEndReachedThreshold={0.5}
			onEndReached={onEndReach}
		/>
	);
};

export default SingleRepoView;
