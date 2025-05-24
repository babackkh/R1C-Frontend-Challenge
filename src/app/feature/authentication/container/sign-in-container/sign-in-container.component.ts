import { Component } from "@angular/core";
import { SignInFormComponent } from "../../presentation/sign-in-form/sign-in-form.component";

@Component({
	selector: "app-sign-in-container",
	imports: [SignInFormComponent],
	template: `<app-sign-in-form [isLoading]="false" (submit)="onSubmit($event)"/>`,
})
export class SignInContainerComponent {
	onSubmit(formValue: any): void {}
}
