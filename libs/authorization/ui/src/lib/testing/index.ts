import { NgModule, TemplateRef, ViewContainerRef } from '@angular/core';
import { Directive, Input } from '@angular/core';

@Directive({ selector: '[kirbyCan]' })
class CanDirective {
  @Input()
  set kirbyCan(permissionName: string) {
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  public constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
}

@NgModule({
  declarations: [CanDirective],
  exports: [CanDirective]
})
export class AuthorizationUiTestModule {}
