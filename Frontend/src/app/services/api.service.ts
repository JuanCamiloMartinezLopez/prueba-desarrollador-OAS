import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Marcador } from '../models/marcador';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  URL_API = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getPartido(id: string) {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get(this.URL_API + '/partido/' + id);
  }

  getEquipos() {
    return this.http.get(this.URL_API + '/equipos');
  }

  setMarcador(id: string, marcador1: number, marcador2: number) {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.post(this.URL_API + '/partido/marcador/' + id + '/', {
      marcador1: marcador1,
      marcador2: marcador2,
    });
  }

  setPartido(id: string, equipo1: String, equipo2: String) {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.post(this.URL_API + '/partido/equipos/' + id + '/', {
      equipo1: equipo1,
      equipo2: equipo2,
    });
  }
  setClasificado(idClas: any, nEquipo: any, nombre: any, idE: any) {
    let params = new HttpParams();
    return this.http.post(this.URL_API + '/clasificarEquipo/', {
      idClas: idClas,
      numE: nEquipo,
      nombre: nombre,
      id: idE,
    });
  }
}
