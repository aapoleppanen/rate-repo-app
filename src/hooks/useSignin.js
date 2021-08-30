import { useMutation } from "@apollo/client";

import { SIGN_IN } from "../graphql/mutations";

import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";
//credentials of type AuthorizeInput = { username, password}
//hook return value, [sigin, result]  -> result is the mutation result
//sign in is a function which runs the mutation with the values

const useSignIn = () => {
	const authStorage = useAuthStorage();
	const client = useApolloClient();
	const [mutate, result] = useMutation(SIGN_IN);

	const signIn = async ({ username, password }) => {
		const { data } = await mutate({ variables: { username, password } });
		await authStorage.setAccessToken(data.authorize.accessToken);
		client.resetStore();
		return result;
	};

	return [signIn, result];
};

export default useSignIn;
