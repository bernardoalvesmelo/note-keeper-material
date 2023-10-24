import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardHoverDirective } from './directives/card-hover.directive';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [CardHoverDirective],
  imports: [
    CommonModule,
      
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
  ],
  exports: [
    CardHoverDirective,
    
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule]
})
export class SharedModule { }
