import { useQuery } from "@apollo/client";

import { GET_USER } from "../graphql/queries";

const useUsersReviews = (includeReviews) => {
	const { data, error, loading, refetch } = useQuery(GET_USER, {
		variables: {
			includeReviews,
		},
		fetchPolicy: "cache-and-network",
	});

	return {
		reviews: data?.authorizedUser.reviews,
		loading,
		error,
		refetch,
	};
};

export default useUsersReviews;
