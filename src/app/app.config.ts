import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { type ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from "@angular/router";
import { R1CTheme } from "@theme";
import { providePrimeNG } from "primeng/config";
import { routes } from "./app.routes";
import { baseUrlInterceptor } from "./core/interceptors/base-url.interceptor";
import { provideApplicationBaseUrl } from "./core/providers/base-url.provider";

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideAnimationsAsync(),
		provideApplicationBaseUrl("https://api-3281216083-arvancloud-challenge.apps.ir-central1.arvancaas.ir/api"),
		provideHttpClient(withFetch(), withInterceptors([baseUrlInterceptor])),
		providePrimeNG({
			theme: {
				preset: R1CTheme,
				options: {
					darkModeSelector: false || "none",
				},
			},
		}),
		provideRouter(
			routes,
			withInMemoryScrolling({ anchorScrolling: "enabled", scrollPositionRestoration: "enabled" }),
			withEnabledBlockingInitialNavigation(),
		),
	],
};
