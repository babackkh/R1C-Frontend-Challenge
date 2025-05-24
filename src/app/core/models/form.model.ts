import type { FormControl } from "@angular/forms";

export type R1CFormGroup<T> = { [K in keyof T]: FormControl<T[K]> };
