import { ICountry } from './../interfaces/icountry';
import { get, set } from 'lodash-es';

export class Country implements ICountry{
    constructor(data: any) {
        set(this, 'data', data);
    }

    get name(): string {
        return get(this, 'data.name');
    }

    get flag(): string {
        return get(this, 'data.flag');
    }
    
    get latlng(): Array<number> {
        return get(this, 'data.latlng');
    }
}
