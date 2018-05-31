import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ngx-page-scroll';

@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

	public favicon: {
		url: string
	}

	public contents: any;

	public action: {
		in: boolean,
		out: boolean
	};

	public isCollapsed: boolean;

	public menu: {
		list: Array<{
			name: string,
			link: string
		}>
	};

	public activeId: number;

	constructor(private pageScrollService: PageScrollService) {
		this.favicon = {
			url: "assets/favicon_g.png"
		};

		this.contents = {
			title: "windforce",
			whitepaper: "whitepaper"
		};

		this.action = {
			in: false,
			out: false
		};

		this.isCollapsed = true;

		this.menu = {
			list: [{
				name: "what is wind",
				link: "#whatSection"
			}, {
				name: "road map",
				link: "#roadSection"
			}, {
				name: "team",
				link: "#teamSection"
			}, {
				name: "partners",
				link: "#partnerSection"
			}, {
				name: "media",
				link: "#mediaSection"
			}]
		};

		this.activeId = 0;
		
		this.initScroll();
	}

	ngOnInit() {
		this.scrollListener();
		window.addEventListener('scroll', () => {
			this.scrollListener();
		}, true);
	}

	ngOnDestroy() {
		window.removeEventListener('scroll', () => {
			this.scrollListener();
		}, true);
	}

	private scrollListener = function() {
		let y = window.scrollY;
		if(y > 66) {
			this.action.in = true;
		} else {
			this.action.in = false;
		}
	}

	private initScroll = function() {
		PageScrollConfig.defaultScrollOffset = 50;
		PageScrollConfig.defaultEasingLogic = {
			ease: (t: number, b: number, c: number, d: number): number => {
				if (t === 0) return b;
				if (t === d) return b + c;
				if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
				return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
			}
		};
	};

	public scrollTo = function(hash: string) {
		let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, hash);
		this.pageScrollService.start(pageScrollInstance);
	};

}
