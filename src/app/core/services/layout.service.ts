import { DOCUMENT } from "@angular/common";
import { Injectable, computed, effect, inject, signal } from "@angular/core";
import { Subject } from "rxjs";
import type { ILayoutConfig, ILayoutState, IMenuChangeEvent } from "../models/layout.model";

@Injectable({
	providedIn: "root",
})
export class LayoutService {
	readonly #document = inject(DOCUMENT);

	#initialized = false;

	#config: ILayoutConfig = {
		preset: "Aura",
		primary: "emerald",
		surface: null,
		darkTheme: false,
		menuMode: "static",
	};

	#state: ILayoutState = {
		staticMenuDesktopInactive: false,
		overlayMenuActive: false,
		configSidebarVisible: false,
		staticMenuMobileActive: false,
		menuHoverActive: false,
	};

	readonly #layoutConfig = signal<ILayoutConfig>(this.#config);
	readonly #layoutState = signal<ILayoutState>(this.#state);

	readonly #configUpdate = new Subject<ILayoutConfig>();
	readonly #overlayOpen = new Subject<null>();
	readonly #menuSource = new Subject<IMenuChangeEvent>();
	readonly #resetSource = new Subject();

	menuSource$ = this.#menuSource.asObservable();
	resetSource$ = this.#resetSource.asObservable();
	configUpdate$ = this.#configUpdate.asObservable();
	overlayOpen$ = this.#overlayOpen.asObservable();

	theme = computed(() => (this.#layoutConfig()?.darkTheme ? "light" : "dark"));
	layoutState = computed(() => this.#layoutState());
	isSidebarActive = computed(() => this.#layoutState().overlayMenuActive || this.#layoutState().staticMenuMobileActive);
	isDarkTheme = computed(() => this.#layoutConfig().darkTheme);
	getPrimary = computed(() => this.#layoutConfig().primary);
	getSurface = computed(() => this.#layoutConfig().surface);
	isOverlay = computed(() => this.#layoutConfig().menuMode === "overlay");
	isStatic = computed(() => this.#layoutConfig().menuMode === "static");
	transitionComplete = signal<boolean>(false);

	constructor() {
		effect(() => {
			const config = this.#layoutConfig();
			if (config) {
				this.onConfigUpdate();
			}
		});

		effect(() => {
			const config = this.#layoutConfig();

			if (!this.#initialized || !config) {
				this.#initialized = true;
				return;
			}

			this.handleDarkModeTransition(config);
		});
	}

	toggleDarkMode(config?: ILayoutConfig): void {
		const { darkTheme } = config || this.#layoutConfig();
		if (darkTheme) {
			this.#document.documentElement.classList.add("r1c-dark");
		} else {
			this.#document.documentElement.classList.remove("r1c-dark");
		}
	}

	private onTransitionEnd() {
		this.transitionComplete.set(true);
		setTimeout(() => {
			this.transitionComplete.set(false);
		});
	}

	onMenuToggle() {
		if (this.isOverlay()) {
			this.#layoutState.update((prev) => ({ ...prev, overlayMenuActive: !this.#layoutState().overlayMenuActive }));

			if (this.#layoutState().overlayMenuActive) {
				this.#overlayOpen.next(null);
			}
		}

		if (this.isDesktop()) {
			this.#layoutState.update((prev) => ({ ...prev, staticMenuDesktopInactive: !this.#layoutState().staticMenuDesktopInactive }));
		} else {
			this.#layoutState.update((prev) => ({ ...prev, staticMenuMobileActive: !this.#layoutState().staticMenuMobileActive }));

			if (this.#layoutState().staticMenuMobileActive) {
				this.#overlayOpen.next(null);
			}
		}
	}

	isDesktop() {
		return window.innerWidth > 991;
	}

	isMobile() {
		return !this.isDesktop();
	}

	onConfigUpdate() {
		this.#config = { ...this.#layoutConfig() };
		this.#configUpdate.next(this.#layoutConfig());
	}

	onLayoutStateUpdate(config: ILayoutState): void {
		this.#layoutState.update((current) => ({ ...current, ...config }));
	}

	onMenuStateChange(event: IMenuChangeEvent) {
		this.#menuSource.next(event);
	}

	reset() {
		this.#resetSource.next(true);
	}

	private handleDarkModeTransition(config: ILayoutConfig): void {
		if (!this.#document.startViewTransition) {
			this.toggleDarkMode(config);
			this.onTransitionEnd();
			return;
		}
		this.startViewTransition(config);
	}

	private startViewTransition(config: ILayoutConfig): void {
		const transition = this.#document.startViewTransition(() => {
			this.toggleDarkMode(config);
		});

		transition.ready
			.then(() => {
				this.onTransitionEnd();
			})
			.catch(() => {});
	}
}
