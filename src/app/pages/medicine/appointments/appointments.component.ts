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
  selector: 'page-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class PageAppointmentsComponent extends BasePageComponent implements OnInit, OnDestroy {
  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;

  appointments: any[];
  appointmentForm: FormGroup;
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  doctors: IUser[];
  agenda: any[];
  dia: IOption[];
  hora: IOption[];
  mes: IOption[];
  year: IOption[];


  //-------------------------------------------

  nombre: string;
  doctor: string;
  email: string;
  fecha: string;
  telefono: string;
  procedimiento: string;
  id: string;
  diaC: number;
  mesC:number;
  yearC: number;
  hi: number;
  hf: number;
  

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private modal: TCModalService,
    private formBuilder: FormBuilder,
    
    private patientService: PacientesService,
  ) {
    super(store, httpSv);

    this.dia = [
      {label: '1',value: '1'},
      {label: '2',value: '2'},
      {label: '3',value: '3'},
      {label: '4',value: '4'},
      {label: '5',value: '5'},
      {label: '6',value: '6'},
      {label: '7',value: '7'},
      {label: '8',value: '8'},
      {label: '9',value: '9'},
      {label: '10',value: '10'},
      {label: '11',value: '11'},
      {label: '12',value: '12'},
      {label: '13',value: '13'},
      {label: '14',value: '14'},
      {label: '15',value: '15'},
      {label: '16',value: '16'},
      {label: '17',value: '17'},
      {label: '18',value: '18'},
      {label: '19',value: '19'},
      {label: '20',value: '20'},
      {label: '21',value: '21'},
      {label: '22',value: '22'},
      {label: '23',value: '23'},
      {label: '24',value: '24'},
      {label: '25',value: '25'},
      {label: '26',value: '26'},
      {label: '27',value: '27'},
      {label: '28',value: '28'},
      {label: '29',value: '29'},
      {label: '30',value: '30'},
      {label: '31',value: '31'}
    ];
    this.hora = [
      {label: '07:00 AM',value: '7'},
      {label: '08:00 AM',value: '8'},
      {label: '09:00 AM',value: '9'},
      {label: '10:00 AM',value: '10'},
      {label: '11:00 AM',value: '11'},
      {label: '12:00 AM',value: '12'},
      {label: '01:00 PM',value: '1'},
      {label: '02:00 PM',value: '2'},
      {label: '03:00 PM',value: '3'},
      {label: '04:00 PM',value: '4'},
      {label: '05:00 PM',value: '5'},
      {label: '06:00 PM',value: '6'}
    ];
    this.mes = [
      {label: 'Enero',value: '1'},
      {label: 'Febrero',value: '2'},
      {label: 'Marzo',value: '3'},
      {label: 'Abril',value: '4'},
      {label: 'Mayo',value: '5'},
      {label: 'Junio',value: '6'},
      {label: 'Julio',value: '7'},
      {label: 'Agosto',value: '8'},
      {label: 'Septiembre',value: '9'},
      {label: 'Octubre',value: '10'},
      {label: 'Noviembre',value: '11'},
      {label: 'Diciembre',value: '12'}
    ];
    this.year = [
      {label: '2019',value: '2019'},
      {label: '2020',value: '2020'},
      {label: '2021',value: '2021'},
      {label: '2022',value: '2022'},
      {label: '2023',value: '2023'}
    ];

    this.pageData = {
      title: 'Agenda',
      breadcrumbs: [
        {
          title: 'Medicine',
          route: 'default-appointments'
        },
        {
          title: 'Agenda'
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
          hi: e.payload.doc.data()['hi'],
          hf: e.payload.doc.data()['hf'],
          email: e.payload.doc.data()['email'],
          telefono: e.payload.doc.data()['telefono'],
          procedimiento: e.payload.doc.data()['procedimiento'],
          diaC: e.payload.doc.data()['diaC'],
          mesC: e.payload.doc.data()['mesC'],
          yearC: e.payload.doc.data()['yearC'],
         
          
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
    agenda['diaC'] = this.diaC;
    agenda['mesC'] = this.mesC;
    agenda['yearC'] = this.yearC;
    agenda['hi'] = this.hi;
    agenda['hf'] = this.hf;
    agenda['telefono'] = this.telefono;
    agenda['procedimiento'] = this.procedimiento;
  
    this.patientService.addAgendaPaciente(agenda).then(res => {

      this.nombre = "";
      this.doctor="";
      this.email="";
      this.fecha = "";
      this.hi=0;
      this.hf=0;
      this.diaC=0;
      this.mesC=0;
      this.yearC=0;
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
      diaC: [(data ? data.hf : ''), Validators.required],
      yearC: [(data ? data.hf : ''), Validators.required],
      mesC: [(data ? data.hf : ''), Validators.required],

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
    this.hi=row.hi;
    this.hf=row.hf;
    this.diaC=row.diaC;
    this.mesC=row.mesC;
    this.yearC=row.yearC;
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
    row['diaC'] = this.diaC;
    row['mesC'] = this.mesC;
    row['yearC'] = this.yearC;
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
