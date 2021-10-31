import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { SignInFormContainer } from "../components/SignIn";

describe("Sign-in", () => {
	describe("sign-in container", () => {
		it("onSubmit function has the correct arguments when called from the form", async () => {
			const onSubmit = jest.fn();
			const { getByTestId } = render(
				<SignInFormContainer onSubmit={onSubmit}></SignInFormContainer>
			);

			fireEvent.changeText(getByTestId("username"), "aapo");
			fireEvent.changeText(getByTestId("password"), "salasana");
			fireEvent.press(getByTestId("submitButton"));

			await waitFor(() => {
				expect(onSubmit).toHaveBeenCalledTimes(1);
				expect(onSubmit.mock.calls[0][0]).toEqual({
					username: "aapo",
					password: "salasana",
				});
			});
		});
	});
});
