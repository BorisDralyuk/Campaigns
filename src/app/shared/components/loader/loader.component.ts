import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
  <div class="loader-container">
  <div class="lds-roller">
	<div></div>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
  </div>
</div>`,
})
export class LoaderComponent {
}
