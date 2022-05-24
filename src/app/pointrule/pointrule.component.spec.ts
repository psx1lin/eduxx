import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointruleComponent } from './pointrule.component';

describe('PointruleComponent', () => {
  let component: PointruleComponent;
  let fixture: ComponentFixture<PointruleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointruleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointruleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
