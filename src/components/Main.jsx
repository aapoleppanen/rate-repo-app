import React from "react";
import { StyleSheet, View } from "react-native";
import { Redirect, Route, Switch } from "react-router-native";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import SingleRepoView from "./SingleRepository";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import CreateReview from "./reviewForm";
import UsersReviews from "./usersReviews";

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		flexShrink: 1,
		backgroundColor: "#e1e4e8",
	},
});

const Main = () => {
	return (
		<View style={styles.container}>
			<AppBar></AppBar>
			<Switch>
				<Route path="/repo/:id">
					<SingleRepoView></SingleRepoView>
				</Route>
				<Route path="/signin">
					<SignIn></SignIn>
				</Route>
				<Route path="/usersreviews">
					<UsersReviews></UsersReviews>
				</Route>
				<Route path="/createreview">
					<CreateReview></CreateReview>
				</Route>
				<Route path="/signup">
					<SignUp></SignUp>
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
