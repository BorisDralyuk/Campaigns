import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, filter, switchMap, toArray } from 'rxjs/operators';
import { from } from 'rxjs';
import { Campaign } from './interfaces';


@Injectable({
	providedIn: 'root'
})
export class CampaignService {

	constructor(private fb: AngularFireDatabase) {}

	public getTitleCampaign(): string[] {
		return ['$key', 'name', 'startDate', 'devices', 'endDate', 'budget', 'bit', 'edit'];
	}

	public getDevices() {
		return this.fb.list('devices').snapshotChanges()
			.pipe(
				switchMap(e => from(e).pipe(
					map((el, i) => {
						let y = el['payload'].toJSON() as string;
						return y
					}),
					toArray()
				))
			)
	}

	public getData() {
		return this.fb.list('campaigns').snapshotChanges()
			.pipe(
				switchMap(e => from(e).pipe(
					map((el, i) => {
						let y = el['payload'].toJSON() as Campaign;
						y['$key'] = el.key
						y.devices = Object.values<string>(y.devices)
						return y
					}),
					toArray()
					)
					
				)
			)
	}

	public getCampaignById(id: string){
		return this.fb.list('campaigns').snapshotChanges()
		.pipe(
			switchMap( e => from(e).pipe(
				filter(el => el['key'] == id),
				map((el, i) => {
					let y = el['payload'].toJSON() as Campaign;
					y['$key'] = id
					y.devices = Object.values<string>(y.devices)
					return y
				}))
			))
	}

	public insertCampaign(campaign: Campaign){
		return this.fb.list('campaigns').push({
			name: campaign.name,
			startDate: campaign.startDate,			
			devices: campaign.devices,
			endDate: campaign.endDate,
			budget: campaign.budget,
			bid: campaign.bid
		})
	}

	public updateCampaign(campaign: Campaign) {
		return this.fb.list('campaigns').update(campaign.$key,
			{
				name: campaign.name,
				startDate: campaign.startDate,
				devices: campaign.devices,
				endDate: campaign.endDate,
				budget: campaign.budget,
				bid: campaign.bid
			});
	}
}
