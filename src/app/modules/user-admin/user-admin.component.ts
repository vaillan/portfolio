import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { ShareService } from 'src/app/services/share.service';
@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit, OnDestroy {

  hide: boolean;
  loginForm: FormGroup = new FormGroup({});
  subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder, 
    private httpService: HttpService,
    private shareService: ShareService
  ) {
    this.hide = true;
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
        password: ['', Validators.required],
      }
    );
  }

  ngOnInit(): void { }

  get f() {
    return this.loginForm.controls;
  }


  onSubmit(): void {
    this.subscriptions.add(this.httpService.login(this.loginForm.value).subscribe(res => {
      console.log(res);
      sessionStorage.setItem('token', res.token);
      sessionStorage.setItem('user', JSON.stringify(res.user));
      this.shareService.changeStatusLogged(true);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
