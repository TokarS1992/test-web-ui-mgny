import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [ MatTabsModule, MatCheckboxModule ]
})
export class MaterialModule { }
