import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginFailedComponent} from "./components/accounts/login-failed/login-failed.component";
import {RequireLoginComponent} from "./components/accounts/require-login/require-login.component";
import {ApiTokensModule} from "@japanimpact/angular-auth-framework";
import {MatCardModule} from "@angular/material/card";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {LoginService} from "./services/login.service";
import {HttpClientModule} from "@angular/common/http";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {MatListModule} from "@angular/material/list";
import {JwtModule} from "@auth0/angular-jwt";
import { UsersListComponent } from './components/users/users-list/users-list.component';
import {environment} from "../environments/environment";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import { UserProfileComponent } from './components/users/user-profile/user-profile.component';
import {MatDialogModule} from "@angular/material/dialog";
import { GroupsListComponent } from './components/groups/groups-list/groups-list.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { GroupEditComponent } from './components/groups/group-edit/group-edit.component';
import { GroupMembersComponent } from './components/groups/group-members/group-members.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { GroupScopesComponent } from './components/groups/group-scopes/group-scopes.component';
import { GroupSelectorComponent } from './components/groups/group-selector/group-selector.component';
import {MatSelectModule} from "@angular/material/select";
import { ApikeysListComponent } from './components/apikeys/apikeys-list/apikeys-list.component';
import { ApikeysEditComponent } from './components/apikeys/apikeys-edit/apikeys-edit.component';
import { ApikeysScopesComponent } from './components/apikeys/apikeys-scopes/apikeys-scopes.component';
import { CasServicesListComponent } from './components/casservices/cas-services-list/cas-services-list.component';
import { CasProxiesComponent } from './components/casservices/cas-proxies/cas-proxies.component';
import { CasGroupsComponent } from './components/casservices/cas-groups/cas-groups.component';
import { CasDomainsComponent } from './components/casservices/cas-domains/cas-domains.component';
import { CasEditComponent } from './components/casservices/cas-edit/cas-edit.component';
import { CasSelectorComponent } from './components/casservices/cas-selector/cas-selector.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { EventsListComponent } from './components/events/events-list/events-list.component';
import { EventAttributesListComponent } from './components/events/event-attributes-list/event-attributes-list.component';
import { EventCreateComponent } from './components/events/event-create/event-create.component';
import { DatetimePickerComponent } from './components/utils/datetime-picker/datetime-picker.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";


export function tokenGetter() {
  return localStorage.getItem('api_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginFailedComponent,
    RequireLoginComponent,
    SidebarComponent,
    UsersListComponent,
    UserProfileComponent,
    GroupsListComponent,
    GroupEditComponent,
    GroupMembersComponent,
    GroupScopesComponent,
    GroupSelectorComponent,
    ApikeysListComponent,
    ApikeysEditComponent,
    ApikeysScopesComponent,
    CasServicesListComponent,
    CasProxiesComponent,
    CasGroupsComponent,
    CasDomainsComponent,
    CasEditComponent,
    CasSelectorComponent,
    EventsListComponent,
    EventAttributesListComponent,
    EventCreateComponent,
    DatetimePickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ApiTokensModule,
    MatCardModule,
    FlexModule,
    MatButtonModule,
    MatProgressBarModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.auth.whitelist

      }
    }),
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
