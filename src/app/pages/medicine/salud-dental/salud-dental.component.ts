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
  selector: 'app-salud-dental',
  templateUrl: './salud-dental.component.html',
  styleUrls: ['./salud-dental.component.scss']
})
export class SaludDentalComponent extends BasePageComponent implements OnInit, OnDestroy  {
  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;

   dd: any[];

 dientes: any;


  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private patientService: PacientesService,
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Salud Dental',
      breadcrumbs: [
        {
          title: 'Medicine',
          route: 'default-appointments'
        },
        {
          title: 'Salud Dental'
        }
      ]
    };
  }

  ngOnInit() {
     super.ngOnInit();





     this.patientService.getSaludDental().subscribe(async data=>{
      
      //console.log();
      this.dientes = await data[0]['payload']['doc'].data();
      console.log(this.dientes['diente1'][0]);
      
    })


    //  this.patientService.getHistoriaClinica().subscribe(data=>{
    // })

    this.getData('assets/data/appointments.json', 'appointments', 'setLoaded');
    this.getData('assets/data/doctors.json', 'doctors');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  // init form
  initForm(data: any) {
  }

  SalvarCambio(){
    // this.modalFooter;
  }

  changedColor(index){
    // switch(this.dientes[index].id_estado){
    //   case 1:
    //     this.dientes[index].id_estado++;
    //     this.dientes[index].color = "#efd613";
    //   break;
    //   case 2:
    //     this.dientes[index].id_estado++;
    //     this.dientes[index].color = "#71bf4c";
    //   break;
    //   case 3:
    //     this.dientes[index].id_estado++;
    //     this.dientes[index].color = "#ff5454";
    //   break;
    //   case 4:
    //     this.dientes[index].id_estado = 1;
    //     this.dientes[index].color = "#ffffff";
    //   break;
    // }
  }
}
