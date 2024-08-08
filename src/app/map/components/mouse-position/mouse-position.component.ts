import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import ControlMousePosition from 'ol/control/MousePosition';
import { CoordinateFormat, format } from 'ol/coordinate';
import Map from 'ol/Map';

@Component({
  selector: 'map-mouse-position',
  standalone: true,
  imports: [],
  template: ``,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MousePositionComponent implements OnChanges {
  @Input() map!: Map;
  @Input() positionTemplate!: string;
  control!: ControlMousePosition;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['map'] && this.map) {
      this.initializeMousePositionControl();
    }
  }

  initializeMousePositionControl() {
    const customFormat: CoordinateFormat = (coordinate: number[] | undefined) =>
      format(coordinate || [0, 0], this.positionTemplate);

    this.control = new ControlMousePosition({
      className: 'mouseposition-control',
      coordinateFormat: customFormat,
      target: this.elementRef.nativeElement,
    });
    this.map.addControl(this.control);
  }
}
