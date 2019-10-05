import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BasePageComponent } from '../../base-page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { TCModalService } from '../../../ui/services/modal/modal.service';
import { IUser } from '../../../ui/interfaces/user';
import { PacientesService } from '../../../services/pacientes/pacientes.service';
import { id } from '@swimlane/ngx-charts/release/utils';
import { IOption } from '../../../ui/interfaces/option';

@Component({
  selector: 'app-salud-dental',
  templateUrl: './salud-dental.component.html',
  styleUrls: ['./salud-dental.component.scss']
})
export class SaludDentalComponent extends BasePageComponent implements OnInit, OnDestroy {
  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;

  dientes: any;

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private patientService: PacientesService,
    private modal: TCModalService,
  ) {
    super(store, httpSv);
  }

  ngOnInit() {
    super.ngOnInit();
    this.patientService.getSaludDental().subscribe(async data => {
      this.dientes = await data[0]['payload']['doc'].data();
      console.log(this.dientes);
      
    })

    this.getData('assets/data/appointments.json', 'appointments', 'setLoaded');
    this.getData('assets/data/doctors.json', 'doctors');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  asignarColor(indice){
    return {
      'fill': String(this.dientes[[Object.keys(this.dientes)[indice]][0]][0])
    }
  }

  // init form
  initForm(data: any) {
  }

  SalvarCambio() {

    this.patientService.updateSaludDental(this.dientes);
  }

  changedColor(index) {
    switch (this.dientes[[Object.keys(this.dientes)[index]][0]][2]) {
      case 1:
        this.dientes[[Object.keys(this.dientes)[index]][0]][2]++;
        this.dientes[[Object.keys(this.dientes)[index]][0]][0] = "#efd613";
        break;
      case 2:
        this.dientes[[Object.keys(this.dientes)[index]][0]][2]++;
        this.dientes[[Object.keys(this.dientes)[index]][0]][0] = "#71bf4c";
        break;
      case 3:
        this.dientes[[Object.keys(this.dientes)[index]][0]][2]++;
        this.dientes[[Object.keys(this.dientes)[index]][0]][0] = "#ff5454";
        break;
      case 4:
        this.dientes[[Object.keys(this.dientes)[index]][0]][2] = 1;
        this.dientes[[Object.keys(this.dientes)[index]][0]][0] = "#ffffff";
        break;
    }
  }
}
