import { PacientesService } from './../../services/pacientes/pacientes.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { IAppState } from "../../interfaces/app-state";
import { BaseLayoutComponent } from '../base-layout/base-layout.component';
import { HttpService } from '../../services/http/http.service';
import { IOption } from '../../ui/interfaces/option';
import { Content } from '../../ui/interfaces/modal';
import { TCModalService } from '../../ui/services/modal/modal.service';
import { IPatient } from '../../interfaces/patient';
import * as PatientsActions from '../../store/actions/patients.actions';
import * as SettingsActions from '../../store/actions/app-settings.actions';

@Component({
  selector: 'vertical-layout',
  templateUrl: './vertical.component.html',
  styleUrls: [
    '../base-layout/base-layout.component.scss',
    './vertical.component.scss'
  ]
})
export class VerticalLayoutComponent extends BaseLayoutComponent implements OnInit {
  patientForm: FormGroup;
  gender: IOption[];
  dientes: IOption[];
  maxilar: IOption[];
  cuadrantes: IOption[];
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;

  //---------------Tratmiento Opciones
  claseesqueletica: IOption[];
  claseM: IOption[];
  apinamiento: IOption[];
  perfil: IOption[];
  claseficacionTratamiento: IOption[];

  SiNo: IOption[];


  //-------------------------------------------Registrar Un Nuevo Paciente

  nombre: string;
  identidadPAC: string;
  edad: number;
  genero: string;
  fechan: string;
  profesion: string;
  direccion: string;
  email: string;
  telefono: string;
  celular: string;
  doctor: string;

  //-------------------------------------------Registrar Cita Clinica
  fechaC: string;
  identidadPACC:string;
  identidadC:string;
  pacienteC: string;
  procedimientoC:string;
  tituloC:string;
  dientesC:string;
  cuadrantesC:string;
  maxilarC:string;
  
  
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


  //-------------------------------------------Registrar Salud Dental 



