import React from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Pressable,
} from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import Text from "./Text";
import { Link } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";
import useSignOut from "../hooks/useSignout";
import { enableExpoCliLogging } from "expo/build/logs/Logs";

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

const FunctionTab = ({ tabName, onPressFunc }) => {
	const tabStyle = styles.tab;
	const tabTextStyle = styles.tabText;

	return (
		<Pressable onPress={onPressFunc}>
			<View style={tabStyle} component={TouchableOpacity}>
				<Text style={tabTextStyle} fontSize="subheading">
					{tabName}
				</Text>
			</View>
		</Pressable>
	);
};

//tab w/ text repositories
//tab is pressable

const AppBar = () => {
	const { data, loading } = useQuery(GET_USER);
	const [signOut] = useSignOut();
	if (loading) {
		return (
			<View>
				<Text>loading...</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<AppBarTab tabName="Repositories" destination="/"></AppBarTab>
				{data.authorizedUser === null ? (
					<AppBarTab tabName="Sign In" destination="/signin"></AppBarTab>
				) : (
					<FunctionTab tabName="Sign Out" onPressFunc={signOut}></FunctionTab>
				)}
			</ScrollView>
		</View>
	);
};

export default AppBar;
