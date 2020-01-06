import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { HomeComponent } from './components/user/home/home.component';
import { AboutComponent } from './components/other/about/about.component';
import { FieldsComponent } from './components/other/fields/fields.component';
import { MainComponent } from './components/admin/main/main.component';
import { ReservationComponent } from './components/reservation/reservation/reservation.component';
import { ActiveComponent } from './components/reservation/active/active.component';
import { HistoryComponent } from './components/reservation/history/history.component';
import { UserListComponent } from './components/admin/users/user-list/user-list.component';
import { UserFormComponent } from './components/admin/users/user-form/user-form.component';
import { FieldsListComponent } from './components/admin/fields/fields-list/fields-list.component';
import { FieldsFormComponent } from './components/admin/fields/fields-form/fields-form.component';
import { ItemsListComponent } from './components/admin/items/items-list/items-list.component';
import { ItemsFormComponent } from './components/admin/items/items-form/items-form.component';
import { RefereesListComponent } from './components/admin/referees/referees-list/referees-list.component';
import { RefereesFormComponent } from './components/admin/referees/referees-form/referees-form.component';
import { SchedsListComponent } from './components/admin/scheds/scheds-list/scheds-list.component';
import { SchedsFormComponent } from './components/admin/scheds/scheds-form/scheds-form.component';
import { ErrorComponent } from './components/error/error.component';

import * as Guards from './_helpers/Guards';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: LoginComponent, canActivate: [Guards.LoginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [Guards.LoginGuard] },
  { path: 'home', component: HomeComponent, canActivate: [Guards.AuthGuard] },
  { path: 'reservation', component: ReservationComponent, canActivate: [Guards.AuthGuard] },
  { path: 'active', component: ActiveComponent, canActivate: [Guards.AuthGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [Guards.AuthGuard] },
  { path: 'fields', component: FieldsComponent, canActivate: [Guards.AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [Guards.AuthGuard] },
  { path: 'admin', component: MainComponent, canActivate: [Guards.AdminGuard] },
  { path: 'admin/users', component: UserListComponent, canActivate: [Guards.AdminGuard] },
  { path: 'admin/users/edit/:id', component: UserFormComponent, canActivate: [Guards.AdminGuard] },
  { path: 'admin/fields', component: FieldsListComponent, canActivate: [Guards.AdminGuard] },
  { path: 'admin/fields/add', component: FieldsFormComponent, canActivate: [Guards.AdminGuard] },
  { path: 'admin/fields/edit/:id', component: FieldsFormComponent, canActivate: [Guards.AdminGuard] },
  { path: 'admin/items', component: ItemsListComponent, canActivate: [Guards.AdminGuard] },
  { path: 'admin/items/add', component: ItemsFormComponent, canActivate: [Guards.AdminGuard] },
  { path: 'admin/items/edit/:id/:cod', component: ItemsFormComponent, canActivate: [Guards.AdminGuard] },
  { path: 'admin/referees', component: RefereesListComponent, canActivate: [Guards.AdminGuard] },
  { path: 'admin/referees/add', component: RefereesFormComponent, canActivate: [Guards.AdminGuard] },
  { path: 'admin/referees/edit/:id', component: RefereesFormComponent, canActivate: [Guards.AdminGuard] },
  { path: 'admin/scheds', component: SchedsListComponent, canActivate: [Guards.AdminGuard] },
  { path: 'admin/scheds/add', component: SchedsFormComponent, canActivate: [Guards.AdminGuard] },
  { path: 'admin/scheds/edit/:id', component: SchedsFormComponent, canActivate: [Guards.AdminGuard] },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
