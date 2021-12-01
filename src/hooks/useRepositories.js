import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
	const { data, error, loading, refetch, fetchMore } = useQuery(
		GET_REPOSITORIES,
		{
			variables: {
				...variables,
			},
			fetchPolicy: "cache-and-network",
		}
	);

	const handleFetchMore = (variables) => {
		const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

		if (!canFetchMore) {
			return;
		}

		fetchMore({
			variables: {
				after: data.repositories.pageInfo.endCursor,
				...variables,
			},
		});
	};

	return {
		repositories: data?.repositories,
		loading,
		error,
		refetch,
		fetchMore: handleFetchMore,
	};
};

export default useRepositories;
