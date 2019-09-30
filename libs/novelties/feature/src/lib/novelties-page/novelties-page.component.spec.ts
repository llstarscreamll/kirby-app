import { from } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFacade } from '@kirby/authentication-data-access';
import { NoveltiesFacade } from '@kirby/novelties/data-access';
import { NoveltiesPageComponent } from './novelties-page.component';
import { AuthorizationUiTestModule } from '@kirby/authorization/ui';

class AuthFacadeMock {
  public authUser$ = from([]);
}

describe('NoveltiesPageComponent', () => {
  let component: NoveltiesPageComponent;
  let fixture: ComponentFixture<NoveltiesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AuthorizationUiTestModule],
      declarations: [NoveltiesPageComponent],
      providers: [
        { provide: NoveltiesFacade, useValue: { search: query => true } },
        { provide: AuthFacade, useClass: AuthFacadeMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
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
