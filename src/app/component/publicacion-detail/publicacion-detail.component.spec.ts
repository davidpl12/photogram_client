import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionDetailComponent } from './publicacion-detail.component';

describe('PublicacionDetailComponent', () => {
  let component: PublicacionDetailComponent;
  let fixture: ComponentFixture<PublicacionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicacionDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicacionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