  //-------------------------------------------Registrar Tratamiento
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
    fb: FormBuilder,
    httpSv: HttpService,
    router: Router,
    elRef: ElementRef,
    private modal: TCModalService,
    private patientService: PacientesService,
  ) {
    super(store, fb, httpSv, router, elRef);

    this.gender = [
      {
        label: 'Masculino',
        value: 'Masculino'
      },
      {
        label: 'Femenino',
        value: 'Femenino'
      }
    ];

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

    this.SiNo=[
      {
        label:'Si',
        value:'Si'

      },
      {
        label:'No',
        value:'No'
      }];
    
    this.defaultAvatar = '';
    this.tituloC="Cita Clinica";
    this.tituloT="Tratamiento";
    this.tituloH='Historia Clinica';
    this.currentAvatar = this.defaultAvatar;
  }

  ngOnInit() {
    super.ngOnInit();

    this.store.dispatch(new SettingsActions.Update({ layout: 'vertical' }));
  }

  async addPacientes() {
    let patient = {};
    patient['nombre'] = this.nombre;
    patient['identidadPAC'] = this.identidadPAC;
    patient['edad'] = this.edad;
    patient['genero'] = this.genero;
    patient['fechan'] = this.fechan;
    patient['profesion'] = this.profesion;
    patient['direccion'] = this.direccion;
    patient['email'] = this.email;
    patient['telefono'] = this.telefono;
    patient['celular'] = this.celular;
    patient['doctor'] = this.doctor;
    let identidadPAC=this.identidadPAC;

    this.patientService.addPacientes(patient, identidadPAC).then(res => {
      this.nombre = "";
      this.identidadPAC = "";
      this.edad = 0;
      this.genero = "";
      this.fechan = "";
      this.profesion = "";
      this.direccion = "";
      this.email = "";
      this.telefono = "";
      this.celular = "";
      this.doctor = "";

    }).catch(error => {
      console.log(error)
    })

    this.closeModal()

  }

  async addCitaClinica() {
    let patientC = {};
    patientC['pacienteC'] = this.pacienteC;
    patientC['fechaC'] = this.fechaC;
    patientC['identidadPACC'] = this.identidadPACC;
    patientC['identidadC'] = this.identidadC;
    patientC['procedimientoC'] = this.procedimientoC;
    patientC['dientesC'] = this.dientesC;
    patientC['cuadrantesC'] = this.cuadrantesC;
    patientC['maxilarC'] = this.maxilarC;
    patientC['tituloC'] = this.tituloC;

    this.patientService.addCitaClinica(patientC).then(res => {
      this.pacienteC = "";
      this.fechaC= "";
      this.identidadPACC= "";
      this.identidadC= "";
      this.procedimientoC= "";
      this.dientesC= "";
      this.cuadrantesC= "";
      this.maxilarC= "";

    }).catch(error => {
      console.log(error)
    })
    this.closeModal()
  }

  async addTratamiento() {
    let patientT = {};
    patientT['apinamientoT'] = this.apinamientoT;
    patientT['claseEsqueleticaT'] = this.claseEsqueleticaT;
    patientT['claseMolar'] = this.claseMolar;
    patientT['clasificacion'] = this.clasificacion;
    patientT['fechaT'] = this.fechaT;
    patientT['habitosT'] = this.habitosT;
    patientT['identidadT'] = this.identidadT;
    patientT['identidadPACT'] = this.identidadPACT;
    patientT['titulot'] = this.tituloT;
    patientT['observacionesT'] = this.observacionesT;
    patientT['pacienteT'] = this.pacienteT;
    patientT['perfilT'] = this.perfilT;
    patientT['piezasT'] = this.piezasT;

    this.patientService.addTratamiento(patientT).then(res => {
      this.apinamientoT = "";
      this.claseEsqueleticaT= "";
      this.claseMolar= "";
      this.clasificacion= "";
      this.fechaT= "";
      this.habitosT= "";
      this.identidadT= "";
      this.identidadPACT= "";
      this.observacionesT= "";
      this.pacienteT= "";
      this.perfilT= "";
      this.piezasT= "";

    }).catch(error => {
      console.log(error)
    })
    this.closeModal()
  }


  async addHistoriaClinica() {
    let patientT = {};
    patientT['pacienteH'] = this.pacienteH;
    patientT['identidadPACH'] = this.identidadPACH;
    patientT['fechaH'] = this.fechaH;
    patientT['p1'] = this.p1;
    patientT['p2'] = this.p2;
    patientT['p3'] = this.p3;
    patientT['p4'] = this.p4;
    patientT['p5'] = this.p5;
    patientT['p6'] = this.p6;
    patientT['p7'] = this.p7;
    patientT['p8'] = this.p8;
    patientT['p9'] = this.p9;


    this.patientService.addHistoriaClinica(patientT).then(res => {
      this.pacienteH = "";
      this.identidadPACH= "";
      this.fechaH= "";
      this.p1= "";
      this.p2= "";
      this.p3= "";
      this.p4= "";
      this.p5= "";
      this.p6= "";
      this.p7= "";
      this.p8= "";
      this.p9= "";

    }).catch(error => {
      console.log(error)
    })
    this.closeModal()
  }


  // open modal window
  openModal<T>(body: Content<T>, header: Content<T> = null, footer: Content<T> = null, options: any = null) {
    this.initPatientForm();

    this.modal.open({
      body: body,
      header: header,
      footer: footer,
      options: options
    });
  }

  // close modal window
  closeModal() {
    this.modal.close();
    this.patientForm.reset();
    this.currentAvatar = this.defaultAvatar;
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
  initPatientForm() {
    this.patientForm = this.fb.group({
      img: [],
      // name: ['', Validators.required],
      // number: ['', Validators.required],
      // age: ['', Validators.required],
      // gender: ['', Validators.required],
      // address: ['', Validators.required],

      //---------------------------------------------------------------------------------Crear Paciente

      identidad: ['', Validators.required],
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      genero: ['', Validators.required],
      fecha: ['', Validators.required],
      profesion: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      celular: ['', Validators.required],
      doctor: ['', Validators.required],
      


    //---------------------------------------------------------------------------------Citas Clinicas

    
    fechaC: ['', Validators.required],
    identidadPACC: ['', Validators.required],
    identidadC: ['', Validators.required],
    pacienteC: ['', Validators.required],
    procedimientoC: ['', Validators.required],
    dientesC: ['', Validators.required],
    cuadrantesC: ['', Validators.required],
    maxilarC: ['', Validators.required],

    //---------------------------------------------------------------------------------Tratamiento

    pacienteT: ['', Validators.required],
    identidadPACT: ['', Validators.required],
    identidadT: ['', Validators.required],
    fechaT: ['', Validators.required],
    claseEsqueleticaT: ['', Validators.required],
    claseMolar: ['', Validators.required],
    piezasT: ['', Validators.required], 
    apinamientoT: ['', Validators.required],
    perfilT: ['', Validators.required],
    clasificacion: ['', Validators.required],    
    habitosT: ['', Validators.required],
    observacionesT: ['', Validators.required],
    
    
  //---------------------------------------------------------------------------------Historial

  fechaH: ['', Validators.required],
  identidadPACH: ['', Validators.required],
  pacienteH: ['', Validators.required],
  p1: ['', Validators.required],
  p2: ['', Validators.required],
  p3: ['', Validators.required],
  p4: ['', Validators.required],
  p5: ['', Validators.required],
  p6: ['', Validators.required],
  p7: ['', Validators.required],
  p8: ['', Validators.required],
  p9: ['', Validators.required],

  });
  }

  // add new patient
  addPatient(form: FormGroup) {
    if (form.valid) {
      let newPatient: IPatient = form.value;


      newPatient.id = '23';
      newPatient.status = 'Pending';
      newPatient.lastVisit = '';

      newPatient.img = this.currentAvatar;
      newPatient.identidad = "";
      newPatient.nombre = "";
      newPatient.edad


      this.store.dispatch(new PatientsActions.Add(newPatient));
      this.closeModal();
      this.patientForm.reset();
    }
  }
}
