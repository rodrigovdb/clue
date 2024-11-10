import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateDirective, TranslateModule } from '@ngx-translate/core';
import { Entity } from 'src/app/guess/guess.component';

@Component({
  selector: 'app-pannel',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatCheckboxModule,
    TranslateModule
  ],
  templateUrl: './pannel.component.html',
  styleUrl: './pannel.component.scss'
})
export class PannelComponent {
  @Input() items:Entity[] | null = [];
  @Input() selected!:Entity;
  @Input() title:string = '';

  onCheckSuspect(ob: MatCheckboxChange, key: string) {
    debugger
  }
}
