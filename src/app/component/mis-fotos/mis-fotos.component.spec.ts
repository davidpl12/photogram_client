import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisFotosComponent } from './mis-fotos.component';

describe('MisFotosComponent', () => {
  let component: MisFotosComponent;
  let fixture: ComponentFixture<MisFotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisFotosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
