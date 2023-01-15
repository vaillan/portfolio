import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';
import { HttpService } from 'src/app/services/http.service';
import { ShareService } from 'src/app/services/share.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnDestroy {
  
  adminForm: FormGroup = new FormGroup({});
  adminFormData:FormData = new FormData();
  subscriptions: Subscription = new Subscription();
  file!: File;
  fileControl!:FormControl;
  user!:User;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private shareService: ShareService,
  ){
    this.fileControl = new FormControl('', Validators.required);
    this.subscriptions.add(this.shareService.currentUser$.subscribe((user: any )=> {
      this.user = user;
    }));
  }

  handleFile(e:any) {
    const accept = ['application/pdf'];
    if(e.target.files.length > 0) {
      this.file = e.target.files[0];
      if(accept.includes(this.file.type)){
        this.fileControl.patchValue(this.file.name);
        this.adminFormData.append('file', this.file);
        this.adminFormData.append('user_id', `${this.user.id}`);
        this.subscriptions.add(this.httpService.uploadFile(this.adminFormData).subscribe({
          next: (res) => {
            console.log(res)
          },
          error: (error) => {
            console.error(error);
          }
        }));
      }else {

      }
    }
    console.log(e);
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }
}
