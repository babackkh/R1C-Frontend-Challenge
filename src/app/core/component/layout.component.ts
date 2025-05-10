import { NgClass } from "@angular/common";
import { Component, Renderer2, inject } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { Subscription, filter } from "rxjs";
import { LayoutService } from "../services/layout.service";
import { HeaderComponent } from "./header.component";
import { SidebarComponent } from "./sidebar.component";

@Component({
	selector: "app-layout",
	standalone: true,
	imports: [NgClass, HeaderComponent, SidebarComponent, RouterOutlet],
	template: `<div class="layout-wrapper" [ngClass]="containerClass">
        <app-header />
        <app-sidebar />
        <div class="layout-main-container">
            <div class="layout-main">
                <router-outlet />
            </div>
        </div>
        <div class="layout-mask animate-fadein"></div>
    </div> `,
})
export class LayoutComponent {
	readonly #layoutService = inject(LayoutService);
	readonly #renderer = inject(Renderer2);
	readonly #router = inject(Router);
	readonly #subscriptions = new Subscription();

	menuOutsideClickListener!: (() => void) | null;

	constructor() {
		this.#subscriptions.add(
			this.#layoutService.overlayOpen$.subscribe(() => {
				if (!this.menuOutsideClickListener) {
					this.menuOutsideClickListener = this.#renderer.listen("document", "click", (event) => {
						if (this.isOutsideClicked(event)) {
							this.hideMenu();
						}
					});
				}

				if (this.#layoutService.layoutState().staticMenuMobileActive) {
					this.blockBodyScroll();
				}
			}),
		);

		this.#subscriptions.add(
			this.#router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
				this.hideMenu();
			}),
		);
	}

	isOutsideClicked(event: MouseEvent) {
		const sidebarEl = document.querySelector(".layout-sidebar");
		const topbarEl = document.querySelector(".layout-menu-button");
		const eventTarget = event.target as Node;

		return !(
			sidebarEl?.isSameNode(eventTarget) ||
			sidebarEl?.contains(eventTarget) ||
			topbarEl?.isSameNode(eventTarget) ||
			topbarEl?.contains(eventTarget)
		);
	}

	hideMenu() {
		this.#layoutService.onLayoutStateUpdate({ overlayMenuActive: false, staticMenuMobileActive: false, menuHoverActive: false });
		if (this.menuOutsideClickListener) {
			this.menuOutsideClickListener();
			this.menuOutsideClickListener = null;
		}
		this.unblockBodyScroll();
	}

	blockBodyScroll(): void {
		if (document.body.classList) {
			document.body.classList.add("blocked-scroll");
		} else {
			document.body.className += " blocked-scroll";
		}
	}

	unblockBodyScroll(): void {
		if (document.body.classList) {
			document.body.classList.remove("blocked-scroll");
		} else {
			document.body.className = document.body.className.replace(
				new RegExp(`(^|\\b)${"blocked-scroll".split(" ").join("|")}(\\b|$)`, "gi"),
				" ",
			);
		}
	}

	get containerClass() {
		return {
			"layout-overlay": this.#layoutService.isOverlay(),
			"layout-static": this.#layoutService.isStatic(),
			"layout-static-inactive": this.#layoutService.layoutState().staticMenuDesktopInactive && this.#layoutService.isStatic(),
			"layout-overlay-active": this.#layoutService.layoutState().overlayMenuActive,
			"layout-mobile-active": this.#layoutService.layoutState().staticMenuMobileActive,
		};
	}

	ngOnDestroy() {
		this.#subscriptions.unsubscribe();
	}
}
