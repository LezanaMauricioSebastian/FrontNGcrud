import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { Employee } from '../../Interfaces/employee';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent {
  ActionTitle:string="delete";
  constructor(private Resultdialog:MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dataEmployee: Employee){}



    confirmnDelete(){
      if(this.dataEmployee){
        this.Resultdialog.close("delete")
      }
    }

}
