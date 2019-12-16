import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Injectable } from '@angular/core';

@Injectable()
export class HebrewDateAdapter extends MomentDateAdapter {
	getFirstDayOfWeek(): number {
		return 1;
	}
}
