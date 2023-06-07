import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionesUpdateComponent } from './publicaciones-update.component';

describe('PublicacionesUpdateComponent', () => {
  let component: PublicacionesUpdateComponent;
  let fixture: ComponentFixture<PublicacionesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicacionesUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicacionesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
