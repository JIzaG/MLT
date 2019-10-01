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

  dientes=[
    {
      color:"#fffff",
      numero:1,
      id_estado:1,
      descripcion: "nota de  de diente 1"
    },
    {
      color:"#fffff",
      numero:2,
      id_estado:1,
      descripcion: "nota de  de diente 2"
    },
    {
      color:"#fffff",
      numero:3,
      id_estado:1,
      descripcion: "nota de  de diente 3"
    },
    {
      color:"#fffff",
      numero:4,
      id_estado:1,
      descripcion: "nota de  de diente 4"
    },
    {
      color:"#fffff",
      numero:5,
      id_estado:1,
      descripcion: "nota de  de diente 5"
    },
    {
      color:"#fffff",
      numero:6,
      id_estado:1,
      descripcion: "nota de  de diente 6"
    },
    {
      color:"#fffff",
      numero:7,
      id_estado:1,
      descripcion: "nota de  de diente 7"
    },
    {
      color:"#fffff",
      numero:8,
      id_estado:1,
      descripcion: "nota de  de diente 8"
    },
    {
      color:"#fffff",
      numero:9,
      id_estado:1,
      descripcion: "nota de  de diente 9"
    },
    {
      color:"#fffff",
      numero:10,
      id_estado:1,
      descripcion: "nota de  de diente 10"
    },
    {
      color:"#fffff",
      numero:11,
      id_estado:1,
      descripcion: "nota de  de diente 11"
    },
    {
      color:"#fffff",
      numero:12,
      id_estado:1,
      descripcion: "nota de  de diente 12"
    },
    {
      color:"#fffff",
      numero:13,
      id_estado:1,
      descripcion: "nota de  de diente 13"
    },
    {
      color:"#fffff",
      numero:14,
      id_estado:1,
      descripcion: "nota de  de diente 14"
    },
    {
      color:"#fffff",
      numero:15,
      id_estado:1,
      descripcion: "nota de  de diente 15"
    },
    {
      color:"#fffff",
      numero:16,
      id_estado:1,
      descripcion: "nota de  de diente 16"
    },
    {
      color:"#fffff",
      numero:17,
      id_estado:1,
      descripcion: "nota de  de diente 17"
    },
    {
      color:"#fffff",
      numero:18,
      id_estado:1,
      descripcion: "nota de  de diente 18"
    },
    {
      color:"#fffff",
      numero:19,
      id_estado:1,
      descripcion: "nota de  de diente 19"
    },
    {
      color:"#fffff",
      numero:20,
      id_estado:1,
      descripcion: "nota de  de diente 20"
    },
    {
      color:"#fffff",
      numero:21,
      id_estado:1,
      descripcion: "nota de  de diente 21"
    },
    {
      color:"#fffff",
      numero:22,
      id_estado:1,
      descripcion: "nota de  de diente 22"
    },
    {
      color:"#fffff",
      numero:23,
      id_estado:1,
      descripcion: "nota de  de diente 23"
    },
    {
      color:"#fffff",
      numero:24,
      id_estado:1,
      descripcion: "nota de  de diente 24"
    },
    {
      color:"#fffff",
      numero:25,
      id_estado:1,
      descripcion: "nota de  de diente 25"
    },
    {
      color:"#fffff",
      numero:26,
      id_estado:1,
      descripcion: "nota de  de diente 26"
    },
    {
      color:"#fffff",
      numero:27,
      id_estado:1,
      descripcion: "nota de  de diente 27"
    },
    {
      color:"#fffff",
      numero:28,
      id_estado:1,
      descripcion: "nota de  de diente 28"
    },
    {
      color:"#fffff",
      numero:29,
      id_estado:1,
      descripcion: "nota de  de diente 29"
    },
    {
      color:"#fffff",
      numero:30,
      id_estado:1,
      descripcion: "nota de  de diente 30"
    },
    {
      color:"#fffff",
      numero:31,
      id_estado:1,
      descripcion: "nota de  de diente 31"
    },
    {
      color:"#fffff",
      numero:32,
      id_estado:1,
      descripcion: "nota de  de diente 32"
    },
  ]


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
     this.patientService.getHistoriaClinica().subscribe(data=>{
    })

    this.getData('assets/data/appointments.json', 'appointments', 'setLoaded');
    this.getData('assets/data/doctors.json', 'doctors');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  // init form
  initForm(data: any) {
  }

  changedColor(index){
    switch(this.dientes[index].id_estado){
      case 1:
        this.dientes[index].id_estado++;
        this.dientes[index].color = "#efd613";
      break;
      case 2:
        this.dientes[index].id_estado++;
        this.dientes[index].color = "#71bf4c";
      break;
      case 3:
        this.dientes[index].id_estado++;
        this.dientes[index].color = "#ff5454";
      break;
      case 4:
        this.dientes[index].id_estado = 1;
        this.dientes[index].color = "#ffffff";
      break;
    }
  }
}
