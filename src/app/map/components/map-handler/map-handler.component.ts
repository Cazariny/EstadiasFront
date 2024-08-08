import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import Map from 'ol/Map';

@Component({
  selector: 'map-map-handler',
  standalone: true,
  imports: [],
  template: ``,
  styles: `
    :host {
      width: 100%;
      height: 100%;
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapHandlerComponent implements OnChanges {
  @Input() map!: Map;
  private elementRef = inject(ElementRef);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['map'] && this.map) {
      this.setMapTarget();
    }
  }
  setMapTarget(): void {
    // Aquí puedes realizar las operaciones necesarias con el mapa
    this.map.setTarget(this.elementRef.nativeElement);
  }
}
