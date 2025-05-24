import type { Routes } from "@angular/router";

export const authenticationRoutes: Routes = [
	{
		path: "",
		loadComponent: async () => {
			const m = await import("./container/authentication-shell/authentication-shell.component");
			return m.AuthenticationShellComponent;
		},
		children: [
			{
				path: "sign-in",
				loadComponent: async () => {
					const m = await import("./container/sign-in-container/sign-in-container.component");
					return m.SignInContainerComponent;
				},
			},
			{
				path: "sign-up",
				loadComponent: async () => {
					const m = await import("./container/sign-up-container/sign-up-container.component");
					return m.SignUpContainerComponent;
				},
			},
			{ path: "", pathMatch: "full", redirectTo: "sign-in" },
		],
	},
];
