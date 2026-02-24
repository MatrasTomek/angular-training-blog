import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginFormInterface } from '../interfaces/login-form.interface';
import { AuthService } from './auth.service';
import { LoginInterface } from '../interfaces/login.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup<LoginFormInterface>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = new FormGroup<LoginFormInterface>({
      login: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit(): void {
    const data: LoginInterface = {
      login: this.loginForm.value.login!,
      password: this.loginForm.value.password!,
    };
    this.authService.login(data).subscribe((response) => {
      localStorage.setItem('token', response.tokenValue);
      localStorage.setItem('login', response.claims.login);
      this.toastr.success('Zalogowano pomyślnie!');
      this.router.navigate(['/blog']);
    });
  }
}
