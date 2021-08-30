import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
	query {
		repositories {
			edges {
				node {
					name
					ownerAvatarUrl
					fullName
					description
					language
					forksCount
					stargazersCount
					ratingAverage
					reviewCount
					id
				}
			}
		}
	}
`;

export const GET_USER = gql`
	query {
		authorizedUser {
			id
			username
		}
	}
`;
