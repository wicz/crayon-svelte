import { Mounter } from 'crayon';
export declare class SvelteMounter implements Mounter {
    target: HTMLElement;
    selector: string;
    instances: any[];
    constructor(target?: HTMLElement, selector?: string, instances?: any[]);
    push(builder: any): Promise<void>;
    shift(): Promise<void>;
    createBuilder(Component: any, props?: Record<any, any>): (target: HTMLElement) => any;
}
