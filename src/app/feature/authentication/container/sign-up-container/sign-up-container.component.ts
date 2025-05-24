import { Component } from "@angular/core";
import { SignUpFormComponent } from "../../presentation/sign-up-form/sign-up-form.component";

@Component({
	selector: "app-sign-up-container",
	imports: [SignUpFormComponent],
	template: `<app-sign-up-form [isLoading]="false" (submit)="onSubmit($event)"/>`,
})
export class SignUpContainerComponent {
	onSubmit(formValue: any): void {}
}
