import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { RippleModule } from "primeng/ripple";

@Component({
	selector: "app-sign-in-form",
	imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule],
	templateUrl: "./sign-in-form.component.html",
	styleUrl: "./sign-in-form.component.scss",
})
export class SignInFormComponent {
	email = signal<string>("");
	password = signal<string>("");
}
