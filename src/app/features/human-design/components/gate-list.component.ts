import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hd-gate-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rounded-xl p-4 text-white" [ngClass]="themeClass">

      <h3 class="text-xl font-bold mb-4 text-center">{{ theme.toUpperCase() }}</h3>
      <h6 class="text-lg font-bold mb-4 text-center">{{ title.toUpperCase() }}</h6>

      <div *ngIf="theme == 'design'">
        <div *ngFor="let gate of gates"
            class="flex justify-between items-center py-1 text-base font-semibold">
          <span class="text-xl text-left">{{ planetSymbol(gate.planet) }}</span>
          <span class="text-center">{{ gate.gate }}.{{ gate.line }}</span>
          <span class="text-3xl text-right">{{ gateDirection(gate.fixingState) }}</span>
        </div>
      </div>

      <div *ngIf="theme == 'personality'">
        <div *ngFor="let gate of gates"
            class="flex justify-between items-center py-1 text-base font-semibold">
          <span class="text-3xl text-left">{{ gateDirection(gate.fixingState) }}</span>
          <span class="text-center">{{ gate.gate }}.{{ gate.line }}</span>
          <span class="text-xl text-right">{{ planetSymbol(gate.planet) }}</span>
        </div>
      </div>
    </div>
  `
})
export class GateListComponent {

  @Input() title = '';
  @Input() gates: any[] = [];
  @Input() theme: 'design' | 'personality' = 'design';

  get themeClass() {
    return this.theme === 'design'
      ? 'bg-red-600'
      : 'bg-black';
  }

  planetSymbol(planet: string): string {
    const map: any = {
      Sun: '☉',
      Earth: '⊕',
      Moon: '☽',
      Mercury: '☿',
      Venus: '♀',
      Mars: '♂',
      Jupiter: '♃',
      Saturn: '♄',
      Uranus: '♅',
      Neptune: '♆',
      Pluto: '♇',
      "North Node": '☊',
      "South Node": '☋'
    };

    return map[planet] || '';
  }

  gateDirection(state: string): string {
    const sign: any = {
      "Juxtaposed" : '*',
      "Detriment" : '▼',
      "Exalted" : '▲'
    }

    return sign[state] || '';
  }
}
