import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

import { RouterOutlet } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule ,HttpClient} from '@angular/common/http';
//interfaz y servicio
import { Employee } from './Interfaces/employee';
import { EmployeeService } from './Services/employee.service';
//material 
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { MomentDateModule } from '@angular/material-moment-adapter';
import {MatSnackBarModule,MatSnackBar} from '@angular/material/snack-bar'
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDialog,MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle, } from '@angular/material/dialog';
import { DialogModule } from '@angular/cdk/dialog';
import { DialogsAddEditComponent } from './Dialogs/dialogs-add-edit/dialogs-add-edit.component';
import { DepartmentService } from './Services/department.service';
import { DeleteDialogComponent } from './Dialogs/delete-dialog/delete-dialog.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule,MatButtonModule,MatTableModule,MatPaginatorModule,MatFormFieldModule,MatSelectModule,MatDatepickerModule,MatNativeDateModule,MatInputModule,MomentDateModule,MatSnackBarModule,MatIconModule,MatDialogModule,MatGridListModule,FormsModule,HttpClientModule,DialogsAddEditComponent,MatDialogClose,MatDialogContent,MatDialogTitle],
  providers:[EmployeeService,DepartmentService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit,OnInit {
  displayedColumns: string[] = ['name', 'surname', 'Department', 'Salary',"Contratc date","Actions"];
  dataSource = new MatTableDataSource<Employee>();

  constructor(private employeeService:EmployeeService,public dialog:MatDialog,private _snackBar:MatSnackBar){

  }

  ngOnInit(): void {
    this.showEmployees();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  newEmployeeDialog(){
    this.dialog.open(DialogsAddEditComponent,{
      disableClose:true,
      width:"50%"
    }).afterClosed().subscribe(result=>{
      if(result==="created"){
        this.showEmployees();
      }
    });
  }
  deleteEmployeeDialog(element:Employee){
    this.dialog.open(DeleteDialogComponent,{
      disableClose:true,
      width:"50%",
      data:element
    }).afterClosed().subscribe(result=>{
      if(result==="delete"){
        this.employeeService.delete(element.idEmployee).subscribe({
          next:(data)=>{
            this.openSnackBar("Employee was deleted","deleted");
            this.showEmployees();
          },error:(e)=>{this.openSnackBar("the Employee couldn't be deleted","failed")}
        })
      }
    });
  }
  editEmployeeDialog(element:Employee){
    this.dialog.open(DialogsAddEditComponent,{
      disableClose:true,
      width:"50%",
      data:element
    }).afterClosed().subscribe(result=>{
      if(result==="edited"){
        this.showEmployees();
      }
    });
  }
  showEmployees(){
    this.employeeService.getList().subscribe({
      next:(data=>{
          this.dataSource.data=data;
      }),error:(e)=>{  console.error('Error fetching employees:', e);}
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Apply the filter based on user input
  applyFilter(event:Event) {
    const filterValue=(event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openSnackBar(message:string,action:string){
    this._snackBar.open(message,action,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    });
  }
}
