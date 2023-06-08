import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguidoresComponent } from './seguidores.component';

describe('SeguidoresComponent', () => {
  let component: SeguidoresComponent;
  let fixture: ComponentFixture<SeguidoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguidoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeguidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
