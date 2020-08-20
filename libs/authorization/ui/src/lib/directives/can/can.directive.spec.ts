import { from } from 'rxjs';
import { Component, TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';

import { User } from '@kirby/users/util';
import { CanDirective } from './can.directive';
import { AuthFacade } from '@kirby/authentication-data-access';

@Component({
  template: `
    <div *kirbyCan="'posts.create'">You can create posts data</div>
    <div *kirbyCan="'posts.delete'">You can delete posts data</div>
  `
})
class TestComponent {}

describe('CanDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let authFacade: AuthFacade;
  const userMock = User.fromJson({
    id: '1',
    first_name: 'Tony',
    last_name: 'Stark',
    email: 'tony@stark.com',
    roles: [
      {
        id: 1,
        name: 'admin',
        display_name: 'admin',
        description: 'admin can do anything',
        permissions: [
          {
            id: 1,
            name: 'posts.create',
            display_name: 'create posts'
          }
        ]
      }
    ]
  });

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [CanDirective, TestComponent],
      providers: [
        { provide: AuthFacade, useValue: { authUser$: from([userMock]) } }
      ]
    }).createComponent(TestComponent);

    authFacade = TestBed.inject(AuthFacade);
  });

  it('should create an instance', () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should display element if user has permission', () => {
    fixture.detectChanges();

    const template: HTMLDivElement = fixture.nativeElement;

    expect(template.textContent).toContain('You can create posts data');
    expect(template.textContent).not.toContain('You can delete posts data');
  });
});
