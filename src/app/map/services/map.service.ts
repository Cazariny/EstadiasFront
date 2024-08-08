import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '@env/environments';
import { Observable } from 'rxjs';
import { Station } from '../interfaces/stations.interface';
import { ScrapStation } from '../interfaces/scrapStations.interface';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }
  private readonly baseUrl = environments.baseUrl
  private http = inject(HttpClient)

  getStations():Observable<Station[]>{
    const url = `${this.baseUrl}/stations/map`;
    return this.http.get<Station[]>(url)
  }

  getScrapStations(): Observable<ScrapStation[]>{
    const url = `${this.baseUrl}/stations/map/scrap`;
    return this.http.get<ScrapStation[]>(url)
  }

  getDataStationById(station_id_uuid: string): Observable<any>{
    const url = `${this.baseUrl}/stations/map/${station_id_uuid}`;
    return this.http.get(url)
  }

  getScrapDataStationById(station_id_uuid: string): Observable<any>{
    const url = `${this.baseUrl}/stations/map/scrap/${station_id_uuid}`;
    return this.http.get(url)
  }

  downloadStationDataCSV(startDate: string, endDate: string, stationId: string): Observable<Blob> {
    const url = `${this.baseUrl}/stations/download?startDate=${startDate}&endDate=${endDate}&stationId=${stationId}`
    return this.http.get(url,{
      responseType: 'blob'
    });
  }

  downloadScrapStationDataCSV(startDate: string, endDate: string, stationId: string): Observable<Blob> {
    const url = `${this.baseUrl}/stations/scrap/download/?startDate=${startDate}&endDate=${endDate}&stationId=${stationId}`
    console.log(url)
    return this.http.get(url,{
      responseType: 'blob'
    });
  }


  tempFToC(temp: any){
    const tempC = (((temp-32) * 5) / 9)
    return tempC
  }

  barConvertMmHg (bar: any) {
    const barMmHg = bar * 25.4
    return barMmHg
  }


}
