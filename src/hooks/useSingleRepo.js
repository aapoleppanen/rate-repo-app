import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_SINGLE_REPOSITORY } from "../graphql/queries";

const useSingleRepo = (repoID) => {
	const { data, error, loading, refetch } = useQuery(GET_SINGLE_REPOSITORY, {
		variables: { repoID },
		fetchPolicy: "cache-and-network",
	});
	const [repo, setRepo] = useState();

	useEffect(() => {
		try {
			setRepo(data.repository);
		} catch (e) {
			//console.log(e, error, "errorishere");
		}
	}, [loading]);

	return { repo, loading, error, refetch };
};

export default useSingleRepo;
