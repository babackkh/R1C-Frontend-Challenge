import type { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { BASE_URL } from "../providers/base-url.provider";

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
	const baseUrl = inject(BASE_URL);
	const apiReq = req.clone({ url: `${baseUrl}/${req.url}` });
	return next(apiReq);
};
