import { animate, state, style, transition, trigger } from "@angular/animations";
import { NgClass } from "@angular/common";
import { Component, HostBinding, Input, type OnInit, inject } from "@angular/core";
import { NavigationEnd, Router, RouterModule } from "@angular/router";
import type { MenuItem } from "primeng/api";
import { RippleModule } from "primeng/ripple";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { LayoutService } from "../services/layout.service";

@Component({
	selector: "[app-menuitem]",
	imports: [NgClass, RouterModule, RippleModule],
	template: `
        <ng-container>
            @if (root && item.visible) {
              <div class="layout-menuitem-root-text">{{ item.label }}</div>
            }
            <a *ngIf="(!item.routerLink || item.items) && item.visible !== false" [attr.href]="item.url" (click)="itemClick($event)" [ngClass]="item.styleClass" [attr.target]="item.target" tabindex="0" pRipple>
                <i [ngClass]="item.icon" class="layout-menuitem-icon"></i>
                <span class="layout-menuitem-text">{{ item.label }}</span>
                @if (item.items) {
                  <i class="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
                }
            </a>
            @if (item.routerLink && !item.items && item.visible) {
              <a
                (click)="itemClick($event)"
                [ngClass]="item.styleClass"
                [routerLink]="item.routerLink"
                routerLinkActive="active-route"
                [routerLinkActiveOptions]="item.routerLinkActiveOptions || { paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }"
                [fragment]="item.fragment"
                [queryParamsHandling]="item.queryParamsHandling"
                [preserveFragment]="item.preserveFragment"
                [skipLocationChange]="item.skipLocationChange"
                [replaceUrl]="item.replaceUrl"
                [state]="item.state"
                [queryParams]="item.queryParams"
                [attr.target]="item.target"
                tabindex="0"
                pRipple
            >
                <i [ngClass]="item.icon" class="layout-menuitem-icon"></i>
                <span class="layout-menuitem-text">{{ item.label }}</span>
                @if (item.items) {
                  <i class="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
                }
            </a>
            }
            @if (item.items && item.visible) {
              <ul [@children]="submenuAnimation">
                <ng-template ngFor let-child let-i="index" [ngForOf]="item.items">
                    <li app-menuitem [item]="child" [index]="i" [parentKey]="key" [class]="child['badgeClass']"></li>
                </ng-template>
            </ul>
            }
        </ng-container>
    `,
	animations: [
		trigger("children", [
			state(
				"collapsed",
				style({
					height: "0",
				}),
			),
			state(
				"expanded",
				style({
					height: "*",
				}),
			),
			transition("collapsed <=> expanded", animate("400ms cubic-bezier(0.86, 0, 0.07, 1)")),
		]),
	],
})
export class MenuitemComponent implements OnInit {
	readonly #router = inject(Router);
	readonly #layoutService = inject(LayoutService);
	readonly #subscriptions = new Subscription();

	@Input() item!: MenuItem;
	@Input() index!: number;
	@Input() parentKey!: string;
	@Input() @HostBinding("class.layout-root-menuitem") root!: boolean;

	active = false;
	key = "";

	get submenuAnimation() {
		return this.root ? "expanded" : this.active ? "expanded" : "collapsed";
	}

	@HostBinding("class.active-menuitem")
	get activeClass() {
		return this.active && !this.root;
	}

	constructor() {
		this.#subscriptions.add(
			this.#layoutService.menuSource$.subscribe((value) => {
				Promise.resolve(null).then(() => {
					if (value.routeEvent) {
						this.active = !!(value.key === this.key || value.key.startsWith(`${this.key}-`));
					} else {
						if (value.key !== this.key && !value.key.startsWith(`${this.key}-`)) {
							this.active = false;
						}
					}
				});
			}),
		);

		this.#subscriptions.add(
			this.#layoutService.resetSource$.subscribe(() => {
				this.active = false;
			}),
		);

		this.#subscriptions.add(
			this.#router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((params) => {
				if (this.item.routerLink) {
					this.updateActiveStateFromRoute();
				}
			}),
		);
	}

	ngOnInit() {
		this.key = this.parentKey ? `${this.parentKey}-${this.index}` : String(this.index);

		if (this.item.routerLink) {
			this.updateActiveStateFromRoute();
		}
	}

	updateActiveStateFromRoute() {
		const activeRoute = this.#router.isActive(this.item.routerLink[0], {
			paths: "exact",
			queryParams: "ignored",
			matrixParams: "ignored",
			fragment: "ignored",
		});

		if (activeRoute) {
			this.#layoutService.onMenuStateChange({ key: this.key, routeEvent: true });
		}
	}

	itemClick(event: Event) {
		// avoid processing disabled items
		if (this.item.disabled) {
			event.preventDefault();
			return;
		}

		// execute command
		if (this.item.command) {
			this.item.command({ originalEvent: event, item: this.item });
		}

		// toggle active state
		if (this.item.items) {
			this.active = !this.active;
		}

		this.#layoutService.onMenuStateChange({ key: this.key });
	}

	ngOnDestroy() {
		this.#subscriptions.unsubscribe();
	}
}
