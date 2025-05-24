import { Component, input, output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import type { R1CFormGroup } from "@core/models/form.model";
import type { LoginUserRequestBody } from "@data-access/model";
import { simpleMessageDt } from "@theme";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { RippleModule } from "primeng/ripple";
import { StyleClassModule } from "primeng/styleclass";

@Component({
	selector: "app-sign-in-form",
	imports: [ButtonModule, InputTextModule, PasswordModule, ReactiveFormsModule, RouterLink, RippleModule, StyleClassModule],
	templateUrl: "./sign-in-form.component.html",
})
export class SignInFormComponent {
	isLoading = input.required<boolean>();
	submit = output<LoginUserRequestBody>();

	signinForm = new FormGroup<R1CFormGroup<LoginUserRequestBody["user"]>>({
		email: new FormControl("", { validators: [Validators.required, Validators.email], nonNullable: true }),
		password: new FormControl("", { validators: [Validators.required], nonNullable: true }),
	});
	messageDt = simpleMessageDt;

	onSignin(): void {
		this.submit.emit({ user: this.signinForm.getRawValue() });
	}
}
