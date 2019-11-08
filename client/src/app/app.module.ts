import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { HomeComponent } from './components/user/home/home.component';
import { NavigationComponent } from './components/partials/navigation/navigation.component';
import { AdminComponent } from './components/partials/admin/admin.component';
import { MainComponent } from './components/admin/main/main.component';

import { AdminService } from './services/admin/admin.service';
import { AuthService } from './services/user/auth.service';
import { ValidationService } from './services/validation/validation.service';

import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';

import { UserFormComponent } from './components/admin/users/user-form/user-form.component';
import { UserListComponent } from './components/admin/users/user-list/user-list.component';
import { FieldsFormComponent } from './components/admin/fields/fields-form/fields-form.component';
import { FieldsListComponent } from './components/admin/fields/fields-list/fields-list.component';
import { ItemsListComponent } from './components/admin/items/items-list/items-list.component';
import { ItemsFormComponent } from './components/admin/items/items-form/items-form.component';
import { RefereesFormComponent } from './components/admin/referees/referees-form/referees-form.component';
import { RefereesListComponent } from './components/admin/referees/referees-list/referees-list.component';
import { SchedsListComponent } from './components/admin/scheds/scheds-list/scheds-list.component';
import { SchedsFormComponent } from './components/admin/scheds/scheds-form/scheds-form.component';
import { ErrorComponent } from './components/error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavigationComponent,
    AdminComponent,
    MainComponent,
    UserFormComponent,
    UserListComponent,
    FieldsFormComponent,
    FieldsListComponent,
    ItemsListComponent,
    ItemsFormComponent,
    RefereesFormComponent,
    RefereesListComponent,
    SchedsListComponent,
    SchedsFormComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [
    Title,
    AdminService,
    AuthService,
    ValidationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
