import { Component, EventEmitter, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { HttpService } from '../../../services/http/http.service';
import { IOption } from '../../../ui/interfaces/option';
import { IAppState } from '../../../interfaces/app-state';
import * as SettingsActions from '../../../store/actions/app-settings.actions';
import { IAppSettings } from '../../../interfaces/settings';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

const LAYOUTS: IOption[] = [
  {
    "label" : "Vertical layout",
    "value" : "vertical-layout"
  },
  {
    "label" : "Horizontal layout",
    "value" : "horizontal-layout"
  }
];

@Component({
  selector: 'actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  notificationsUrl: string;
  messagesUrl: string;
  filesUrl: string;
  notifications: any[];
  messages: any[];
  files: any[];
  layouts: IOption[];
  settingsUrl: string;
  defaultSettings: IAppSettings;
  settings: IAppSettings;
  downloadJsonHref: SafeUrl;
  currentLayout: number;
  closeDropdown: EventEmitter<boolean>;

  constructor(
    private httpSv: HttpService,
    private store: Store<IAppState>,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.notificationsUrl = 'assets/data/navbar-notifications.json';
    this.messagesUrl = 'assets/data/navbar-messages.json';
    this.filesUrl = 'assets/data/navbar-files.json';
    this.notifications = [];
    this.messages = [];
    this.files = [];
    this.layouts = LAYOUTS;
    this.closeDropdown = new EventEmitter<boolean>();
  }

  ngOnInit() {
    this.getData(this.notificationsUrl, 'notifications');
    this.getData(this.messagesUrl, 'messages');
    this.getData(this.filesUrl, 'files');
    this.defaultSettings = environment.appSettings;

    this.store.select('appSettings').subscribe(st => {
      if (st) {
        this.settings = st;
        this.downloadSettings(st);
        //console.log(this.settings.sidebarBg)
      }
    });

    this.currentLayout = (this.router.url.split('/').filter(n => n)[0] === 'horizontal-layout') ? 1 : 0;
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

  setSidebarColor(value: any) {
    this.store.dispatch(new SettingsActions.Update({
      sidebarBg: value.color,
      sidebarColor: value.contrast
    }));
  }

  setTopbarColor(value: any) {
    this.store.dispatch(new SettingsActions.Update({
      topbarBg: value.color,
      topbarColor: value.contrast
    }));
  }

  changeLayout(layout: string) {
    this.onCloseDropdown();
    this.store.dispatch(new SettingsActions.Update({ layout: layout }));

    let url = this.router.url.split('/').filter(n => n);
    url[0] = layout;
    let route = url.join('/');
    setTimeout(() => {
      this.router.navigate([route]);
    }, 0);
  }

  changeBoxed(boxed: boolean) {
    this.store.dispatch(new SettingsActions.Update({ boxed: boxed }));
  }

  resetSettings(data: IAppSettings) {
    this.store.dispatch(new SettingsActions.Reset(data));
  }

  downloadSettings(settings: IAppSettings) {
    const JSON_FILE = JSON.stringify(settings);
    const URI = this.sanitizer.bypassSecurityTrustUrl(`data:text/json;charset=UTF-8, ${encodeURIComponent(JSON_FILE)}`);

    this.downloadJsonHref = URI;
  }

  onCloseDropdown() {
    this.closeDropdown.emit(true);
  }
}
