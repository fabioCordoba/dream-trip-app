import { IRegion } from "../interfaces/iregion";
import { get, set } from 'lodash-es';

export class Region implements IRegion {
    constructor(data: any){
        set(this, 'data', data);
    }

    get code(): string{
        return get(this, 'data.code');
    }

    get name(): string{
        return get(this, 'data.name');
    }
}
