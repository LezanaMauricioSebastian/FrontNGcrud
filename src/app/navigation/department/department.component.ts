import { Component, ViewChild } from '@angular/core';
import { Department } from '../../Interfaces/department';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DepartmentService } from '../../Services/department.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DialogsAddEditDepartmentComponent } from '../../Dialogs/dialogs-add-edit-department/dialogs-add-edit-department.component';
import { DialogsDeleteDepartmentComponent } from '../../Dialogs/dialogs-delete-department/dialogs-delete-department.component';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [ReactiveFormsModule,MatButtonModule,MatTableModule,MatPaginatorModule,MatFormFieldModule,MatSelectModule,MatDatepickerModule,MatNativeDateModule,MatInputModule,MomentDateModule,MatSnackBarModule,MatIconModule,MatDialogModule,MatGridListModule,FormsModule,HttpClientModule,MatMenuModule,MatToolbarModule ],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {
  displayedColumns: string[] = ['idDepartment','name','Actions'];
  dataSource = new MatTableDataSource<Department>();
  constructor(private departmentService:DepartmentService,public dialog:MatDialog,private _snackBar:MatSnackBar){

  }
  editDepartmentDialog(element:Department){
    this.dialog.open(DialogsAddEditDepartmentComponent,{
      disableClose:true,
      width:"50%",
      data:element
    }).afterClosed().subscribe(result=>{
      if(result==="edited"){
        this.showDepartments();
      }
    });
  }
  deleteDepartmentDialog(element:Department){
    this.dialog.open(DialogsDeleteDepartmentComponent,{
      disableClose:true,
      width:"50%",
      data:element
    }).afterClosed().subscribe(result=>{
      if(result==="delete"){
        this.departmentService.delete(element.idDepartment).subscribe({
          next:(data)=>{
            this.openSnackBar("Department was deleted","deleted");
            this.showDepartments(); 
          },error:(e)=>{this.openSnackBar("the Department couldn't be deleted","failed")}
        })
      }
    });
  }

  newDepartmentDialog(){
   
    this.dialog.open(DialogsAddEditDepartmentComponent,{
      disableClose:true,
      width:"50%"
    }).afterClosed().subscribe(result=>{
      if(result==="created"){
        this.showDepartments();
      }
    });
    
  }
  ngOnInit(): void {
    this.showDepartments();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  showDepartments(){
    this.departmentService.getList().subscribe({
      next:(data=>{
          this.dataSource.data=data;
      }),error:(e)=>{  console.error('Error fetching employees:', e);}
    });
  }
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
