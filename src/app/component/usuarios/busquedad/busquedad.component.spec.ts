import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedadComponent } from './busquedad.component';

describe('BusquedadComponent', () => {
  let component: BusquedadComponent;
  let fixture: ComponentFixture<BusquedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
