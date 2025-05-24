import type { Routes } from "@angular/router";

export const routes: Routes = [
	{
		path: "",
		loadComponent: async () => {
			const m = await import("@core/component/layout.component");
			return m.LayoutComponent;
		},
		children: [
			{
				path: "",
				loadChildren: async () => {
					const m = await import("@feature/article/article.routes");
					return m.articleRoutes;
				},
			},
		],
	},
	{
		path: "authentication",
		loadChildren: async () => {
			const m = await import("@feature/authentication/authentication.routes");
			return m.authenticationRoutes;
		},
	},
	{
		path: "not-found",
		loadComponent: async () => {
			const m = await import("@core/component/not-found.component");
			return m.NotFoundComponent;
		},
	},
	{ path: "**", redirectTo: "/not-found" },
];
