import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import Text from "./Text";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight + 10,
		backgroundColor: theme.colors.appBar,
		paddingBottom: 15,
		paddingLeft: 10,
		display: "flex",
		flexDirection: "row",
	},
	tab: {
		paddingBottom: 1,
		marginRight: 5,
	},
	tabText: {
		color: theme.colors.appBarText,
	},
	// ...
});

const AppBarTab = ({ tabName, destination }) => {
	const tabStyle = styles.tab;
	const tabTextStyle = styles.tabText;

	return (
		<Link to={destination} style={tabStyle} component={TouchableOpacity}>
			<Text style={tabTextStyle} fontSize="subheading">
				{tabName}
			</Text>
		</Link>
	);
};

//tab w/ text repositories
//tab is pressable

const AppBar = () => {
	return (
		<View style={styles.container}>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<AppBarTab tabName="Repositories" destination="/"></AppBarTab>
				<AppBarTab tabName="Sign In" destination="/signin"></AppBarTab>
			</ScrollView>
		</View>
	);
};

export default AppBar;
