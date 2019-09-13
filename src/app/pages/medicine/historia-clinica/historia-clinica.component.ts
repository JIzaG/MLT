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

     this.patientService.getAgendaPaciente().subscribe(data=>{


      this.appointments=data.map(e=>{
        return {
          id: e.payload.doc.id,
          idEdit: true,
          nombre: e.payload.doc.data()['nombre'],
          doctor: e.payload.doc.data()['doctor'],
          fecha: e.payload.doc.data()['fecha'],
          hi: e.payload.doc.data()['hi'],
          hf: e.payload.doc.data()['hf'],
          email: e.payload.doc.data()['email'],
          telefono: e.payload.doc.data()['telefono'],
          procedimiento: e.payload.doc.data()['procedimiento'],


     };

      })
    console.log(this.appointments);
    //   myjason = JSON.stringify(this.appointments);
    //   console.log(myjason);

    })



    this.getData('assets/data/appointments.json', 'appointments', 'setLoaded');
    this.getData('assets/data/doctors.json', 'doctors');


  }




  async addAgendaPaciente() {
    let agenda = {};
    agenda['nombre'] = this.nombre;
    agenda['doctor'] = this.doctor;
    agenda['email'] = this.email;
    agenda['fecha'] = this.fecha;
    agenda['hi'] = this.hi;
    agenda['hf'] = this.hf;
    agenda['telefono'] = this.telefono;
    agenda['procedimiento'] = this.procedimiento;

    this.patientService.addAgendaPaciente(agenda).then(res => {

      this.nombre = "";
      this.doctor="";
      this.email="";
      this.fecha = "";
      this.hi="";
      this.hf="";
      this.telefono="";
      this.procedimiento="";

    }).catch(error => {
      console.log(error)
    })
    this.closeModal();
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

      nombre: [(data ? data.nombre : ''), Validators.required],
      doctor: [(data ? data.doctor : ''), Validators.required],
      email: [(data ? data.email : ''), Validators.required],
      fecha: [(data ? data.fecha : ''), Validators.required],
      hi: [(data ? data.hi : ''), Validators.required],
      hf: [(data ? data.hf : ''), Validators.required],
      telefono: [(data ? data.telefono : ''), Validators.required],
      procedimiento: [(data ? data.procedimiento : ''), Validators.required],
      id: [(data ? data.procedimiento : ''), Validators.required],

    });
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

  // edit appointment
  edit(row: any) {

    this.nombre=row.nombre;
    this.doctor=row.doctor;
    this.email=row.email;
    this.fecha=row.fecha;
    this.hi=row.hi;
    this.hf=row.hf;
    this.telefono=row.telefono;
    this.procedimiento=row.procedimiento;
    this.id=row.id;

   console.log(row);
   this.openModal(this.modalBody, 'Editar Cita', this.modalFooter, row);

  }

  async editarAgenda(record: string){}

  async actualizarAgenda (){

    let row= {};
    row['nombre'] = this.nombre;
    row['doctor'] = this.doctor;
    row['email'] = this.email;
    row['fecha'] = this.fecha;
    row['hi'] = this.hi;
    row['hf'] = this.hf;
    row['telefono'] = this.telefono;
    row['procedimiento'] = this.procedimiento;

    this.patientService.updateAgendaPacientes(this.id, row);
    this.closeModal();
  }

    // nombre:
    // doctor:
    // email:
    // fecha:
    // hi:
    // hf:
    // telefono:
    // procedimiento:

  // remove appointment
  // remove(tableRow: any) {

  //   this.appointments = this.appointments.filter(row => row !== tableRow);

  // }

  async eliminarAgenda(id: string){
    this.patientService.deleteAgendaPaciente(id);
    console.log(id);

  }







  // remove(id: string) {
  //   this.store.dispatch(new PatientsActions.Delete(id));
  // }



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
