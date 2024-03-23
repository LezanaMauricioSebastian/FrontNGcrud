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

export const MY_DATE_FORMARTS={
  parse:{
    dateinput:'DD/MM/YYYY',
  },
  display:{
    dateinput:'DD/MM/YYYY',
    monthYearLabel:'MMMM YYYY',
    dateA11yLabel:'LL',
    monthYearA11yLabel:'MMMM YYYY'
  }
}

@Component({
  selector: 'app-dialogs-add-edit',
  standalone: true,
  imports: [DialogModule,MatDialogClose,MatDialogContent,MatDialogActions,MatButtonModule,MatDialogTitle,FormsModule,MatGridList,MatGridTile,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatSelectModule,CommonModule,MatFormFieldModule, MatInputModule, MatDatepickerModule],
  templateUrl: './dialogs-add-edit.component.html',
  styleUrl: './dialogs-add-edit.component.css',
  providers:[
    {provide:MAT_DATE_FORMATS,useValue:MY_DATE_FORMARTS},DepartmentService,EmployeeService
  ]
})
export class DialogsAddEditComponent  implements OnInit{
    formEmployee:FormGroup;
    ActionTitle:string="New";
    ActionButton:string="Save";
    DepartmentList:Department[]=[];

    constructor(private Resultdialog:MatDialogRef<DialogsAddEditComponent>,
                private fb:FormBuilder,
                private _snackBar:MatSnackBar,
                private _departmentService:DepartmentService,
                private _employeeService:EmployeeService,
                @Inject(MAT_DIALOG_DATA) public dataEmployee: Employee){
        
        this.formEmployee=this.fb.group({
          name:['',Validators.required],
          surname:['',Validators.required],
          idDepartment:['',Validators.required],
          Salary:['',Validators.required],
          contractDate:['',Validators.required]
        })
      this._departmentService.getList().subscribe({
        next:(data)=>{
          console.log(data)
          this.DepartmentList=data;
          console.log(this.DepartmentList)
        },error:(e)=>{console.log("Error while showing the department list",e)}
      })
    }

    openSnackBar(message:string,action:string){
      this._snackBar.open(message,action,{
        horizontalPosition:"end",
        verticalPosition:"top",
        duration:3000
      });
    }
    addEditEmployee(){
      const model:Employee={
        idEmployee: 0,
        name: this.formEmployee.value.name,
        surname: this.formEmployee.value.surname,
        idDepartment: this.formEmployee.value.idDepartment,
        salary: this.formEmployee.value.Salary,
        contractDate:moment.default(this.formEmployee.value.contractDate).format("DD/MM/YYYY"),
        
      }
    
      if(this.dataEmployee==null){
        this._employeeService.add(model).subscribe({
          next:(data)=>{
            this.openSnackBar("the employee was created","Succesfully created");
            this.Resultdialog.close("created");
          },error:(e)=>{
            this.openSnackBar("the employee could'nt be created","failed creating");
          }
        });
      }else{
        this._employeeService.update(this.dataEmployee.idEmployee,model).subscribe({
          next:(data)=>{
            this.openSnackBar("the employee was edited","Succesfully edited");
            this.Resultdialog.close("edited");
          },error:(e)=>{
            this.openSnackBar("the employee could'nt be edited","failed creating");
          }
        });
      }
  
    }
    ngOnInit(): void {
      if(this.dataEmployee){
        this.formEmployee.patchValue({
          name:this.dataEmployee.name,
          surname:this.dataEmployee.surname,
          idDepartment:this.dataEmployee.idDepartment,
          Salary:this.dataEmployee.salary,
          contractDate:moment.default(this.dataEmployee.contractDate,'DD/MM/YYYY')
        })

        this.ActionTitle="Edit"
        this.ActionButton="Save"
      }
    }
}
