import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { tap } from 'rxjs/internal/operators/tap';
import { filter } from 'rxjs/internal/operators/filter';
import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';

import { AuthFacade } from '@kirby/authentication-data-access';

@Directive({ selector: '[kirbyCanAny]' })
export class CanAnyDirective implements OnDestroy {
  @Input()
  set kirbyCanAny(permissions: string[]) {
    this.authFacade.authUser$
      .pipe(
        tap((_) => this.remove()),
        filter((user) => !!user),
        tap((user) => (user.canAny(permissions || []) ? this.show() : this.remove())),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private destroy$ = new Subject();

  constructor(
    private authFacade: AuthFacade,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  show() {
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  remove() {
    this.viewContainer.clear();
  }
}
