import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasePageComponent } from '../../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';

@Component({
  selector: 'page-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PagePatientsComponent extends BasePageComponent implements OnInit, OnDestroy {
  patients: any[];

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Patients',
      breadcrumbs: [
        {
          title: 'Medicine',
          route: 'default-dashboard'
        },
        {
          title: 'Patients'
        }
      ]
    };
    this.patients = [];
  }

  ngOnInit() {
    super.ngOnInit();

    this.getData('assets/data/patients.json', 'patients', 'setLoaded');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  edit(row: any) {

  }

  remove(id: string) {
    this.patients = this.patients.filter(row => row.id !== id);
  }
}
