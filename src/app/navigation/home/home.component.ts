import { DialogModule } from '@angular/cdk/dialog';
import { Component, ViewChild } from '@angular/core';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DeleteDialogComponent } from '../../Dialogs/delete-dialog/delete-dialog.component';
import { DialogsAddEditComponent } from '../../Dialogs/dialogs-add-edit/dialogs-add-edit.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmployeeService } from '../../Services/employee.service';
import { MatDialog, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Employee } from '../../Interfaces/employee';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from '../../app.component';
import { DepartmentComponent } from '../department/department.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule,MatButtonModule,MatTableModule,MatPaginatorModule,MatFormFieldModule,MatSelectModule,MatDatepickerModule,MatNativeDateModule,MatInputModule,MomentDateModule,MatSnackBarModule,MatIconModule,MatDialogModule,MatGridListModule,FormsModule,HttpClientModule,MatMenuModule,MatToolbarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
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
