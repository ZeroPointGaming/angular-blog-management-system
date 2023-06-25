import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserGroupComponent } from './delete-user-group.component';

describe('DeleteUserGroupComponent', () => {
  let component: DeleteUserGroupComponent;
  let fixture: ComponentFixture<DeleteUserGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteUserGroupComponent]
    });
    fixture = TestBed.createComponent(DeleteUserGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
