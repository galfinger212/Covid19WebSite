import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCovidComponent } from './main-covid.component';

describe('MainCovidComponent', () => {
  let component: MainCovidComponent;
  let fixture: ComponentFixture<MainCovidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCovidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
