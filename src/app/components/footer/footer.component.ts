import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

	public contents: any;

	constructor() {
		this.contents = {
			title: "Copyright © 2018, Windforce.",
			sub_title: "All trademarks and copyrights belong to their respective owners."
		};
	}

	ngOnInit() {
	}

}
