import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
	query getRepos(
		$orderBy: AllRepositoriesOrderBy!
		$orderDirection: OrderDirection!
		$searchKeyword: String
		$after: String
		$first: Int
	) {
		repositories(
			orderBy: $orderBy
			orderDirection: $orderDirection
			searchKeyword: $searchKeyword
			after: $after
			first: $first
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
			pageInfo {
				hasNextPage
				startCursor
				endCursor
			}
		}
	}
`;

export const GET_SINGLE_REPOSITORY = gql`
	query getRepository($repoID: ID!, $first: Int, $after: String) {
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
			reviews(first: $first, after: $after) {
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
				pageInfo {
					endCursor
					hasNextPage
				}
			}
		}
	}
`;

export const GET_USER = gql`
	query getAuthorizedUser($includeReviews: Boolean = false) {
		authorizedUser {
			id
			username
			reviews @include(if: $includeReviews) {
				edges {
					node {
						id
						text
						rating
						repositoryId
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
