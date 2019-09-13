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
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.scss']
})
export class TratamientoComponent extends BasePageComponent implements OnInit, OnDestroy {
  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;

  appointments: any[];
  appointmentForm: FormGroup;
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  doctors: IUser[];
  agenda: any[];

    //---------------Tratmiento Opciones
    claseesqueletica: IOption[];
    claseM: IOption[];
    apinamiento: IOption[];
    perfil: IOption[];
    claseficacionTratamiento: IOption[];
  

  id: string;
  apinamientoT: string;
  claseEsqueleticaT:string;
  claseMolar: string;
  clasificacion: string;
  fechaT:string;
  habitosT: string;
  identidadT:string;
  identidadPACT:string;
  observacionesT: string;
  pacienteT:string;
  perfilT:string;
  piezasT: string;
  tituloT:string;



  constructor(

    store: Store<IAppState>,
    httpSv: HttpService,
    private modal: TCModalService,
    private formBuilder: FormBuilder,

    private patientService: PacientesService,

  ) {

    super(store, httpSv);

    this.pageData = {
      title: 'Tratamientos',
      breadcrumbs: [
        {
          title: 'Medicine',
          route: 'default-appointments'
        },
        {
          title: 'Tratamiento'
        }
      ]
    };

    this.claseesqueletica = [
      {
        label: 'Normal',
        value: 'Normal'
      },
      {
        label: 'Mordida Retrasada',
        value: 'Mordida Retrasada'
      },
      {
        label: 'Mandibula Adelantada',
        value: 'Mandibula Adelantada'
      }
    ];
    this.claseM = [
      {
        label: 'Clase 1',
        value: 'Clase 1'
      },
      {
        label: 'Clase 2',
        value: 'Clase 2'
      },
      {
        label: 'Clase 3',
        value: 'Clase 3'
      }
    ];
    this.apinamiento = [
      {
        label: 'Leve',
        value: 'Leve'
      },
      {
        label: 'Moderado',
        value: 'Moderado'
      },
      {
        label: 'Severo',
        value: 'Severo'
      }
    ];
    this.perfil = [
      {
        label: 'Convexo',
        value: 'Convexo'
      },
      {
        label: 'Recto',
        value: 'Recto'
      },
      {
        label: 'Cóncavo',
        value: 'concavo'
      }
    ];
    this.claseficacionTratamiento = [
      {
        label: 'Branquifacial',
        value: 'Branquifacial'
      },
      {
        label: 'Normofacial',
        value: 'Normofacial'
      },
      {
        label: 'Dolicofacial',
        value: 'Dolicofacial'
      }
    ];
    this.appointments = [];
    this.doctors = [];
    this.defaultAvatar = '';
    this.currentAvatar = this.defaultAvatar;
    this.agenda=[];
    this.tituloT="Tratamiento";

   }

ngOnInit() {

     super.ngOnInit();

     this.patientService.getTratamiento().subscribe(data=>{


      this.appointments=data.map(e=>{
        return {
          id: e.payload.doc.id,
          idEdit: true,
          apinamientoT: e.payload.doc.data()['apinamientoT'],
          claseEsqueleticaT: e.payload.doc.data()['claseEsqueleticaT'],
          claseMolar: e.payload.doc.data()['claseMolar'],
          clasificacion: e.payload.doc.data()['clasificacion'],
          fechaT: e.payload.doc.data()['fechaT'],
          habitosT: e.payload.doc.data()['habitosT'],
          identidadT: e.payload.doc.data()['identidadT'],
          identidadPACT: e.payload.doc.data()['identidadPACT'],
          observacionesT: e.payload.doc.data()['observacionesT'],
          pacienteT: e.payload.doc.data()['pacienteT'],
          perfilT: e.payload.doc.data()['perfilT'],
          piezasT: e.payload.doc.data()['piezasT'],
        
     };

      })
    console.log(this.appointments);


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
      // img: [(data ? data.img : this.currentAvatar)],
      //name: [(data ? data.name : ''), Validators.required],
      //email: [(data ? data.email : ''), Validators.required],
      //date: [(data ? data.date : ''), Validators.required],
      //from: [(data ? data.fromTo.substring(0, (data.fromTo.indexOf('-') - 1)) : ''), Validators.required],
      //to: [(data ? data.fromTo.substring((data.fromTo.indexOf('-') + 2), data.fromTo.length) : ''), Validators.required],
      //number: [(data ? data.number : ''), Validators.required],
      //doctor: [(data ? data.doctor : ''), Validators.required],
      //injury: [(data ? data.injury : ''), Validators.required],

      piezasT: [(data ? data.piezasT : ''), Validators.required],
      perfilT: [(data ? data.perfilT : ''), Validators.required],
      pacienteT: [(data ? data.pacienteT : ''), Validators.required],
      observacionesT: [(data ? data.observacionesT : ''), Validators.required],
      identidadPACT: [(data ? data.identidadPACT : ''), Validators.required],
      identidadT: [(data ? data.identidadT : ''), Validators.required],
      habitosT: [(data ? data.habitosT : ''), Validators.required],
      fechaT: [(data ? data.fechaT : ''), Validators.required],
      clasificacion: [(data ? data.clasificacion: ''), Validators.required],
      claseMolar: [(data ? data.claseMolar : ''), Validators.required],
      claseEsqueleticaT: [(data ? data.claseEsqueleticaT : ''), Validators.required],
      apinamientoT: [(data ? data.apinamientoT : ''), Validators.required],



      


    });
  }



  // edit appointment
  edit(row: any) {
    this.piezasT=row.piezasT;
    this.perfilT=row.perfilT;
    this.pacienteT=row.pacienteT;
    this.observacionesT=row.observacionesT;
    this.identidadPACT=row.identidadPACT;
    this.identidadT=row.identidadT;
    this.habitosT=row.habitosT;
    this.fechaT=row.fechaT;
    this.clasificacion=row.clasificacion;
    this.claseMolar=row.claseMolar;
    this.claseEsqueleticaT=row.claseEsqueleticaT;
    this.apinamientoT=row.apinamientoT;
    this.id=row.id;

   console.log(row);
   this.openModal(this.modalBody, 'Editar Tratamiento', this.modalFooter, row);

  }

  async actualizarTratamiento (){

    let row= {};
    row['apinamientoT'] = this.apinamientoT;
    row['claseEsqueleticaT'] = this.claseEsqueleticaT;
    row['claseMolar'] = this.claseMolar;
    row['clasificacion'] = this.clasificacion;
    row['fechaT'] = this.fechaT;
    row['habitosT'] = this.habitosT;
    row['identidadT'] = this.identidadT;
    row['identidadPACT'] = this.identidadPACT;
    row['observacionesT'] = this.observacionesT;
    row['pacienteT'] = this.pacienteT;
    row['perfilT'] = this.perfilT;
    row['piezasT'] = this.piezasT;

    this.patientService.updateTratmiento(this.id, row);
    this.closeModal();
  }


  async eliminarTratamiento(id: string){
    this.patientService.deleteTratmiento(id);
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
