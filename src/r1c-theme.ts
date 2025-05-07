import { definePreset } from "@primeng/themes";
import Aura from "@primeng/themes/aura";
import type { AuraBaseDesignTokens } from "@primeng/themes/aura/base";
import type { Preset } from "@primeng/themes/types";

const R1CTheme: Preset<AuraBaseDesignTokens> = definePreset(Aura, {
	options: {
		prefix: "rc",
		darkModeSelector: ".r1c-dark",
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
					50: "{zinc.50}",
					100: "{zinc.100}",
					200: "{zinc.200}",
					300: "{zinc.300}",
					400: "{zinc.400}",
					500: "{zinc.500}",
					600: "{zinc.600}",
					700: "{zinc.700}",
					800: "{zinc.800}",
					900: "{zinc.900}",
					950: "{zinc.950}",
				},
				formField: {
					hoverBorderColor: "{primary.color}",
				},
			},
			dark: {
				primary: {
					color: "{teal.500}",
					inverseColor: "{teal.950}",
					hoverColor: "{teal.700}",
					activeColor: "{teal.600}",
				},
				highlight: {
					background: "rgba(250, 250, 250, .16)",
					focusBackground: "rgba(250, 250, 250, .24)",
					color: "rgba(255,255,255,.87)",
					focusColor: "rgba(255,255,255,.87)",
				},
				surface: {
					0: "#ffffff",
					50: "{slate.50}",
					100: "{slate.100}",
					200: "{slate.200}",
					300: "{slate.300}",
					400: "{slate.400}",
					500: "{slate.500}",
					600: "{slate.600}",
					700: "{slate.700}",
					800: "{slate.800}",
					900: "{slate.900}",
					950: "{slate.950}",
				},
				formField: {
					hoverBorderColor: "{primary.color}",
				},
			},
		},
		focusRing: {
			width: "1px",
			style: "solid",
			color: "{primary.color}",
			offset: "1px",
		},
	},
	components: {
		button: {
			colorScheme: {
				light: {
					root: {
						primary: {
							background: "{primary.color}",
							hoverBackground: "{primary.hover.color}",
							activeBackground: "{primary.active.color}",
							borderColor: "{primary.color}",
							hoverBorderColor: "{primary.hover.color}",
							activeBorderColor: "{primary.active.color}",
							color: "{highlight.color}",
							hoverColor: "{highlight.color}",
							activeColor: "{primary.contrast.color}",
							focusRing: {
								color: "{primary.color}",
								shadow: "none",
							},
						},
						secondary: {},
					},
				},
				dark: {
					root: {
						primary: {
							background: "{primary.color}",
							hoverBackground: "{primary.hover.color}",
							activeBackground: "{primary.active.color}",
							borderColor: "{primary.color}",
							hoverBorderColor: "{primary.hover.color}",
							activeBorderColor: "{primary.active.color}",
							color: "{highlight.color}",
							hoverColor: "{highlight.color}",
							activeColor: "{primary.contrast.color}",
							focusRing: {
								color: "{primary.color}",

								shadow: "none",
							},
						},
						secondary: {},
					},
				},
			},
		},
	},
} as AuraBaseDesignTokens);

export default R1CTheme;
