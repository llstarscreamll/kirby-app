import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WelcomePageComponent } from './welcome-page.component';
import { TESTING_PROVIDERS, TESTING_IMPORTS } from '../../utils/testing';
import { of } from 'rxjs/internal/observable/of';

describe('WelcomePageComponent', () => {
  let component: WelcomePageComponent;
  let fixture: ComponentFixture<WelcomePageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ...TESTING_IMPORTS
      ],
      declarations: [WelcomePageComponent],
      providers: [...TESTING_PROVIDERS]
    }).compileComponents();
  }));

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
