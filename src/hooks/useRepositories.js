import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
	const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
		fetchPolicy: "cache-and-network",
	});
	const [repositories, setRepositories] = useState();

	useEffect(() => {
		try {
			setRepositories(data.repositories);
		} catch (e) {
			// console.log(e, error);
		}
	}, [loading]);

	return { repositories, loading, error, refetch };
};

export default useRepositories;
