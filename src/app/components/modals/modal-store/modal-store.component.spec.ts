import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStoreComponent } from './modal-store.component';

describe('ModalStoreComponent', () => {
  let component: ModalStoreComponent;
  let fixture: ComponentFixture<ModalStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
