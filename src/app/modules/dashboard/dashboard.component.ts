import { Component } from '@angular/core';
import { Octokit, App } from "octokit";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  octokit = new Octokit({
    auth: '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'
  });

  async getGithubUserList() {
    const since = 30;
    const per_page = 50;
    const response = await this.octokit.request(`GET /users?&since=${since}&per_page=${per_page}`, {});
    console.log(response);
  }
}
