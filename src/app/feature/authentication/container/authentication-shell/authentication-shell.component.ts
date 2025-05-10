import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
	selector: "app-authentication-shell",
	imports: [RouterOutlet],
	template: "<router-outlet/>",
})
export class AuthenticationShellComponent {}
