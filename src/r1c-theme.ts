import { definePreset } from "@primeng/themes";
import Aura from "@primeng/themes/aura";
import type { AuraBaseDesignTokens } from "@primeng/themes/aura/base";
import type { ComponentsDesignTokens, Preset } from "@primeng/themes/types";

export const R1CTheme: Preset<AuraBaseDesignTokens> = definePreset(Aura, {
	options: {
		prefix: "rc",
		//darkModeSelector: ".r1c-dark",
		darkModeSelector: false || "none",
		cssLayer: {
			name: "primeng",
			order: "theme, base, primeng",
		},
	},
	primitive: {
		teal: {
			"50": "#f2fafa",
			"100": "#c2e6e6",
			"200": "#91d1d1",
			"300": "#61bdbd",
			"400": "#30a9a9",
			"500": "#009595", //main
			"600": "#007f7f",
			"700": "#007070",
			"800": "#005252",
			"900": "#004a4a",
			"950": "#002525",
		},
		red: {
			"50": "#fdf4f4",
			"100": "#f5c9c9",
			"200": "#ed9e9f",
			"300": "#e67475",
			"400": "#de494a",
			"500": "#d61e20", //main
			"600": "#b61a1b",
			"700": "#961516",
			"800": "#761112",
			"900": "#560c0d",
			"950": "#360808",
		},
		green: {
			"50": "#f3fbf6",
			"100": "#c7edd4",
			"200": "#9bdeb1",
			"300": "#6fcf8f",
			"400": "#43c16c",
			"500": "#17b24a", //main
			"600": "#14973f",
			"700": "#107d34",
			"800": "#0d6229",
			"900": "#09471e",
			"950": "#062d13",
		},
	},
	semantic: {
		primary: {
			50: "{teal.50}",
			100: "{teal.100}",
			200: "{teal.200}",
			300: "{teal.300}",
			400: "{teal.400}",
			500: "{teal.500}",
			600: "{teal.600}",
			700: "{teal.700}",
			800: "{teal.800}",
			900: "{teal.900}",
			950: "{teal.950}",
		},
		colorScheme: {
			light: {
				primary: {
					color: "{teal.500}",
					inverseColor: "{teal.50}",
					hoverColor: "{teal.700}",
					activeColor: "{teal.900}",
				},
				highlight: {
					background: "{teal.900}",
					focusBackground: "{teal.800}",
					color: "#ffffff",
					focusColor: "#ffffff",
				},
				surface: {
					0: "#ffffff",
					50: "#f0f0f0",
					100: "{zinc.100}",
					200: "{zinc.200}",
					300: "{zinc.300}",
					400: "{zinc.400}",
					500: "{zinc.500}",
					600: "{zinc.600}",
					700: "{zinc.700}",
					800: "{zinc.800}",
					900: "#333333",
					950: "{zinc.950}",
				},
				formField: {
					hoverBorderColor: "{primary.color}",
					invalidBorderColor: "{red.500}",
					invalidPlaceholderColor: "{red.500}",
					borderColor: "#CCCCCC",
					disabledColor: "#CCCCCC",
					placeholderColor: "#7F7F7F",
					background: "#ffffff",
					filledBackground: "#ffffff",
					color: "#333333",
				},
			},
		},
		formField: {
			borderRadius: "8px",
			paddingY: "0.758rem",
		},
	},
} as AuraBaseDesignTokens);

export const simpleMessageDt: ComponentsDesignTokens["message"] = {
	error: { simple: { color: "{red.500}" } },
};
