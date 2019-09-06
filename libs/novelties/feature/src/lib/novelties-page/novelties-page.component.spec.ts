import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoveltiesPageComponent } from './novelties-page.component';

describe('NoveltiesPageComponent', () => {
  let component: NoveltiesPageComponent;
  let fixture: ComponentFixture<NoveltiesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoveltiesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoveltiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
