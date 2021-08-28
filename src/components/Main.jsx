import React from "react";
import { StyleSheet, View } from "react-native";
import { Redirect, Route, Switch } from "react-router-native";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		flexShrink: 1,
		backgroundColor: "#e1e4e8",
	},
});

//todo
// flatlist : w/ repo full name, description, language, number of forks
// number of stars, rating average, number of reviews

const Main = () => {
	return (
		<View style={styles.container}>
			<AppBar></AppBar>
			<Switch>
				<Route path="/signin">
					<SignIn></SignIn>
				</Route>
				<Route path="/">
					<RepositoryList></RepositoryList>
				</Route>
				<Redirect to="/"></Redirect>
			</Switch>
		</View>
	);
};

export default Main;
