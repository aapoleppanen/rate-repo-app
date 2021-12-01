import { useMutation } from "@apollo/client";

import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
	const [mutate] = useMutation(DELETE_REVIEW);

	const deleteReview = async ({ id }) => {
		const { data } = await mutate({
			variables: { id },
		});
		console.log(data);
		return data;
	};
	return [deleteReview];
};

export default useDeleteReview;
