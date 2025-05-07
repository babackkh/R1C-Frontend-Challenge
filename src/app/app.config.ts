import { provideHttpClient, withFetch } from "@angular/common/http";
import { type ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from "@angular/router";
import { providePrimeNG } from "primeng/config";
import R1CTheme from "../r1c-theme";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideAnimationsAsync(),
		providePrimeNG({
			theme: {
				preset: R1CTheme,
			},
		}),
		provideHttpClient(withFetch()),
		provideRouter(
			routes,
			withInMemoryScrolling({ anchorScrolling: "enabled", scrollPositionRestoration: "enabled" }),
			withEnabledBlockingInitialNavigation(),
		),
	],
};
