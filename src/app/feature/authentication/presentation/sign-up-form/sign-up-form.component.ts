import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { RippleModule } from "primeng/ripple";

@Component({
	selector: "app-sign-up-form",
	imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule],
	templateUrl: "./sign-up-form.component.html",
})
export class SignUpFormComponent {
	email = signal<string>("");
	password = signal<string>("");
	userName = signal<string>("");
}
