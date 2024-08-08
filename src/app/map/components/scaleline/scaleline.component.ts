import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { Map } from 'ol';
import ControlScaleLine from 'ol/control/ScaleLine';

@Component({
  selector: 'map-scaleline',
  standalone: true,
  imports: [],
  template: ``,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScalelineComponent implements OnChanges {
  @Input() map!: Map;
  control!: ControlScaleLine;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['map'] && this.map) {
      this.initializeScaleLine();
    }
  }

  initializeScaleLine() {
    this.control = new ControlScaleLine({
      target: this.elementRef.nativeElement.querySelector(
        '.scaleline-container'
      ),
    });
    this.map.addControl(this.control);
  }
}
