import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { tap } from 'rxjs/internal/operators/tap';
import { filter } from 'rxjs/internal/operators/filter';
import {
  Directive,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { AuthFacade } from '@kirby/authentication-data-access';

@Directive({ selector: '[kirbyCan]' })
export class CanDirective implements OnDestroy {
  @Input()
  set kirbyCan(permissionName: string) {
    this.authFacade.authUser$
      .pipe(
        tap(user => this.remove()),
        filter(user => !!user),
        tap(user => (user.can(permissionName) ? this.show() : this.remove())),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private destroy$ = new Subject();

  public constructor(
    private authFacade: AuthFacade,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public show() {
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  public remove() {
    this.viewContainer.clear();
  }
}
