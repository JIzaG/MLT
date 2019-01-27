import { trigger, state, style, transition, animate } from '@angular/animations';

export const SUB_MENU = trigger('subMenu',[
  state('active', style({
    height: '*',
    display: 'block'
  })),
  state('inactive', style({
    height: 0,
    display: 'none'
  })),
  transition('inactive => active', animate('200ms ease-in-out')),
  transition('active => inactive', animate('200ms ease-in-out')),
])