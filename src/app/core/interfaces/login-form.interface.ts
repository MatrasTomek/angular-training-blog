import { FormControl } from '@angular/forms';

export interface LoginFormInterface {
  login: FormControl<string | null>;
  password: FormControl<string | null>;
}
