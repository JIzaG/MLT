import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http/http.service';

import { IMenuItem } from '../../../interfaces/main-menu';
import { SUB_MENU } from '../../../animations/sub-menu';
import * as SettingsActions from '../../../store/actions/app-settings.actions';
import { IAppState } from '../../../interfaces/app-state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as PageActions from '../../../store/actions/page.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [SUB_MENU]
})
export class MenuComponent implements OnInit {
  @HostBinding('class.main-menu') true;
  @HostBinding('class.horizontal') get horizontal() {
    return this.orientation === 'horizontal';
  };
  @HostBinding('class.vertical') get vertical() {
    return this.orientation === 'vertical';
  };
  @Input() orientation: string;
  @Input() src: string;
  menuItems: IMenuItem[];
  caret: string;

  constructor(
    private httpSv: HttpService,
    private store: Store<IAppState>,
    private router: Router
  ) {
    this.caret = 'icofont-thin-right';
    this.orientation = 'vertical';
  }

  ngOnInit() {
    this.getMenuData(this.src);
  }

  getMenuData(url: string) {
    this.httpSv.getData(url).subscribe(
      data => {
        this.menuItems = data;
      },
      err => {
        console.log(err)
      }
    );
  }

  toggle(event: Event, item: any, el: any) {
    event.preventDefault();

    let items: any[] = el.menuItems;

    if (item.active) {
      item.active = false;
    } else {
      for (let i = 0; i < items.length; i++) {
        items[i].active = false;
      }
      item.active = true;
    }

    console.log(item)

    this.changeRoute(
      item.routing,
      !item.sub && !this.isActive([this.orientation, item.routing]),
      item.layout ? item.layout : this.orientation
    );
  }

  subState(item: IMenuItem, rla: boolean) {
    return item.active || rla ? 'active' : 'inactive'
  }

  closeAll() {
    this.menuItems.forEach(item => {
      item.active = false;

      this.closeSub(item);
    });
  }

  closeSub(item: IMenuItem) {
    if (item.sub && item.sub.length) {
      item.sub.forEach(subItem => {
        subItem.active = false;
      });
    }
  }

  closeSidebar() {
    this.store.dispatch(new SettingsActions.SidebarState(false));
  }

  // change route
  changeRoute(routing: string, bool: boolean = true, layout: string = this.orientation) {
    console.log(bool)
    if (bool) {
      this.store.dispatch(new PageActions.Reset());

      setTimeout(() => {
        this.router.navigate([`./${layout}`, routing]);
      }, 0);
    }
  }

  isActive(instruction: any[]): boolean {
    return this.router.isActive(this.router.createUrlTree(instruction), true);
  }
}
