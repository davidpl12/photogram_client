import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamaraDetailComponent } from './camara-detail.component';

describe('CamaraDetailComponent', () => {
  let component: CamaraDetailComponent;
  let fixture: ComponentFixture<CamaraDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CamaraDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamaraDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
