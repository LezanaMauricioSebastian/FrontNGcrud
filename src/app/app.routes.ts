import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './navigation/home/home.component';
import { DepartmentComponent } from './navigation/department/department.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },       // Ruta por defecto
  { path: 'home', component: HomeComponent },   // Ruta para Home
  { path: 'department', component: DepartmentComponent }, // Ruta para Employees
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
