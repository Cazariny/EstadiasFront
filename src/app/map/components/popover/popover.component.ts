import { Component, Inject, Input, Provider } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MapService } from '../../services/map.service';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

const MAT_DIALOG_DATA_PROVIDER: Provider = {
  provide: MAT_DIALOG_DATA,
  useValue: {}, // Valor por defecto
};

@Component({
  selector: 'app-popover',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatProgressSpinnerModule],
  template: `
    <div class="bg-sky-100 transparent p-3 rounded-lg space-y-4">
      <button
        type="button"
        class="close"
        aria-label="Close"
        (click)="closePopover()"
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <br />
      <strong class="text-2xl">{{ data.name }}</strong
      ><br />
      <strong class="text-xl" style="display:none">{{ data.stationId }}</strong>
      @if(data.isScrapStation){
      <strong>Temperatura:</strong> {{ data.temp }} °C<br />
      } @else {
      <strong>Temperatura:</strong> {{ data.temp }} °C<br />
      <strong>Humedad:</strong> {{ data.hum }} %<br />
      <strong>Presión:</strong> {{ data.pressure }} mmHg <br />
      }
      <button
        id="open-date-modal"
        class="btn bg-soft-blue"
        (click)="openDateModal(data.stationId, data.name, data.isScrapStation)"
      >
        Descargar Información
      </button>
       @if(isLoading){
      <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
      }
    </div>
  `,
  styles: [],
  providers: [MAT_DIALOG_DATA_PROVIDER],
})
export class PopoverContentComponent {
  @Input() data!: any;
  @Input() closePopover!: () => void;

  isLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public info: any,
    public dialog: MatDialog,
    private mapService: MapService
  ) {}

  openDateModal(stationId: string, stationName: string, isScrapStation:boolean): void {
    const dialogRef = this.dialog.open(MapDialogComponent, {
      width: '450px',
      data: { stationId, stationName, isScrapStation },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onDownloadClick(
          result.startDate,
          result.endDate,
          stationId,
          stationName,
          isScrapStation
        );
      }
    });
  }

  onDownloadClick(
    startDate: string,
    endDate: string,
    stationId: string,
    stationName: string,
    isScrapStation: boolean
  ): void {
    const downloadMethod = isScrapStation
      ? this.mapService.downloadScrapStationDataCSV
      : this.mapService.downloadStationDataCSV;

      console.log(downloadMethod)

      downloadMethod.call(this.mapService, startDate, endDate, stationId).subscribe(
        (response: Blob) => {
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${stationName}-${startDate}-${endDate}-data.csv`;
          a.click();
          window.URL.revokeObjectURL(url);
          this.isLoading = false;
          this.closePopover();
        },
        () => {
          this.isLoading = false;
        }
      );
  }
}
