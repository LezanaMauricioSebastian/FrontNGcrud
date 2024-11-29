import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Employee } from '../../Interfaces/employee';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Department } from '../../Interfaces/department';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialogs-delete-department',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule],
  templateUrl: './dialogs-delete-department.component.html',
  styleUrl: './dialogs-delete-department.component.css'
})
export class DialogsDeleteDepartmentComponent {
  ActionTitle:string="delete";
  constructor(private Resultdialog:MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDepartment: Department){}



    confirmnDelete(){
      if(this.dataDepartment){
        this.Resultdialog.close("delete")
      }
    }
}
