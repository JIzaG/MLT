import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Store } from '@ngrx/store';

import { BasePageComponent } from '../../base-page';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOption } from '../../../ui/interfaces/option';
import { TCModalService } from '../../../ui/services/modal/modal.service';
import { ICitas } from '../../../interfaces/citas';
import {PacientesService} from '../../../services/pacientes/pacientes.service';



@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent extends BasePageComponent implements OnInit, OnDestroy {
  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;

  citas: any [];
  citasForm: FormGroup;
  gender: IOption[];
  status: IOption[];

  //---------------------------
  fechaC: string;
  identidadPACC:string;
  identidadC:string;
  pacienteC: string;
  procedimientoC:string;
  tituloC:string;
  dientesC:string;
  cuadrantesC:string;
  maxilarC:string;

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private modal: TCModalService,
    private formBuilder: FormBuilder,
    private patientService: PacientesService,
  ) {
    super(store, httpSv);
    
    this.pageData = {
      title: 'Citas Clinicas',
      breadcrumbs: [
        {
          title: 'Medicine',
          route: 'citas'
        },
        {
          title: 'Citas Clinicas'
        }
      ]
    };
     this.citas = [];
    
    
     
  }

  ngOnInit() {
  
   
  }
  openModal(body: any, header: any = null, footer: any = null, data: any = null) {
    this.initForm(data);

    this.modal.open({
      body: body,
      header: header,
      footer: footer
    });
  }

  closeModal() {
    this.modal.close();
    this.citasForm.reset();
  }

  initForm(data: any) {
    this.citasForm = this.formBuilder.group({
      // img: [(data ? data.img : this.currentAvatar)],
      //name: [(data ? data.name : ''), Validators.required],
      //email: [(data ? data.email : ''), Validators.required],
      //date: [(data ? data.date : ''), Validators.required],
      //from: [(data ? data.fromTo.substring(0, (data.fromTo.indexOf('-') - 1)) : ''), Validators.required],
      //to: [(data ? data.fromTo.substring((data.fromTo.indexOf('-') + 2), data.fromTo.length) : ''), Validators.required],
      //number: [(data ? data.number : ''), Validators.required],
      //doctor: [(data ? data.doctor : ''), Validators.required],
      //injury: [(data ? data.injury : ''), Validators.required],

      fechaC: [(data ? data.fechaC : ''), Validators.required],
      identidadPACC: [(data ? data.identidadPACC : ''), Validators.required],
      identidadC: [(data ? data.identidadC : ''), Validators.required],
      pacienteC: [(data ? data.pacienteC : ''), Validators.required],
      procedimientoC: [(data ? data.procedimientoC : ''), Validators.required],
      tituloC: [(data ? data.tituloC : ''), Validators.required],
      dientesC: [(data ? data.dientesC : ''), Validators.required],
      cuadrantesC: [(data ? data.cuadrantesC : ''), Validators.required],
      maxilarC: [(data ? data.maxilarC : ''), Validators.required],

      // fechaC: string;
      // identidadPACC:string;
      // identidadC:string;
      // pacienteC: string;
      // procedimientoC:string;
      // tituloC:string;
      // dientesC:string;
      // cuadrantesC:string;
      // maxilarC:string;

    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  edit(row: any) {

   console.log(row);
   this.openModal(this.modalBody, 'Editar Cita', this.modalFooter, row);

  }

  async eliminarAgenda(id: string){
    // this.patientService.deleteAgendaPaciente(id);
    console.log(id);

  }

}
