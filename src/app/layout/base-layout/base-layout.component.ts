import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { IPageData } from '../../interfaces/page-data';
import { IAppState } from '../../interfaces/app-state';
import { IFile } from '../../interfaces/file';
import { HttpService } from '../../services/http/http.service';
import { IAppSettings } from '../../interfaces/settings';
import { IMenuItem } from '../../interfaces/main-menu';
import * as SettingsActions from '../../store/actions/app-settings.actions';

@Component({
  selector: 'base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent implements OnInit {
  pageData: IPageData;
  appSettings: IAppSettings;
  files: IFile[];
  searchForm: FormGroup;
  searchData: any[];
  scrolled: boolean;

  constructor(
    public store: Store<IAppState>,
    public fb: FormBuilder,
    public httpSv: HttpService,
    public router: Router,
    public elRef: ElementRef
  ) {
    this.files = [];
    this.searchData = [];
    this.scrolled = false;
  }

  ngOnInit() {
    this.store.select('pageData').subscribe(data => {
      setTimeout(() => {
        this.pageData = data ? data : null;
      });
    });
    this.store.select('appSettings').subscribe(settings => {
      settings ? this.appSettings = settings : null;
    });

    this.getData('assets/data/navbar-files.json', 'files');
    this.getSearchData('assets/data/menu.json');
    this.initSearchForm();
    this.scrollToTop();
  }

  // get data
  // parameters:
  // * url - data url
  // * dataName - set data to 'dataName'
  // * callbackFnName run callback function with name 'callbackFnName'
  getData(url: string, dataName: string, callbackFnName?: string) {
    this.httpSv.getData(url).subscribe(
      data => {
        this[dataName] = data;
      },
      err => {
        console.log(err);
      },
      () => {
        (callbackFnName && typeof this[callbackFnName] === 'function') ? this[callbackFnName](this[dataName]) : null;
      }
    );
  }

  getSearchData(url: string) {
    this.httpSv.getData(url).subscribe(
      data => {
        this.searchData = data;
      },
      err => {
        console.log(err);
      },
      () => {
        this.getItemsRouters(this.searchData);
      }
    );
  }

  getItemsRouters(data: IMenuItem[]) {
    let newData: any[] = [];

    this.searchData.forEach((item: IMenuItem) => {
      if (item.sub) {
        item.sub.forEach((subItem) => {
          newData.push(subItem);
        });
      } else {
        !item.groupTitle ? newData.push(item) : null;
      }
    });

    this.searchData = newData;
  }

  initSearchForm() {
    this.searchForm = this.fb.group({
      search: ''
    });
  }

  toggleSidebar(value: boolean) {
    this.store.dispatch(new SettingsActions.SidebarState(value));
  }

  onScroll(event: Event) {
    this.scrolled = event.srcElement.scrollTop > 0;
  }

  // scroll to page top
  scrollToTop() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      const CONTAINER = this.elRef.nativeElement.querySelector('.main-content') || window;

      setTimeout(() => {
        CONTAINER.scrollTo(0, 0);
      });
    });
  }
}
