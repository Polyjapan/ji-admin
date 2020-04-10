import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RequireLoginComponent} from "./components/accounts/require-login/require-login.component";
import {LoginFailedComponent} from "./components/accounts/login-failed/login-failed.component";
import {PermissionAuthGuard} from "./services/permission-auth-guard.service";
import {UsersListComponent} from "./components/users/users-list/users-list.component";
import {GroupsListComponent} from "./components/groups/groups-list/groups-list.component";
import {ApikeysListComponent} from "./components/apikeys/apikeys-list/apikeys-list.component";
import {CasServicesListComponent} from "./components/casservices/cas-services-list/cas-services-list.component";


const routes: Routes = [

  {path: 'require-login', component: RequireLoginComponent},
  {path: 'login-failed', component: LoginFailedComponent},
  {path: 'login-failed/:details', component: LoginFailedComponent},
  {
    path: '', canActivate: [PermissionAuthGuard], canActivateChild: [PermissionAuthGuard], children: [
      {path: 'users', component: UsersListComponent},
      {path: 'groups', component: GroupsListComponent},
      {path: 'apikeys', component: ApikeysListComponent},
      {path: 'casservices', component: CasServicesListComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
