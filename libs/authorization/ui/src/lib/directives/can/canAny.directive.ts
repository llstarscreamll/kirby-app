import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';

import { AuthFacade } from '@kirby/authentication/data-access';

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
