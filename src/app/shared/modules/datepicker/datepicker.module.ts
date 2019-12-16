import { NgModule } from '@angular/core';

import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { HebrewDateAdapter } from './hebrew-dateadapter.service';


export const FORMATS = {
	parse: {
		dateInput: 'YYYY-MM-DD',
	},
	display: {
		dateInput: 'YYYY-MM-DD',
		monthYearLabel: 'MMM YYYY',
		dateA11yLabel: 'YYYY-MM-DD',
		monthYearA11yLabel: 'MMMM YYYY',
	},
};

@NgModule({
	providers: [
		{
			provide: DateAdapter,
			useClass: HebrewDateAdapter,
			deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
		},

		{ provide: MAT_DATE_FORMATS, useValue: FORMATS },
	]
})
export class DatepickerModule { }
