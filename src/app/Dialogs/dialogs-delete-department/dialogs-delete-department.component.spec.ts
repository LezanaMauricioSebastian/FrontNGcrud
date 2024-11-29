import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogsDeleteDepartmentComponent } from './dialogs-delete-department.component';

describe('DialogsDeleteDepartmentComponent', () => {
  let component: DialogsDeleteDepartmentComponent;
  let fixture: ComponentFixture<DialogsDeleteDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogsDeleteDepartmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogsDeleteDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
