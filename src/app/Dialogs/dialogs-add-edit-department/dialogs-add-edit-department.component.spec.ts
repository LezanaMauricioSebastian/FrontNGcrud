import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogsAddEditDepartmentComponent } from './dialogs-add-edit-department.component';

describe('DialogsAddEditDepartmentComponent', () => {
  let component: DialogsAddEditDepartmentComponent;
  let fixture: ComponentFixture<DialogsAddEditDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogsAddEditDepartmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogsAddEditDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
