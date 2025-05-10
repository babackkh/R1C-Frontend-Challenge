import { Component, computed, inject } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { StyleClassModule } from "primeng/styleclass";
import { LayoutService } from "../services/layout.service";

@Component({
	selector: "app-configurator",
	imports: [ButtonModule, StyleClassModule],
	template: `
        <div class="fixed flex gap-4 top-8 right-8">
            <p-button type="button" (onClick)="toggleDarkMode()" [rounded]="true" [icon]="isDarkTheme() ? 'pi pi-moon' : 'pi pi-sun'" severity="secondary" />
            <div class="relative">
            </div>
        </div>
    `,
})
export class ConfiguratorComponent {
	readonly #layoutService = inject(LayoutService);

	isDarkTheme = computed(() => this.#layoutService.isDarkTheme());

	toggleDarkMode() {
		this.#layoutService.toggleDarkMode();
	}
}
