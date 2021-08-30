import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import useRepositories from "../hooks/useRepositories";
import RepoListItem from "./RepositoryItem";

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
	const { repositories } = useRepositories();

	const repositoryNodes = repositories
		? repositories.edges.map((edge) => edge.node)
		: [];

	return (
		<FlatList
			data={repositoryNodes}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={RepoListItem}
		/>
	);
};

export default RepositoryList;
