import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BasePageComponent } from '../../base-page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { TCModalService } from '../../../ui/services/modal/modal.service';
import { IUser } from '../../../ui/interfaces/user';
import {PacientesService} from '../../../services/pacientes/pacientes.service';
import { id } from '@swimlane/ngx-charts/release/utils';
import { IOption } from '../../../ui/interfaces/option';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss']
})
export class HistoriaClinicaComponent extends BasePageComponent implements OnInit, OnDestroy  {
  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;

  appointments: any[];
  appointmentForm: FormGroup;
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  doctors: IUser[];
  agenda: any[];

  SiNo: IOption[];


  //-------------------------------------------

  nombre: string;
  doctor: string;
  email: string;
  fecha: string;
  hi: string;
  hf: string;
  telefono: string;
  procedimiento: string;
  id: string;

    //-------------------------------------------Registrar Historia Clinic
 
    fechaH:string;
    identidadPACH:string;
    pacienteH:string;
    tituloH:string;
    p1:string;
    p2:string;
    p3:string;
    p4:string;
    p5:string;
    p6:string;
    p7:string;
    p8:string;
    p9:string;
  


  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private modal: TCModalService,
    private formBuilder: FormBuilder,

    private patientService: PacientesService,
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Historial Clinico',
      breadcrumbs: [
        {
          title: 'Medicine',
          route: 'default-appointments'
        },
        {
          title: 'Historial Clinico'
        }
      ]
    };

    this.SiNo=[
      {
        label:'Si',
        value:'Si'

      },
      {
        label:'No',
        value:'No'
      }];

    this.appointments = [];
    this.doctors = [];
    this.defaultAvatar = '';
    this.currentAvatar = this.defaultAvatar;
    this.agenda=[];
    //assets/content/anonymous-400.jpg
  }

  ngOnInit() {
    // var myjason:string;
     super.ngOnInit();

     this.patientService.getHistoriaClinica().subscribe(data=>{


      this.appointments=data.map(e=>{
        return {
          id: e.payload.doc.id,
          idEdit: true,
          fechaH: e.payload.doc.data()['fechaH'],
          identidadPACH: e.payload.doc.data()['identidadPACH'],
          pacienteH: e.payload.doc.data()['pacienteH'],
          p1: e.payload.doc.data()['p1'],
          p2: e.payload.doc.data()['p2'],
          p3: e.payload.doc.data()['p3'],
          p4: e.payload.doc.data()['p4'],
          p5: e.payload.doc.data()['p5'],
          p6: e.payload.doc.data()['p6'],
          p7: e.payload.doc.data()['p7'],
          p8: e.payload.doc.data()['p8'],
          p9: e.payload.doc.data()['p9'],

     };

      })
    console.log(this.appointments);
    //   myjason = JSON.stringify(this.appointments);
    //   console.log(myjason);

    })



    this.getData('assets/data/appointments.json', 'appointments', 'setLoaded');
    this.getData('assets/data/doctors.json', 'doctors');


  }


  ngOnDestroy() {
    super.ngOnDestroy();
  }

  // open modal window
  openModal(body: any, header: any = null, footer: any = null, data: any = null) {
    this.initForm(data);

    this.modal.open({
      body: body,
      header: header,
      footer: footer
    });
  }

  // close modal window
  closeModal() {
    this.modal.close();
    this.appointmentForm.reset();
  }

  // init form
  initForm(data: any) {
    this.appointmentForm = this.formBuilder.group({

      
  fechaH: [(data ? data.fechaH : ''), Validators.required],
  identidadPACH: [(data ? data.identidadPACH : ''), Validators.required],
  pacienteH: [(data ? data.pacienteH : ''), Validators.required],
  p1: [(data ? data.p1 : ''), Validators.required],
  p2: [(data ? data.p2 : ''), Validators.required],
  p3: [(data ? data.p3 : ''),Validators.required],
  p4: [(data ? data.p4 : ''), Validators.required],
  p5: [(data ? data.p5 : ''), Validators.required],
  p6: [(data ? data.p6 : ''), Validators.required],
  p7: [(data ? data.p7 : ''),Validators.required],
  p8: [(data ? data.p8 : ''), Validators.required],
  p9: [(data ? data.p9 : ''), Validators.required],
  
    });
  }

  // upload new file


  // edit appointment
  edit(row: any) {

    this.fechaH=row.fechaH;
    this.identidadPACH=row.identidadPACH;
    this.pacienteH=row.pacienteH;
    this.p1=row.p1;
    this.p2=row.p2;
    this.p3=row.p3;
    this.p4=row.p4;
    this.p5=row.p5;
    this.p6=row.p6;
    this.p7=row.p7;
    this.p8=row.p8;
    this.p9=row.p9;
    this.id=row.id;

   console.log(row);
   this.openModal(this.modalBody, 'Historial Clinico', this.modalFooter, row);

  }



  async actualizarHistorial(){

    let row= {};
    row['fechaH'] = this.fechaH;
    row['identidadPACH'] = this.identidadPACH;
    row['pacienteH'] = this.pacienteH;
    row['p1'] = this.p1;
    row['p2'] = this.p2;
    row['p3'] = this.p3;
    row['p4'] = this.p4;
    row['p5'] = this.p5;
    row['p6'] = this.p6;
    row['p7'] = this.p7;
    row['p8'] = this.p8;
    row['p9'] = this.p9;

    this.patientService.updateHistoriaClinica(this.id, row);
    this.closeModal();
  }



  async eliminarhsitorial(id: string){
    this.patientService.deleteHistoriaClinica(id);
    console.log(id);

  }









  // add new appointment

  addAppointment(form: FormGroup) {
    if (form.valid) {
      let newAppointment: any = form.value;

      newAppointment.fromTo = `${form.value.from} - ${form.value.to}`;
      newAppointment.img = this.currentAvatar;

      delete newAppointment.from;
      delete newAppointment.to;

      this.appointments.unshift(newAppointment);
      let newTableData = JSON.parse(JSON.stringify(this.appointments));

      this.appointments = newTableData;
      this.closeModal();
    }
  }
}
