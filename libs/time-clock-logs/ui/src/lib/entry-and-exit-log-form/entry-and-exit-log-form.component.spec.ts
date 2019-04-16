import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryAndExitLogFormComponent } from './entry-and-exit-log-form.component';

describe('EntryAndExitLogFormComponent', () => {
  let component: EntryAndExitLogFormComponent;
  let fixture: ComponentFixture<EntryAndExitLogFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryAndExitLogFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryAndExitLogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
