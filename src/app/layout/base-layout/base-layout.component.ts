import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Store } from '@ngrx/store';
import { IPageData } from '../../interfaces/page-data';
import { IAppState } from '../../interfaces/app-state';
import { IFile } from '../../interfaces/file';
import { HttpService } from '../../services/http/http.service';
import { IAppSettings } from '../../interfaces/settings';
import { IMenuItem } from '../../interfaces/main-menu';
import * as SettingsActions from '../../store/actions/app-settings.actions';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent implements OnInit {
  pageData: IPageData;
  appSettings: IAppSettings;
  files: IFile[];
  filesUrl: string;
  searchForm: FormGroup;
  searchData: any[];
  searchDataUrl: string;
  scrolled: boolean;

  constructor(
    public store: Store<IAppState>,
    public fb: FormBuilder,
    public httpSv: HttpService,
    public router: Router,
    public elRef: ElementRef
  ) {
    this.filesUrl = 'assets/data/navbar-files.json';
    this.searchDataUrl = 'assets/data/menu.json';
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

    this.getData(this.filesUrl, 'files');
    this.getSearchData(this.searchDataUrl);
    this.initSearchForm();
    this.scrollToTop();
  }

  getData(url: string, dataName: string) {
    this.httpSv.getData(url).subscribe(
      data => {
        this[dataName] = data;
      },
      err => {
        console.log(err);
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
