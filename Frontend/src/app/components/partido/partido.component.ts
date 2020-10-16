import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AppComponent } from '../../app.component';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.css'],
})
export class PartidoComponent implements OnInit {
  @Input() izquierda: Boolean;
  @Input() Final: Boolean;
  @Input() id: string;
  @Input() idClas: string;
  @Input() editNames: Boolean = true;

  partido: any;
  closeResult: string;
  Equipo1: String;
  Equipo2: String;
  Marcador1: number;
  Marcador2: number;
  formGNombres: FormGroup;
  formGMarcadores: FormGroup;
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private service: ApiService,
    private padre: AppComponent
  ) {}

  ngOnInit(): void {
    this.service.getPartido(this.id).subscribe((partido) => {
      this.partido = partido;
      this.Equipo1 = this.partido.equipo1;
      this.Equipo2 = this.partido.equipo2;
      this.Marcador1 = this.partido.marcador1;
      this.Marcador2 = this.partido.marcador2;
      //console.log(this.partido);
    });

    this.Equipo1 = null;
    this.Equipo2 = null;
    this.Marcador1 = null;
    this.Marcador2 = null;
    this.inicioForms();
  }

  public actualizarDatos() {
    this.service.getPartido(this.id).subscribe((partido) => {
      this.partido = partido;
      console.log('1', this.partido);
      console.log('2', partido);
      if (this.partido.equipo1 != '') {
        this.Equipo1 = this.partido.equipo1;
        console.log('equipo1', this.partido.equipo1);
      }
      if (this.partido.equipo2 != '') {
        this.Equipo2 = this.partido.equipo2;
        console.log('equipo2', this.partido.equipo2);
      }

      //console.log(this.partido);
      console.log('Luego de actualizar', this.Equipo1, this.Equipo2);
    });
  }

  inicioForms() {
    this.formGNombres = this.fb.group({
      equipo1: null,
      equipo2: null,
    });

    this.formGMarcadores = this.fb.group({
      marcador1: null,
      marcador2: null,
    });
  }

  onSubmitNombres(modal: any) {
    this.service
      .setPartido(
        this.id,
        this.formGNombres.value.equipo1,
        this.formGNombres.value.equipo2
      )
      .subscribe((res) => {
        this.Equipo1 = res.equipo1;
        this.Equipo2 = res.equipo2;
        console.log(res);
      });
    console.log(this.formGNombres);
    modal.close('Save click');
  }

  onSubmitMarcadores(modal: any) {
    this.service
      .setMarcador(
        this.id,
        this.formGMarcadores.value.marcador1,
        this.formGMarcadores.value.marcador2
      )
      .subscribe((res) => {
        this.Marcador1 = res.marcador1;
        this.Marcador2 = res.marcador2;
        //console.log(res);

        if (!this.Final) {
          if (this.Marcador1 !== this.Marcador2) {
            var nombre;
            var idE;
            var numE;
            if (this.Marcador1 > this.Marcador2) {
              nombre = this.Equipo1;
              idE = res.Id1;
            }
            if (this.Marcador1 < this.Marcador2) {
              nombre = this.Equipo2;
              idE = res.Id2;
            }
            if (this.id == '0' || this.id == '1' || this.id == '4') {
              numE = 1;
            }
            if (this.id == '2' || this.id == '3' || this.id == '5') {
              numE = 2;
            }
            console.log('antes:', this.idClas, numE, nombre, idE);
            this.service
              .setClasificado(this.idClas, numE, nombre, idE)
              .subscribe((res) => {
                this.padre.actualizarPartido(this.idClas);
                //console.log(res);
              });
          }
        }
      });

    console.log(this.formGMarcadores);
    modal.close('Save click');
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(
            reason,
            content
          )}`;
        }
      );
  }

  private getDismissReason(reason: any, content: any): string {
    if (reason === ModalDismissReasons.ESC) {
      if (content._declarationTContainer.localNames[0] === 'formNombres') {
        if (this.Equipo1 === null) {
          this.formGNombres.value.equipo1 = null;
        }
        if (this.Equipo2 === null) {
          this.formGNombres.value.equipo2 = null;
        }
      } else {
        console.log(content._declarationTContainer.localNames[0]);
        if (this.Marcador1 === null) {
          console.log(this.Marcador1);
          this.formGMarcadores.value.marcador1 = null;
        }
        if (this.Marcador2 === null) {
          this.formGMarcadores.value.marcador2 = null;
        }
      }

      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      if (content._declarationTContainer.localNames[0] === 'formNombres') {
        if (this.formGNombres.value.equipo1 === '') {
          this.formGNombres.value.equipo1 = '';
        }
        if (this.formGNombres.value.equipo2 === '') {
          this.formGNombres.value.equipo2 = '';
        }
      } else {
        if (this.formGMarcadores.value.marcador1 === null) {
          this.formGMarcadores.value.marcador1 = null;
        }
        if (this.formGMarcadores.value.marcador2 === null) {
          this.formGMarcadores.value.marcador2 = null;
        }
      }
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
