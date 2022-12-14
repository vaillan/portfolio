import { HttpService } from './../../services/http.service';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ThemePalette } from '@angular/material/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  dataToDisplay = [];
  columns: string[];
  linksPagination: any[] = [];
  pageEvent!: PageEvent;
  usersDataSource!: MatTableDataSource<any>;

  color: ThemePalette = 'accent';
  length!: number;
  pageSize!: number;
  pageIndex!: number;

  checkedA!: boolean;
  checkedB!: boolean;
  disabled!: boolean;

  analyzeButton: boolean;
  globeGraphosButton!: boolean;

  hidePageSize!: boolean;
  showPageSizeOptions!: boolean;
  showFirstLastButtons!: boolean;

  githubToken = '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';


  constructor(private httpService: HttpService) {
    this.columns = ['name', 'type', 'company', 'location', 'country', 'followers', 'public_gists', 'public_repos'];
    this.analyzeButton = this.checkedA;
    this.globeGraphosButton = this.checkedB;
    this.checkedA = false;
    this.checkedB = false;
    this.disabled = false;
    this.hidePageSize = false;
    this.showPageSizeOptions = false;
    this.showFirstLastButtons = false;
    this.pageSize = 0;
    this.httpService.getUsersGithubStored().subscribe(res => {
      console.log(res);
      this.usersDataSource = new MatTableDataSource(res.users.data);
      this.pageSize = res.users.per_page;
      this.length = res.users.total;
      this.pageIndex = res.users.current_page - 1;
      this.linksPagination = res.users.links;
    });
  }

  getGithubUserList() {
    this.httpService.getLastUser().subscribe((lastUser: any) => {
      const since = lastUser.user ? lastUser.user.org_id : 100;
      this.httpService.getGithubListUsers(this.githubToken, since, 50).subscribe(res => {
        this.getUserInfoByLogin(res);
      });
    });
  }


  private getUserInfoByLogin(res: any) {
    res.forEach((userInList: any) => {
      this.httpService.getGithubContextualUserInformation(this.githubToken, userInList.login).subscribe(userInfo => {
        this.getLocationByUser(userInfo);
      });
    });
  }

  private getLocationByUser(userInfo: any) {
    if (userInfo.location) {
      const loc = userInfo.location.replace(/[^\w\s]/gi, '');
      userInfo.latitude = null;
      userInfo.longitude = null;
      userInfo.org_id = userInfo.id;
      userInfo.org_created_at = userInfo.created_at;
      userInfo.org_updated_at = userInfo.updated_at;
      this.httpService.getLocation(loc).subscribe(location => {
        this.inserUserToDataBase(location, userInfo);
      });
    }
  }

  private inserUserToDataBase(location: any, userInfo: any) {
    if (location) {
      userInfo.latitude = `${location.latLng.lat}`;
      userInfo.longitude = `${location.latLng.lng}`;
      userInfo.country = location.adminArea1;
      const data = { user: userInfo };
      this.httpService.insertGithubUser(data).subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }

  onSlideToggle(e: any) {
    this.analyzeButton = e.checked;
  }

  globeSwitchSlideButton(e: any) {
    this.globeGraphosButton = e.checked;
  }

  getUsersGithubStored() {
    this.httpService.getUsersGithubStored().subscribe(res => {
      this.usersDataSource = new MatTableDataSource(res.users.data);
      this.pageSize = res.users.per_page;
      this.length = res.users.total;
      this.pageIndex = res.users.current_page - 1;
      this.linksPagination = res.users.links;
    });
  }

  handlePageEvent(e: any) {
    this.httpService.getPagination(this.linksPagination[(e.pageIndex + 1)].url).subscribe(res => {
      this.pageSize = res.users.per_page;
      this.length = res.users.total;
      this.pageIndex = res.users.current_page - 1;
      this.usersDataSource = new MatTableDataSource(res.users.data);
    });
  }

  createGlobeGrophos() {

  }

}
