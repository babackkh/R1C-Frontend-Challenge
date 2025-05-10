import type { Routes } from "@angular/router";

export const articleRoutes: Routes = [
	{
		path: "",
		loadComponent: async () => {
			const m = await import("./container/article-shell/article-shell.component");
			return m.ArticleShellComponent;
		},
		children: [
			{ path: "", pathMatch: "full", redirectTo: "all" },
			{
				path: "all",
				loadComponent: async () => {
					const m = await import("./container/all-articles-container/all-articles-container.component");
					return m.AllArticlesContainerComponent;
				},
			},
			{
				path: "new",
				loadComponent: async () => {
					const m = await import("./container/new-article-container/new-article-container.component");
					return m.NewArticleContainerComponent;
				},
			},
		],
	},
];
