import { NgModule, TemplateRef, ViewContainerRef } from '@angular/core';
import { Directive, Input } from '@angular/core';

@Directive({ selector: '[kirbyCan]' })
export class CanDirective {
  @Input()
  set kirbyCan(permissionName: string) {
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}
}

@Directive({ selector: '[kirbyCant]' })
export class CantDirective {
  @Input()
  set kirbyCant(permissionName: string) {
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}
}

@Directive({ selector: '[kirbyCanAny]' })
export class CanAnyDirective {
  @Input()
  set kirbyCanAny(permissions: string[]) {
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}
}

@NgModule({
  declarations: [CanDirective, CantDirective, CanAnyDirective],
  exports: [CanDirective, CantDirective, CanAnyDirective],
})
export class AuthorizationUiTestModule {}
