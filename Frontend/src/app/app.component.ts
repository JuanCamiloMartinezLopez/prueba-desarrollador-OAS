import { Component, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PartidoComponent } from './components/partido/partido.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Frontend';

  closeResult: string;

  @ViewChild('1') partido4: PartidoComponent;
  @ViewChild('2') partido5: PartidoComponent;
  @ViewChild('3') partido6: PartidoComponent;

  constructor(private modalService: NgbModal, private service: ApiService) {}

  equipos: any;

  actualizarPartido(numero: string) {
    if (numero == '4') {
      this.partido4.actualizarDatos();
    }
    if (numero == '5') {
      this.partido5.actualizarDatos();
    } else {
      this.partido6.actualizarDatos();
    }
  }

  open(content) {
    this.service.getEquipos().subscribe((equipos) => {
      this.equipos = equipos;
      console.log(this.equipos);
      this.modalService
        .open(content, { ariaLabelledBy: 'modal-basic-title' })
        .result.then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
