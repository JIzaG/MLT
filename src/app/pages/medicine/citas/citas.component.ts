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
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent extends BasePageComponent implements OnInit, OnDestroy {
  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;

  appointments: any[];
  appointmentForm: FormGroup;
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  doctors: IUser[];
  agenda: any[];

  dientes: IOption[];
  maxilar: IOption[];
  cuadrantes: IOption[];

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

    this.dientes = [
      {
        label: 'Incisivo Central',
        value: 'Incisivo Central'
      },
      {
        label: 'Incisivo Lateral',
        value: 'Incisivo Lateral'
      },
      {
        label: 'Canino',
        value: 'Canino'
      },
      {
        label: 'Primer Bicúspide',
        value: 'Primer Bicúspide'
      },
      {
        label: 'Segundo Bicúspide',
        value: 'Segundo Bicúspide'
      },
      {
        label: 'Primer Molar',
        value: 'Primer Molar'
      },
      {
        label: 'Segundo Molar',
        value: 'Segundo Molar'
      },
      {
        label: 'Tercer Molar',
        value: 'Tercer Molar'
      }
    ];
    this.cuadrantes = [
      {
        label: 'Cuadrante Superior Izquierdo',
        value: 'Cuadrante Superior Izquierdo'
      },
      {
        label: 'Cuadrante Superior Derecho',
        value: 'Cuadrante Superior Derecho'
      },
      {
        label: 'Cuadrante Inferior Izquierdo',
        value: 'Cuadrante Inferior Izquierdo'
      },
      {
        label: 'Cuadrante Inferior Derecho',
        value: 'Cuadrante Inferior Derecho'
      },
    ];
    this.maxilar = [
      {
        label: 'Maxilar Superior',
        value: 'Maxilar Superior'
      },
      {
        label: 'Maxilar Inferior',
        value: 'Maxilar Inferior'
      }
    ];

    this.pageData = {
      title: 'Citas Clínicas',
      breadcrumbs: [
        {
          title: 'Medicine',
          route: 'default-appointments'
        },
        {
          title: 'Citas Clinicas'
        }
      ]
    };
    this.appointments = [];
    this.doctors = [];
    this.defaultAvatar = '';
    this.currentAvatar = this.defaultAvatar;
    this.agenda=[];
    this.tituloC='Cita Clinica';
 
  }

  ngOnInit() {

     super.ngOnInit();

     this.patientService.getCitasClinica().subscribe(data=>{


      this.appointments=data.map(e=>{
        return {
          id: e.payload.doc.id,
          idEdit: true,
          fechaC: e.payload.doc.data()['fechaC'],
          identidadPACC: e.payload.doc.data()['identidadPACC'],
          identidadC: e.payload.doc.data()['identidadC'],
          procedimientoC: e.payload.doc.data()['procedimientoC'],
          dientesC: e.payload.doc.data()['dientesC'],
          cuadrantesC: e.payload.doc.data()['cuadrantesC'],
          maxilarC: e.payload.doc.data()['maxilarC'],
          pacienteC: e.payload.doc.data()['pacienteC'],

     };

      })
    console.log(this.appointments);

    })

    this.getData('assets/data/appointments.json', 'appointments', 'setLoaded');
    this.getData('assets/data/doctors.json', 'doctors');


  }


            // fechaC: string;
          // identidadPACC:string;
          // identidadC:string;
          // pacienteC: string;
          // procedimientoC:string;

          // dientesC:string;
          // cuadrantesC:string;
          // maxilarC:string;

 


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


    // upload new file
    onFileChanged(inputValue: any) {
      let file: File = inputValue.target.files[0];
      let reader: FileReader = new FileReader();
  
      reader.onloadend = () => {
        this.currentAvatar = reader.result;
      };
  
      reader.readAsDataURL(file);
    }
    
  // init form
  initForm(data: any) {
    this.appointmentForm = this.formBuilder.group({


      fechaC: [(data ? data.fechaC : ''), Validators.required],
      identidadPACC: [(data ? data.identidadPACC : ''), Validators.required],
      identidadC: [(data ? data.identidadC : ''), Validators.required],
      pacienteC: [(data ? data.pacienteC : ''), Validators.required],
      procedimientoC: [(data ? data.procedimientoC : ''), Validators.required],
      dientesC: [(data ? data.dientesC : ''), Validators.required],
      cuadrantesC: [(data ? data.cuadrantesC : ''), Validators.required],
      maxilarC: [(data ? data.maxilarC : ''), Validators.required]

    });
  }

  // edit appointment
  edit(row: any) {

    this.fechaC=row.fechaC;
    this.identidadPACC=row.identidadPACC;
    this.identidadC=row.identidadC;
    this.pacienteC=row.pacienteC;
    this.procedimientoC=row.procedimientoC;
    this.dientesC=row.dientesC;
    this.cuadrantesC=row.cuadrantesC;
    this.maxilarC=row.maxilarC;
    this.id=row.id;

   console.log(row);
   this.openModal(this.modalBody, 'Editar Cita Clínica', this.modalFooter, row);

  }


  async actualizarCita (){

    let row= {};
    row['fechaC'] = this.fechaC;
    row['identidadPACC'] = this.identidadPACC;
    row['identidadC'] = this.identidadC;
    row['pacienteC'] = this.pacienteC;
    row['procedimientoC'] = this.procedimientoC;
    row['dientesC'] = this.dientesC;
    row['cuadrantesC'] = this.cuadrantesC;
    row['maxilarC'] = this.maxilarC;

    this.patientService.updateCitaClinica(this.id, row);
    this.closeModal();
  }


  async eliminarCitaClinica(id: string){
    this.patientService.deleteCitaClinica(id);
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
