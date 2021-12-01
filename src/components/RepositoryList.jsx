import React from "react";
import { FlatList, StyleSheet, View, TouchableOpacity } from "react-native";
import { Menu, Provider, Button, Searchbar } from "react-native-paper";
import useRepositories from "../hooks/useRepositories";
import RepoListItem from "./RepositoryItem";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-native";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
	menuHeader: {
		zIndex: 5,
	},
	menu: {
		marginTop: -50,
	},
	menuContainer: {
		padding: 15,
		flexDirection: "column",
		justifyContent: "center",
		alignContent: "center",
	},
	searchBar: {
		marginBottom: 15,
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
	const { repositories, loading, refetch, fetchMore } = useRepositories({
		orderBy: sort == 1 ? "CREATED_AT" : "RATING_AVERAGE",
		orderDirection: sort == 3 ? "ASC" : "DESC",
		first: 8,
	});
	const [sort, setSort] = useState(1);
	const [sortText, setSortText] = useState("Latest repositories");
	const [search, setSearch] = useState("");
	const [debouncedSearch] = useDebounce(search, 500);
	const [repos, setRepositories] = useState();
	const [visible, setVisible] = useState(false);
	const history = useHistory();

	const onEndReach = () => {
		fetchMore({
			orderBy: sort == 1 ? "CREATED_AT" : "RATING_AVERAGE",
			orderDirection: sort == 3 ? "ASC" : "DESC",
			first: 8,
		});
	};

	useEffect(() => {
		if (loading == false && repositories) {
			setRepositories(repositories);
		}
	}, [loading, repositories]);

	useEffect(() => {
		refetch({
			orderBy: sort == 1 ? "CREATED_AT" : "RATING_AVERAGE",
			orderDirection: sort == 3 ? "ASC" : "DESC",
			searchKeyword: debouncedSearch,
			first: 8,
		});
		switch (sort) {
			case 1:
				setSortText("Latest repositories");
				break;
			case 2:
				setSortText("Highest rated repositories");
				break;
			case 3:
				setSortText("Lowest rated repositories");
				break;
			default:
				setSortText("Error");
		}
	}, [sort, debouncedSearch]);

	return (
		<RepositoryListContainer
			repositories={repos}
			testId="repoList"
			setSearch={setSearch}
			setSort={setSort}
			search={search}
			sortText={sortText}
			setVisible={setVisible}
			visible={visible}
			history={history}
			onEndReach={onEndReach}
		></RepositoryListContainer>
	);
};

class RepositoryListContainer extends React.Component {
	renderHeader = () => {
		const props = this.props;

		return (
			<>
				<Provider>
					<View style={styles.menuContainer}>
						<View style={styles.searchBar}>
							<Searchbar
								placeholder="search..."
								onChangeText={(query) => props.setSearch(query)}
								value={props.search}
							></Searchbar>
						</View>
						<Menu
							visible={props.visible}
							onDismiss={() => props.setVisible(false)}
							anchor={
								<Button onPress={() => props.setVisible(true)}>
									{props.sortText}
								</Button>
							}
							style={styles.menu}
						>
							<Menu.Item
								onPress={() => props.setSort(1)}
								title="Latest repositories"
							></Menu.Item>
							<Menu.Item
								onPress={() => props.setSort(2)}
								title="Highest rated repositories"
							></Menu.Item>
							<Menu.Item
								onPress={() => props.setSort(3)}
								title="Lowest rated repositories"
							></Menu.Item>
						</Menu>
					</View>
				</Provider>
			</>
		);
	};

	render() {
		const props = this.props;

		const repositoryNodes = props.repositories
			? props.repositories.edges.map((edge) => edge.node)
			: [];

		const TouchableRepositoryItem = ({ item }) => {
			const onPress = () => {
				props.history.push(`/repo/${item.id}`);
			};

			return (
				<TouchableOpacity onPress={onPress}>
					<RepoListItem item={item} />
				</TouchableOpacity>
			);
		};

		return (
			<FlatList
				data={repositoryNodes}
				ItemSeparatorComponent={ItemSeparator}
				renderItem={TouchableRepositoryItem}
				keyExtractor={(item) => item.id}
				ListHeaderComponent={this.renderHeader}
				ListHeaderComponentStyle={styles.menuHeader}
				onEndReached={props.onEndReach}
				onEndReachedThreshold={0.5}
			/>
		);
	}
}

export default RepositoryList;
