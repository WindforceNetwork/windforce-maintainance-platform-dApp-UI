import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textFormat'
})
export class TextFormatPipe implements PipeTransform {

 
    transform(value: any, args?: any): any {
		var option: number = args;
		switch(option) {
			case 1:
			value = value.charAt(0).toUpperCase() + value.slice(1);
			break;
			case 2:
			let values = value.split(" ");
			for(let o in values) {
				let v = values[o];
				values[o] = v.charAt(0).toUpperCase() + v.slice(1);
			}
			value = values.join(" ");
			break;
			case 3:
			value = value.toUpperCase();
			break;
		}
		return value;
	}

}
