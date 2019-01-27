import {
	trigger,
	state,
	style,
	animate,
	transition,
	keyframes,
	query
} from '@angular/animations';

export const pickerApear = trigger('pickerApear', [
	state('open', style({
		height: '100%',
		width: '100%',
		borderRadius: 0
		// display: 'block'		
	})),
	state('close', style({
		height: '20px' , 
		width: '20px',
		borderRadius: '50%'
		// display: 'none'
	})),
	transition('open => close', animate('500ms ease-in-out')),
	transition('close => open', animate('600ms ease-in-out')),
]);

export const foreground = trigger('foreground', [
	state('open', style({
		zIndex: 3,
	})),
	state('close', style({
		zIndex: 3
		// display: 'none'
	})),
	transition('open => close', animate('500ms ease-in-out')),
	transition('close => open', animate('100ms 500ms ease-in-out')),
]);
