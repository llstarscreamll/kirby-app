import { Directive, Input } from '@angular/core';
import { NgModule, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[kirbyCan]' })
export class MockCanDirective {
  @Input()
  set kirbyCan(permissionName: string) {
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}
}

@Directive({ selector: '[kirbyCant]' })
export class MockCantDirective {
  @Input()
  set kirbyCant(permissionName: string) {
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}
}

@Directive({ selector: '[kirbyCanAny]' })
export class MockCanAnyDirective {
  @Input()
  set kirbyCanAny(permissions: string[]) {
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}
}

@NgModule({
  declarations: [MockCanDirective, MockCantDirective, MockCanAnyDirective],
  exports: [MockCanDirective, MockCantDirective, MockCanAnyDirective],
})
export class AuthorizationUiTestModule {}
