import { useQuery } from "@apollo/client";

import { GET_SINGLE_REPOSITORY } from "../graphql/queries";

const useSingleRepo = (repoID) => {
	const { data, error, loading, refetch, fetchMore } = useQuery(
		GET_SINGLE_REPOSITORY,
		{
			variables: { repoID, first: 5 },
			fetchPolicy: "cache-and-network",
		}
	);

	const handleFetchMore = () => {
		const canFetchMore =
			!loading && data?.repository.reviews.pageInfo.hasNextPage;

		if (!canFetchMore) {
			return;
		}

		fetchMore({
			variables: {
				after: data.repository.reviews.pageInfo.endCursor,
				repoID,
				first: 8,
			},
		});
	};

	return {
		repo: data?.repository,
		loading,
		error,
		refetch,
		fetchMore: handleFetchMore,
	};
};

export default useSingleRepo;
