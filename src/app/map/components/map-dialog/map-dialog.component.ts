import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import moment from 'moment';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'map-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButton,
  ],
  providers: [MatDatepickerModule],
  templateUrl: './map-dialog.component.html',
  styleUrl: './map-dialog.component.css',
})
export class MapDialogComponent {
  startDate!: string;
  endDate!: string;
  isFormValid: boolean = false;
  errorMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<MapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { stationId: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onAccept(): void {
    // Formatear la fecha a 'dd-m-aaa'
    const formStartDate = moment(this.startDate).format('l');
    const formEndDate = moment(this.endDate).format('l');

    this.dialogRef.close({
      startDate: formStartDate,
      endDate: formEndDate,
    });
  }

  validateDates(): void {
    this.errorMessage = '';
    if (!this.startDate || !this.endDate) {
      this.isFormValid = false;
      this.errorMessage = 'Por favor introduce 2 fechas';
    } else {
      const start = moment(this.startDate);
      const end = moment(this.endDate);
      if (start.isAfter(end)) {
        this.isFormValid = false;
        this.errorMessage = 'La fecha de Inicio no debe de ser menor que la fecha final';
      } else {
        this.isFormValid = true;
      }
    }
  }
}
