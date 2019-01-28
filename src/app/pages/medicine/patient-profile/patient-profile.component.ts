import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Store } from '@ngrx/store';
import { BasePageComponent } from '../../base-page';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';

@Component({
  selector: 'page-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PagePatientProfileComponent extends BasePageComponent implements OnInit, OnDestroy {

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private formBuilder: FormBuilder
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Patient profile page',
      breadcrumbs: [
        {
          title: 'Medicine',
          route: 'default-dashboard'
        },
        {
          title: 'Patients',
          route: 'patients'
        },
        {
          title: 'Dr. Sophie'
        }
      ]
    };
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
