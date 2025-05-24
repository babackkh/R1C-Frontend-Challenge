import { Component, input, output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import type { R1CFormGroup } from "@core/models/form.model";
import type { NewUserRequestBody } from "@data-access/model";
import { simpleMessageDt } from "@theme";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { MessageModule } from "primeng/message";
import { PasswordModule } from "primeng/password";
import { StyleClassModule } from "primeng/styleclass";

@Component({
	selector: "app-sign-up-form",
	imports: [ButtonModule, InputTextModule, PasswordModule, ReactiveFormsModule, RouterLink, MessageModule, StyleClassModule],
	templateUrl: "./sign-up-form.component.html",
})
export class SignUpFormComponent {
	isLoading = input.required<boolean>();
	submit = output<NewUserRequestBody>();

	signupForm = new FormGroup<R1CFormGroup<NewUserRequestBody["user"]>>({
		email: new FormControl("", { validators: [Validators.required, Validators.email], nonNullable: true }),
		username: new FormControl("", { validators: [Validators.required], nonNullable: true }),
		password: new FormControl("", { validators: [Validators.required], nonNullable: true }),
	});
	messageDt = simpleMessageDt;

	onSignup(): void {
		const { invalid, getRawValue } = this.signupForm;
		if (invalid) return;
		this.submit.emit({ user: getRawValue() });
	}
}
