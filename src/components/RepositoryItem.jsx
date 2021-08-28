import React from "react";
import { View, StyleSheet, Image } from "react-native";
import theme from "../theme";
import Text, { SubHeading } from "./Text";

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
	container: {
		paddingTop: 15,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 15,
		backgroundColor: theme.colors.white,
	},
	avatarImg: {
		width: 50,
		height: 50,
		marginRight: 20,
		marginLeft: 10,
		borderRadius: 5,
	},
	containerTopHalf: {
		flexDirection: "row",
		display: "flex",
		marginBottom: 10,
	},
	containerTopHalfText: {
		display: "flex",
		flexDirection: "column",
		width: 0,
		flexGrow: 1,
	},
	descriptionText: {
		flexWrap: "wrap",
		marginBottom: theme.gaps.listGap,
	},
	languageText: {
		color: theme.colors.white,
		backgroundColor: theme.colors.primary,
		alignSelf: "flex-start",
		padding: 3,
		borderRadius: 5,
		overflow: "hidden",
	},
	headingText: {
		marginBottom: theme.gaps.listGap,
	},
	containerBottomhalf: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	bottomText: {
		textAlign: "center",
	},
	bottomText2: {
		textAlign: "center",
		lineHeight: 30,
	},
});

const NumberHandler = (num) => {
	return Math.abs(num) > 999
		? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
		: Math.sign(num) * Math.abs(num);
};

const RepoListItem = ({ item }) => (
	<View style={styles.container}>
		<View style={styles.containerTopHalf}>
			<Image
				style={styles.avatarImg}
				source={{ uri: item.ownerAvatarUrl }}
			></Image>
			<View style={styles.containerTopHalfText}>
				<SubHeading fontWeight="bold" style={styles.headingText}>
					{item.fullName}
				</SubHeading>
				<Text style={styles.descriptionText}>{item.description}</Text>
				<Text style={styles.languageText}>{item.language}</Text>
			</View>
		</View>

		<View style={styles.containerBottomhalf}>
			<Text style={styles.bottomText}>
				<Text style={styles.bottomText2} fontWeight="bold">
					{NumberHandler(item.forksCount)}
				</Text>
				{"\n"} Forks
			</Text>
			<Text style={styles.bottomText}>
				<Text style={styles.bottomText2} fontWeight="bold">
					{NumberHandler(item.stargazersCount)}
				</Text>
				{"\n"} Stars
			</Text>
			<Text style={styles.bottomText}>
				<Text style={styles.bottomText2} fontWeight="bold">
					{item.ratingAverage}
				</Text>
				{"\n"} Rating
			</Text>
			<Text style={styles.bottomText}>
				<Text style={styles.bottomText2} fontWeight="bold">
					{item.reviewCount}
				</Text>
				{"\n"} Reviews
			</Text>
		</View>
	</View>
);

export default RepoListItem;
