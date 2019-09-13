import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { BasePageComponent } from '../../base-page';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { IPatient } from '../../../interfaces/patient';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOption } from '../../../ui/interfaces/option';
import { Content } from '../../../ui/interfaces/modal';
import * as PatientsActions from '../../../store/actions/patients.actions';
import { TCModalService } from '../../../ui/services/modal/modal.service';

import { PacientesService } from '../../../services/pacientes/pacientes.service';


@Component({
  selector: 'page-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PagePatientsComponent extends BasePageComponent implements OnInit, OnDestroy {
  patients: any [];
  patientForm: FormGroup;
  gender: IOption[];
  status: IOption[];
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  pacientes: any ;

  nombre: string;
  identidadPAC: string;
  edad: string;
  genero: string;
  fechan: string;
  profesion: string;
  direccion: string;
  email: string;
  telefono: string;
  celular: string;
  doctor: string;
  id: string;


  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private fb: FormBuilder,
    private modal: TCModalService,
    private patientService :PacientesService,
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Pacientes',
      breadcrumbs: [
        {
          title: 'Medicine',
          route: 'default-dashboard'
        },
        {
          title: 'Pacientes'
        }
      ]
    };
    this.patients = [];
    this.gender = [
      {
        label: 'Masculino',
        value: 'male'
      },
      {
        label: 'Femenino',
        value: 'female'
      }
    ];
    this.status = [
      {
        label: 'Approved',
        value: 'approved'
      },
      {
        label: 'Pending',
        value: 'pending'
      }
    ];
    this.defaultAvatar = '';
    this.currentAvatar = this.defaultAvatar;
    this.patients=[];
  }
  //---------------------------------------------------------------------------------------------

  ngOnInit() {
    super.ngOnInit();

    // this.store.select('patients').subscribe(patients => {
    //   if (patients && patients.length) {
    //     this.patients = patients;

    //     !this.pageData.loaded ? this.setLoaded() : null;
    //   }
    // });

    this.patientService.getPacientes().subscribe(data=>{
  
      this.patients=data.map(e=>{
        return {
          id: e.payload.doc.id,
          idEdit: true,
          identidadPAC:e.payload.doc.id,
          nombre: e.payload.doc.data()['nombre'],
          edad: e.payload.doc.data()['edad'],
          genero: e.payload.doc.data()['genero'],
          fechan: e.payload.doc.data()['fechan'],
          profesion: e.payload.doc.data()['profesion'],
          direccion: e.payload.doc.data()['direccion'],
          email: e.payload.doc.data()['email'],
          telefono: e.payload.doc.data()['telefono'],
          celular: e.payload.doc.data()['celular'],
          doctor: e.payload.doc.data()['doctor'],
         
        };
      })
      console.log(this.patients);
      !this.pageData.loaded ? this.setLoaded() : null;

    })
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  // delete patient
  remove(id: string) {
    this.store.dispatch(new PatientsActions.Delete(id));
  }

  // open modal window
  openModal<T>(body: Content<T>, header: Content<T> = null, footer: Content<T> = null, row: any) {
    

    this.nombre=row.nombre;
    this.edad=row.edad;
    this.genero=row.genero;
    this.fechan=row.fechan;
    this.profesion=row.profesion;
    this.direccion=row.direccion;
    this.email=row.email;
    this.telefono=row.telefono;
    this.celular=row.celular;
    this.doctor=row.doctor;
    this.id=row.id;
    this.identidadPAC=row.id;

    this.initPatientForm(row);

    this.modal.open({
      body: body,
      header: header,
      footer: footer,
      options: null
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
  initPatientForm(data: any) {
    this.currentAvatar = data.img ? data.img : this.defaultAvatar;

    this.patientForm = this.fb.group({

      identidadPAC: [data.identidadPAC ? data.identidadPAC : '', Validators.required],
      nombre: [data.nombre ? data.nombre : '', Validators.required],
      edad: [data.edad ? data.edad : '', Validators.required],
      genero: [data.genero ? data.genero : '', Validators.required],
      fechan: [data.fechan ? data.fechan : '', Validators.required],
      profesion: [data.profesion ? data.profesion : '', Validators.required],
      direccion: [data.direccion ? data.direccion : '', Validators.required],
      email: [data.email ? data.email : '', Validators.required],
      telefono: [data.telefono ? data.telefono : '', Validators.required],
      celular: [data.celular ? data.celular : '', Validators.required],
      doctor: [data.doctor ? data.doctor : '', Validators.required],

 

     /* id: data.id,
      img: [this.currentAvatar],
      name: [data.name ? data.name : '', Validators.required],
      number: [data.number ? data.number : '', Validators.required],
      age: [data.age ? data.age : '', Validators.required],
      lastVisit: [data.lastVisit ? data.lastVisit : '', Validators.required],
      gender: [data.gender ? data.gender.toLowerCase() : '', Validators.required],
      address: [data.address ? data.address : '', Validators.required],
      status: [data.status ? data.status.toLowerCase() : '', Validators.required]*/



    });
  }

  // update patient
  updatePatient(form: FormGroup) {

    this.actualizarPaciente ()
    if (form.valid) {
      let newPatient: IPatient = form.value;
      
      this.store.dispatch(new PatientsActions.Edit(newPatient));
      this.closeModal();
      this.patientForm.reset();
    }
  }

  async actualizarPaciente (){
    
    let row= {};
    row['nombre'] = this.nombre;
    row['edad'] = this.edad;
    row['genero'] = this.genero;
    row['fechan'] = this.fechan;
    row['profesion'] = this.profesion;
    row['direccion'] = this.direccion; 
    row['email'] = this.email;
    row['telefono'] = this.telefono; 
    row['celular'] = this.celular;
    row['doctor'] = this.doctor;
    
    this.patientService.updatePacientes(this.id, row);
    console.log(row);
    console.log(this.id);
    console.log(this.patientService.updatePacientes(this.id, row));
    this.closeModal();
  }

  edit(row: any) {
    this.nombre=row.nombre;
    this.edad=row.edad;
    this.genero=row.genero;
    this.fechan=row.fechan;
    this.profesion=row.profesion;
    this.direccion=row.direccion;
    this.email=row.email;
    this.telefono=row.telefono;
    this.celular=row.celular;
    this.doctor=row.doctor;
    this.identidadPAC=row.id;

   console.log(row);

  }

  async deletePaciente(id: string){
    this.patientService.deletePaciente(id);
    console.log(id);

  }
  
}
