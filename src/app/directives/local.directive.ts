import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[localVariables]',
    exportAs: 'localVariables'
})
export class LocalDirective {

    @Input('localVariables') set localVariables( struct: any ) {
        if ( typeof struct === 'object' ) {
            for (const variableName in struct ) {
                if (struct.hasOwnProperty(variableName)) {
                    this[variableName] = struct[variableName];
                }
            }
        }
    }
    constructor( ) {
    }
}
