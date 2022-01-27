import { ApplicationRef, ComponentFactoryResolver, Directive, ElementRef, HostListener, Injector, Input, Renderer2 } from "@angular/core";
import { LocationStrategy } from "@angular/common";
import { ActivatedRoute, Router, RouterLinkWithHref } from "@angular/router";
import { LuJsonService } from "../../services";
import { TooltipDirective } from "../tooltip.directive";

@Directive({
  selector: "a[luxFetchObject]"
})
export class ObjectDirective extends RouterLinkWithHref {
  private tooltipDirective: TooltipDirective;

  @Input("luxFetchObject") set id(id: number) {
    this.routerLink = "/objects/"+id;
    this.element.nativeElement.textContent = `#${id}`;
    this.luJson.getObject(id).subscribe(this.onObject.bind(this));
  }

  constructor(
    private luJson: LuJsonService,
    private element: ElementRef<HTMLAnchorElement>,
    router: Router,
    route: ActivatedRoute,
    locationStrategy: LocationStrategy,
    applicationRef: ApplicationRef,
    renderer: Renderer2,
    injector: Injector,
    resolver: ComponentFactoryResolver
  ) {
    super(router, route, locationStrategy);
    this.tooltipDirective = new TooltipDirective(element, applicationRef, renderer, injector, resolver);
  }

  onObject(object: any) {
    if (object.displayName) {
      this.element.nativeElement.textContent = object.displayName;
    } else if (object.name) {
      this.element.nativeElement.textContent = object.name;
    }
    if (object.description) {
      this.tooltipDirective.content = object.description;
    } else if (object._internalNotes) {
      this.tooltipDirective.content = object._internalNotes;
    }
  }

  @HostListener('mouseenter')
  mouseenter() {
    this.tooltipDirective.mouseenter();
  }

   @HostListener('mouseout', ['$event.toElement', '$event.relatedTarget'])
  mouseout(toElement, relatedTarget) {
    this.tooltipDirective.mouseout(toElement, relatedTarget);
  }

  ngOnDestroy() {
    this.tooltipDirective.ngOnDestroy();
  }
}
