import { Platform } from "react-native";

const theme = {
	colors: {
		textPrimary: "#24292e",
		textSecondary: "#586069",
		primary: "#0366d6",
		appBar: "#24292e",
		appBarText: "#fff",
		white: "#fff",
		error: "#d73a4a",
	},
	fontSizes: {
		body: 14,
		subheading: 16,
	},
	fonts: {
		main: Platform.select({
			android: "Roboto",
			ios: "Arial",
			default: "system",
		}),
	},
	gaps: {
		listGap: 5,
	},
	fontWeights: {
		normal: "400",
		bold: "700",
	},
};

export default theme;
