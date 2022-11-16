import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthStore } from 'src/app/services/auth.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthStore,
    private fb: FormBuilder
  ) {
    this.loginForm = fb.group({
      email: [Validators.required],
      password: [Validators.required],
    });
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.submitted = true;

    // if (this.loginForm.invalid) {
    //   return;
    // }

    this.loading = true;

    const val = this.loginForm.value;
    this.auth.login(val.email, val.password).subscribe(
      () => {
        this.router.navigateByUrl(this.returnUrl);
      },
      (err) => {
        alert('Login has failed!');
      }
    );
  }

  // onSubmit() {
  //   this.submitted = true;

  //   // stop here if form is invalid
  //   if (this.loginForm.invalid) {
  //     return;
  //   }

  //   this.loading = true;
  //   this.auth
  //     .login(
  //       this.loginForm.controls['email'].value,
  //       this.loginForm.controls['password'].value
  //     )
  //     .pipe(
  //     .subscribe(
  //       (data) => {
  //         this.router.navigate([this.returnUrl]);
  //       },
  //       (error) => {
  //         this.alertService.error(error);
  //         this.loading = false;
  //       }
  //     ));
  // }
}