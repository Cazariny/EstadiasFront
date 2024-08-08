import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  TemplateRef,
  inject,
  ViewContainerRef,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import {
  Overlay,
  OverlayPositionBuilder,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

import { Feature, Map, View } from 'ol';
import { Point } from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import { OSM } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';

import { PopoverContentComponent } from './components/popover/popover.component';
import { MapHandlerComponent } from './components/map-handler/map-handler.component';
import { MousePositionComponent } from './components/mouse-position/mouse-position.component';
import { ScalelineComponent } from './components/scaleline/scaleline.component';
import { StationInfo } from './interfaces/stationInfo.interface';
import { Station } from './interfaces/stations.interface';
import { MapService } from './services/map.service';
import { ScrapStation } from './interfaces/scrapStations.interface';
import { ScrapStationInfo } from './interfaces/scrapStationInfo.interface';

@Component({
  selector: 'map-map',
  standalone: true,
  imports: [
    MapHandlerComponent,
    ScalelineComponent,
    MousePositionComponent,
    RouterModule,
    CommonModule,
    PopoverContentComponent,
  ],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
// export class MapComponent implements AfterViewInit {
//   @ViewChild('tooltipElement') tooltipElement!: TemplateRef<any>;
//   @ViewChild('olMap') mapElement!: ElementRef;

//   map!: Map;
//   overlayRef!: OverlayRef;
//   vectorSource!: VectorSource;
//   private mapService = inject(MapService);
//   private overlay = inject(Overlay);
//   private overlayPositionBuilder = inject(OverlayPositionBuilder);
//   private viewContainerRef = inject(ViewContainerRef);
//   private cdr = inject(ChangeDetectorRef);

//   constructor(public dialog: MatDialog) {}
//   ngAfterViewInit(): void {
//     this.initializeMap();
//     this.loadStations();
//     this.cdr.detectChanges();
//   }

//   initializeMap(): void {
//     this.vectorSource = new VectorSource();

//     const vectorLayer = new VectorLayer({
//       source: this.vectorSource,
//     });

//     this.map = new Map({
//       layers: [
//         new TileLayer({
//           source: new OSM(),
//         }),
//         vectorLayer,
//       ],
//       target: this.mapElement.nativeElement,
//       view: new View({
//         center: fromLonLat([-101.70388, 19.42893]),
//         zoom: 9,
//         minZoom: 9,
//         maxZoom: 12,
//       }),
//     });

//     this.addMapEventHandlers();
//   }

//   addMapEventHandlers(): void {
//     this.map.on('click', this.onMapClick.bind(this));
//     this.map.on('pointermove', this.onPointerMove.bind(this));
//     this.map.on('movestart', this.disposePopover.bind(this));
//   }

//   onMapClick(evt: any): void {
//     const feature = this.map.forEachFeatureAtPixel(
//       evt.pixel,
//       (feature) => feature
//     );
//     this.disposePopover();
//     if (!feature) return;

//     const stationId = feature.get('station_id_uuid');
//     this.mapService
//       .getDataStationById(stationId)
//       .subscribe((data: StationInfo) => {
//         const sensors = data.sensors.find(
//           (sensor) => sensor.sensor_type === 23
//         );
//         const temp_out = sensors?.data[0]?.temp_out;
//         const hum_out = sensors?.data[0]?.hum_out;
//         const bar = sensors?.data[0]?.bar;

//         const content = {
//           name: feature.get('name'),
//           stationId: feature.get('station_id_uuid'),
//           temp: this.mapService.tempFToC(temp_out).toFixed(2),
//           hum: hum_out,
//           pressure: this.mapService.barConvertMmHg(bar).toFixed(2),
//         };

//         this.showPopover(content, evt.coordinate);
//       });
//   }
//   onPointerMove(e: any): void {
//     const pixel = this.map.getEventPixel(e.originalEvent);
//     const hit = this.map.hasFeatureAtPixel(pixel);
//     this.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
//   }

//   showPopover(content: any, coordinate: any): void {
//     const pixel = this.map.getPixelFromCoordinate(coordinate);
//     const mapElementRect =
//       this.mapElement.nativeElement.getBoundingClientRect();
//     const positionStrategy = this.overlayPositionBuilder
//       .flexibleConnectedTo({
//         x: mapElementRect.left + pixel[0],
//         y: mapElementRect.top + pixel[1],
//       })
//       .withPositions([
//         {
//           originX: 'center',
//           originY: 'bottom',
//           overlayX: 'center',
//           overlayY: 'top',
//         },
//       ]);

//     this.overlayRef = this.overlay.create({
//       hasBackdrop: true,
//       backdropClass: 'cdk-overlay-transparent-backdrop',
//       positionStrategy,
//     });

//     this.overlayRef.attach(
//       new TemplatePortal(this.tooltipElement, this.viewContainerRef, {
//         $implicit: content,
//         closePopover: () => this.disposePopover(),
//       })
//     );

//     this.overlayRef.backdropClick().subscribe(() => this.disposePopover());
//   }

//   disposePopover(): void {
//     if (this.overlayRef) {
//       this.overlayRef.dispose();
//       // this.overlayRef = null;
//     }
//   }

//   loadStations(): void {
//     this.mapService.getStations().subscribe((data: Station[]) => {
//       data.forEach((station) => {
//         const iconFeature = this.createIconFeature(station);
//         this.vectorSource.addFeature(iconFeature);
//       });
//     });
//   }

//   createIconFeature(station: Station): Feature {
//     const iconFeature = new Feature({
//       geometry: new Point(fromLonLat([station.longitude, station.latitude])),
//       name: station.station_name,
//       station_id_uuid: station.station_id_uuid,
//     });

//     const iconStyle = new Style({
//       image: new Icon({
//         anchor: [0.5, 46],
//         anchorXUnits: 'fraction',
//         anchorYUnits: 'pixels',
//         src: 'assets/img/5_sm_h.png',
//       }),
//     });

//     iconFeature.setStyle(iconStyle);
//     return iconFeature;
//   }
// }
export class MapComponent implements AfterViewInit {
  @ViewChild('tooltipElement') tooltipElement!: TemplateRef<any>;
  @ViewChild('olMap') mapElement!: ElementRef;

  map!: Map;
  overlayRef!: OverlayRef;
  vectorSource!: VectorSource;
  private mapService = inject(MapService);
  private overlay = inject(Overlay);
  private overlayPositionBuilder = inject(OverlayPositionBuilder);
  private viewContainerRef = inject(ViewContainerRef);
  private cdr = inject(ChangeDetectorRef);

  constructor(public dialog: MatDialog) {}

  ngAfterViewInit(): void {
    this.initializeMap();
    this.loadAllStations();
    this.cdr.detectChanges();
  }

  initializeMap(): void {
    this.vectorSource = new VectorSource();

    const vectorLayer = new VectorLayer({
      source: this.vectorSource,
    });

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      target: this.mapElement.nativeElement,
      view: new View({
        center: fromLonLat([-101.70388, 19.42893]),
        zoom: 9,
        minZoom: 9,
        maxZoom: 12,
      }),
    });

    this.addMapEventHandlers();
  }

  addMapEventHandlers(): void {
    this.map.on('click', this.onMapClick.bind(this));
    this.map.on('pointermove', this.onPointerMove.bind(this));
    this.map.on('movestart', this.disposePopover.bind(this));
  }

  onMapClick(evt: any): void {
    const feature = this.map.forEachFeatureAtPixel(
      evt.pixel,
      (feature) => feature
    );
    this.disposePopover();
    if (!feature) return;

    const stationId = feature.get('station_id_uuid');
    const isScrapStation = feature.get('isScrapStation');

    if (isScrapStation) {
      // Fetch and display data for scrap stations
      this.mapService
        .getScrapDataStationById(stationId)
        .subscribe((data: ScrapStationInfo) => {
          const content = {
            name: feature.get('name'),
            stationId: feature.get('station_id_uuid'),
            temp: this.mapService.tempFToC(data.temperature).toFixed(2),
            horagGen: data.horagGen,
            isScrapStation: true
          };

          this.showPopover(content, evt.coordinate);
        });
    } else {
      // Fetch and display data for regular stations
      this.mapService
        .getDataStationById(stationId)
        .subscribe((data: StationInfo) => {
          const sensors = data.sensors.find(
            (sensor) => sensor.sensor_type === 23
          );
          const temp_out = sensors?.data[0]?.temp_out;
          const hum_out = sensors?.data[0]?.hum_out;
          const bar = sensors?.data[0]?.bar;

          const content = {
            name: feature.get('name'),
            stationId: feature.get('station_id_uuid'),
            temp: this.mapService.tempFToC(temp_out).toFixed(2),
            hum: hum_out,
            pressure: this.mapService.barConvertMmHg(bar).toFixed(2),
          };

          this.showPopover(content, evt.coordinate);
        });
    }
  }

  onPointerMove(e: any): void {
    const pixel = this.map.getEventPixel(e.originalEvent);
    const hit = this.map.hasFeatureAtPixel(pixel);
    this.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
  }

  showPopover(content: any, coordinate: any): void {
    const pixel = this.map.getPixelFromCoordinate(coordinate);
    const mapElementRect =
      this.mapElement.nativeElement.getBoundingClientRect();
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo({
        x: mapElementRect.left + pixel[0],
        y: mapElementRect.top + pixel[1],
      })
      .withPositions([
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
        },
      ]);

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy,
    });

    this.overlayRef.attach(
      new TemplatePortal(this.tooltipElement, this.viewContainerRef, {
        $implicit: content,
        closePopover: () => this.disposePopover(),
      })
    );

    this.overlayRef.backdropClick().subscribe(() => this.disposePopover());
  }

  disposePopover(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      // this.overlayRef = null;
    }
  }

  loadAllStations(): void {
    // Load regular stations
    this.mapService.getStations().subscribe((data: Station[]) => {
      data.forEach((station) => {
        const iconFeature = this.createIconFeature(station, false);
        this.vectorSource.addFeature(iconFeature);
      });
    });

    // Load scrap stations
    this.mapService.getScrapStations().subscribe((data: ScrapStation[]) => {
      data.forEach((station) => {
        const iconFeature = this.createIconFeature(station, true);
        this.vectorSource.addFeature(iconFeature);
      });
    });
  }

  createIconFeature(station: Station | ScrapStation, isScrapStation: boolean): Feature {
    const iconFeature = new Feature({
      geometry: new Point(fromLonLat([station.longitude, station.latitude])),
      name: station.station_name,
      station_id_uuid: station.station_id_uuid,
      isScrapStation,
    });

    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'assets/img/5_sm_h.png',
      }),
    });

    iconFeature.setStyle(iconStyle);
    return iconFeature;
  }
}
