import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryAndExitLogPageComponent } from './entry-and-exit-log-page.component';

describe('EntryAndExitLogPageComponent', () => {
  let component: EntryAndExitLogPageComponent;
  let fixture: ComponentFixture<EntryAndExitLogPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryAndExitLogPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryAndExitLogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
