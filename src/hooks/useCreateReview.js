import { useMutation } from "@apollo/client";

import { CREATE_REVIEW } from "../graphql/mutations";

import { useApolloClient } from "@apollo/client";

const useCreateReview = () => {
	const client = useApolloClient();
	const [mutate, result] = useMutation(CREATE_REVIEW);

	const createReview = async ({ username, name, rating, review }) => {
		const { data } = await mutate({
			variables: { username, name, rating, review },
		});
		console.log(data, "usehook");
		client.resetStore();
		return data;
	};

	return [createReview, result];
};

export default useCreateReview;
