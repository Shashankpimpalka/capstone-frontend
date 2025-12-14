import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtorCreateComponent } from './actor-create.component';

describe('AtorCreateComponent', () => {
  let component: AtorCreateComponent;
  let fixture: ComponentFixture<AtorCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtorCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
