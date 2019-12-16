export class Campaign {
	$key: string;
	name: string;
	startDate: number;
	devices: string[];
	endDate: number;
	budget: number;
	bid: number;
	constructor() {
		this.devices = [];
		this.bid = 1;
	}
}