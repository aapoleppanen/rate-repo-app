import { gql } from "@apollo/client";

export const SIGN_IN = gql`
	mutation SignIn($username: String!, $password: String!) {
		authorize(credentials: { username: $username, password: $password }) {
			accessToken
		}
	}
`;

export const CREATE_REVIEW = gql`
	mutation makeReview(
		$username: String!
		$name: String!
		$rating: Int!
		$review: String
	) {
		createReview(
			review: {
				ownerName: $username
				repositoryName: $name
				rating: $rating
				text: $review
			}
		) {
			repositoryId
		}
	}
`;

export const SIGN_UP = gql`
	mutation createAUser($username: String!, $password: String!) {
		createUser(user: { username: $username, password: $password }) {
			id
			username
			createdAt
		}
	}
`;
