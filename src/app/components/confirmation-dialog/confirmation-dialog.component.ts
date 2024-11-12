import { Component, Input } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss'],
    standalone: true,
    imports: [MatDialogTitle, TranslateModule, CdkScrollable, MatDialogContent, NgIf, MatDialogActions, MatButton, MatDialogClose]
})
export class ConfirmationDialogComponent {
  @Input() showClearMessage = true;
}
