import { type EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from "@angular/core";

export const BASE_URL = new InjectionToken<string>("BASE_URL");

export const provideApplicationBaseUrl = (baseUrl: string): EnvironmentProviders =>
	makeEnvironmentProviders([{ provide: BASE_URL, useValue: baseUrl }]);
