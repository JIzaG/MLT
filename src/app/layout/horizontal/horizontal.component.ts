import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { HttpService } from '../../services/http/http.service';
import { IAppState } from '../../interfaces/app-state';
import { BaseLayoutComponent } from '../base-layout/base-layout.component';
import { Router } from '@angular/router';

@Component({
  selector: 'horizontal-layout',
  templateUrl: './horizontal.component.html',
  styleUrls: [
    '../base-layout/base-layout.component.scss',
    './horizontal.component.scss'
  ]
})
export class HorizontalLayoutComponent extends BaseLayoutComponent implements OnInit {
  constructor(
    store: Store<IAppState>,
    fb: FormBuilder,
    httpSv: HttpService,
    router: Router,
    elRef: ElementRef
  ) {
    super(store, fb, httpSv, router, elRef);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
