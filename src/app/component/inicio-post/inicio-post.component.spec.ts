import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioPostComponent } from './inicio-post.component';

describe('InicioPostComponent', () => {
  let component: InicioPostComponent;
  let fixture: ComponentFixture<InicioPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
