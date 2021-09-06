import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WelcomePageComponent } from './welcome-page.component';
import { of } from 'rxjs/internal/observable/of';
import { AuthFacade } from '@kirby/authentication/data-access';

describe('WelcomePageComponent', () => {
  let component: WelcomePageComponent;
  let fixture: ComponentFixture<WelcomePageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [],
        declarations: [WelcomePageComponent],
        providers: [{ provide: AuthFacade, useValue: {} }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show auth user name', () => {
    component.user$ = of({ name: 'Tony Stark' });

    fixture.detectChanges();
    const html: HTMLElement = fixture.debugElement.nativeElement;

    expect(html.querySelector('h1').textContent).toContain('Tony Stark');
  });
});
