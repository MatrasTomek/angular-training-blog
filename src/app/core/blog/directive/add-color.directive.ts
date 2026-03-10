import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAddColor]',
})
export class AddColorDirective {
  constructor(private elementRef: ElementRef) {
    elementRef.nativeElement.style.color = 'blue';
  }
}
