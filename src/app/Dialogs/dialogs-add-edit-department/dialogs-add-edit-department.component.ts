import { Component, OnInit,Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DialogModule } from '@angular/cdk/dialog';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

import { FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';

import { Department } from '../../Interfaces/department';
import { Employee } from '../../Interfaces/employee';
import { DepartmentService } from '../../Services/department.service';
import { EmployeeService } from '../../Services/employee.service';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
@Component({
  selector: 'app-dialogs-add-edit-department',
  standalone: true,
  imports: [DialogModule,MatDialogClose,MatDialogContent,MatDialogActions,MatButtonModule,MatDialogTitle,FormsModule,MatGridList,MatGridTile,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatSelectModule,CommonModule,MatFormFieldModule, MatInputModule, MatDatepickerModule],
  templateUrl: './dialogs-add-edit-department.component.html',
  providers:[DepartmentService,EmployeeService],
  styleUrl: './dialogs-add-edit-department.component.css'
})
export class DialogsAddEditDepartmentComponent implements OnInit {

  formDepartment:FormGroup;
  ActionTitle:string="New";
  ActionButton:string="Save";
  DepartmentList:Department[]=[];
  constructor(private Resultdialog:MatDialogRef<DialogsAddEditDepartmentComponent>,
    private fb:FormBuilder,
    private _snackBar:MatSnackBar,
    private _departmentService:DepartmentService,
    @Inject(MAT_DIALOG_DATA) public dataDepartment: Department){

    this.formDepartment=this.fb.group({
      name:['',Validators.required],
    })
    this._departmentService.getList().subscribe({
      next:(data)=>{
        console.log(data)
        this.DepartmentList=data;
        console.log(this.DepartmentList)
      },error:(e)=>{console.log("Error while showing the department list",e)}
    })
  }

  addEditDepartment(){
    const model:Department={
      idDepartment: 0,
      name: this.formDepartment.value.name,
    }
    
    if(this.dataDepartment==null){
      this._departmentService.add(model).subscribe({
        next:(data)=>{
          this.openSnackBar("the department was created","Succesfully created");
          this.Resultdialog.close("created");
        },error:(e)=>{
          this.openSnackBar("the department could'nt be created","failed creating");
        }
      });
    }else{
      this._departmentService.update(this.dataDepartment.idDepartment,model).subscribe({
        next:(data)=>{
          this.openSnackBar("the Department was edited","Succesfully edited");
          this.Resultdialog.close("edited");
        },error:(e)=>{
          this.openSnackBar("the Department could'nt be edited","failed creating");
        }
      });
    
    }

  }
  openSnackBar(message:string,action:string){
    this._snackBar.open(message,action,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    });
  }
  ngOnInit(): void {
    if(this.dataDepartment){
      this.formDepartment.patchValue({
        
        name:this.dataDepartment.name,
      })

      this.ActionTitle="Edit"
      this.ActionButton="Save"
    }
  }
}
