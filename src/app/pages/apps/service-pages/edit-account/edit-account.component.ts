import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasePageComponent } from '../../../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../interfaces/app-state';
import { HttpService } from '../../../../services/http/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOption } from '../../../../ui/interfaces/option';
import {PacientesService} from '../../../../services/pacientes/pacientes.service';

@Component({
  selector: 'page-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class PageEditAccountComponent extends BasePageComponent implements OnInit, OnDestroy {
  // userInfo: any;
  userForm: FormGroup;
  gender: IOption[];
  status: IOption[];
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  changes: boolean;
  userInfo:any[];
  EditarDoctor: any[];

  //---------------------------------------------------------

  nombre: string;
  edad: string;
  genero: string;
  fechan: string;
  especialidad: string;
  clinica: string;
  direccion: string;
  email: string;
  celular:string;
  telefono:string;


  //---------------------------------------------------------

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private formBuilder: FormBuilder,
    private patientService: PacientesService,
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Editar Perfil',
      loaded: true,
      breadcrumbs: [
        {
          title: 'Perfil',
          route: 'default-dashboard'
        },
        {
          title: 'Doctor',
          route: 'default-dashboard'
        },
        {
          title: 'Editar Cuenta'
        }
      ]
    };
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
    // this.status = [
    //   {
    //     label: 'Approved',
    //     value: 'approved'
    //   },
    //   {
    //     label: 'Pending',
    //     value: 'pending'
    //   }
    // ];
    this.defaultAvatar = '/assets/content/user-400-1.jpg';
    this.currentAvatar = this.defaultAvatar;
    this.changes = false;
    this.userInfo = [];
  }



  ngOnInit() {
    super.ngOnInit();


    // this.patientService.getPerfilDoctor().subscribe(data=>{
    //   this.userInfo=data.map(e=>{
    //     return {
    //       id: e.payload.doc.id,
    //       idEdit: true,
    //       nombre: e.payload.doc.data()['nombre'],
    //       edad: e.payload.doc.data()['edad'],
    //       genero: e.payload.doc.data()['genero'],
    //       fechan: e.payload.doc.data()['fechan'],
    //       especialidad: e.payload.doc.data()['especialidad'],
    //       clinica: e.payload.doc.data()['clinica'],
    //       direccion: e.payload.doc.data()['direccion'],
    //       email: e.payload.doc.data()['email'],
    //       celular: e.payload.doc.data()['celular'],
    //       telefono: e.payload.doc.data()['telefono']  
    //  };
    //   })
    //   console.log(this.userInfo);

    // })

 

    // this.userForm.valueChanges.subscribe(() => {
    //   this.changes = true;
    // });



    //  this.getData('assets/data/account-data.json', 'userInfo', 'loadedDetect');
     this.loadedDetect();
  }

  inici(){

  }
  ngOnDestroy() {
    super.ngOnDestroy();
  }

  loadedDetect() {
    this.setLoaded();
    this.currentAvatar;
    // = this.userInfo.img
    this.inituserForm(this.userInfo);
  }

  

  // init form
  inituserForm(data: any) {
    this.userForm = this.formBuilder.group({
      // img: [this.currentAvatar],
      // firstName: [data.firstName, Validators.required],
      // lastName: [data.lastName, Validators.required],
      // number: [data.number, Validators.required],
      // address: [data.address, Validators.required],
      // gender: [data.gender, Validators.required],
      // age: [data.age, Validators.required],
      // lastVisit: [data.lastVisit, Validators.required],
      // status: [data.status, Validators.required],


      nombre: [data.nombre, Validators.required],
      edad: [data.edad, Validators.required],
      genero: [data.genero, Validators.required],
      fechan: [data.fechan, Validators.required],
      especialidad: [data.especialidad, Validators.required],
      clinica: [data.clinica, Validators.required],
      direccion: [data.direccion, Validators.required],
      email: [data.email, Validators.required],
      celular: [data.celular, Validators.required],
      telefono: [data.telefono, Validators.required]

      // nombre: [(data ? data.nombre : ''), Validators.required],
      // edad: [(data ? data.edad : ''), Validators.required],
      // genero: [(data ? data.genero : ''), Validators.required],
      // fechan: [(data ? data.fechan : ''), Validators.required],
      // especialidad:[(data ? data.especialidad : ''), Validators.required],
      // clinica: [(data ? data.clinica : ''), Validators.required],
      // direccion: [(data ? data.direccion : ''), Validators.required],
      // email: [(data ? data.email : ''), Validators.required],
      // celular: [(data ? data.celular : ''), Validators.required],
      // telefono: [(data ? data.telefono : ''), Validators.required],

    });

    // detect form changes
    this.userForm.valueChanges.subscribe(() => {
      this.changes = true;
    });
  }

  // save form data
  saveData(form: FormGroup) {
    if (form.valid) {
      this.userInfo = form.value;
      this.changes = false;
    }
  }

  // upload new file
  onFileChanged(inputValue: any) {
    let file: File = inputValue.target.files[0];
    let reader: FileReader = new FileReader();

    reader.onloadend = () => {
      this.currentAvatar = reader.result;
      this.changes = true;
    };

    reader.readAsDataURL(file);
  }

}
