import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
	query getRepos(
		$orderBy: AllRepositoriesOrderBy!
		$orderDirection: OrderDirection!
		$searchKeyword: String!
	) {
		repositories(
			orderBy: $orderBy
			orderDirection: $orderDirection
			searchKeyword: $searchKeyword
		) {
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

export const GET_SINGLE_REPOSITORY = gql`
	query getRepository($repoID: ID!) {
		repository(id: $repoID) {
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
			url
			reviews {
				edges {
					node {
						id
						text
						rating
						createdAt
						user {
							id
							username
						}
					}
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
