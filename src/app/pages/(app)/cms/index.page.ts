import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouteMeta } from '@analogjs/router';
import { roleGuard } from '../../../core/guards/auth.guard';
import { ApiService } from '../../../core/api/api.service';

export const routeMeta: RouteMeta = {
  canActivate: [roleGuard(['Admin'])],
};

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
  <div class="max-w-7xl mx-auto p-6">

    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">CMS Editor</h1>

      <select
        class="border rounded px-3 py-2"
        [(ngModel)]="value"
        (change)="select()">
        <option value="">Attributes</option>
        <option value="Type">Types</option>
        <option value="Profile">Profiles</option>
        <option value="Gate">Gates</option>
        <option value="Channel">Channels</option>
        <option value="Center">Centers</option>
        <option value="Cross">Cross</option>
      </select>
    </div>

    <div class="bg-white shadow rounded-xl overflow-x-auto">

      <table class="min-w-full text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th *ngIf="value == 'Attribute' || value == ''" class="p-3 text-left">Property</th>
            <th *ngIf="value == 'Attribute' || value == ''" class="p-3 text-left">Value</th>
            <th *ngIf="value == 'Profile'" class="p-3 text-left">Code 1</th>
            <th *ngIf="value == 'Profile'" class="p-3 text-left">Code 2</th>
            <th *ngIf="value == 'Gate'" class="p-3 text-left">Number</th>
            <th *ngIf="value == 'Channel'" class="p-3 text-left">Gate A</th>
            <th *ngIf="value == 'Channel'" class="p-3 text-left">Gate B</th>
            <th *ngIf="value == 'Cross'" class="p-3 text-left">Type</th>
            <th *ngIf="value == 'Type' || value == 'Profile' || value == 'Channel' || value == 'Center' || value == 'Cross'" class="p-3 text-left">Name</th>
            <th *ngIf="value == 'Center'" class="p-3 text-left">Definition</th>
            <th *ngIf="value == 'Cross'" class="p-3 text-left">Gate 1</th>
            <th *ngIf="value == 'Cross'" class="p-3 text-left">Gate 2</th>
            <th *ngIf="value == 'Cross'" class="p-3 text-left">Gate 3</th>
            <th *ngIf="value == 'Cross'" class="p-3 text-left">Gate 4</th>
            <th *ngIf="value != 'Type' && value != 'Profile' && value != 'Channel' && value != 'Center' && value != 'Cross'" class="p-3 text-left">Title</th>
            <th class="p-3 text-left"></th>
          </tr>
        </thead>

        <tbody>
          <tr *ngFor="let item of items()"
              class="border-t hover:bg-gray-50">
            <td *ngIf="value == 'Attribute' || value == ''" class="p-3">{{ item.property }}</td>
            <td *ngIf="value == 'Attribute' || value == ''" class="p-3">{{ item.value }}</td>
            <td *ngIf="value == 'Profile'" class="p-3">{{ item.code1 }}</td>
            <td *ngIf="value == 'Profile'" class="p-3">{{ item.code2 }}</td>
            <td *ngIf="value == 'Gate'" class="p-3">{{ item.number }}</td>
            <td *ngIf="value == 'Channel'" class="p-3">{{ item.gateA }}</td>
            <td *ngIf="value == 'Channel'" class="p-3">{{ item.gateB }}</td>
            <td *ngIf="value == 'Cross'" class="p-3">{{ item.type }}</td>
            <td *ngIf="value == 'Type' || value == 'Profile' || value == 'Channel' || value == 'Cross'" class="p-3">{{ item.name }}</td>
            <td *ngIf="value == 'Center'" class="p-3">{{ item.centerName }}</td>
            <td *ngIf="value == 'Center'" class="p-3">{{ item.definition }}</td>
            <td *ngIf="value == 'Cross'" class="p-3">{{ item.cross1 }}</td>
            <td *ngIf="value == 'Cross'" class="p-3">{{ item.cross2 }}</td>
            <td *ngIf="value == 'Cross'" class="p-3">{{ item.cross1 }}</td>
            <td *ngIf="value == 'Cross'" class="p-3">{{ item.cross2 }}</td>
            <td *ngIf="value != 'Type' && value != 'Profile' && value != 'Channel' && value != 'Center' && value != 'Cross'" class="p-3 font-medium">{{ item.title }}</td>
            <td class="p-3">
              <a
                [routerLink]="[
                  '/cms/'+(value.toLowerCase() == '' ? 'attribute' : value.toLowerCase()),
                  (value == 'Gate') ? item.number : item.id
                ]"
                class="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700">
                Edit
              </a>
            </td>
          </tr>
        </tbody>
      </table>

    </div>

    <!-- Pagination -->
    <div class="flex justify-between mt-6">
      <button
        (click)="prev()"
        class="px-4 py-2 bg-gray-200 rounded"
      >
        Previous
      </button>

      <div>Page {{ page }}</div>

      <button
        (click)="next()"
        class="px-4 py-2 bg-gray-200 rounded"
      >
        Next
      </button>
    </div>

  </div>
  `
})
export default class CmsListPage {
  private api = inject(ApiService);

  items = signal<any[]>([]);
  total = 0;
  page = 1;
  pageSize = 20;
  value = '';

  ngOnInit() {
    this.load();
  }

  load() {
    let url = 'cms/attributes';
    if (this.value) url += `?property=${this.value}&page=${this.page}&pageSize=${this.pageSize}`;
    else url += `?page=${this.page}&pageSize=${this.pageSize}`;

    this.api.get<{items: any[], total: number}>(url)
      .subscribe(res => {
        this.items.set(res.items);
        this.total = res.total;
      });
  }

  select() {
    this.page = 1;
    this.total = 0;
    this.load();
  }

  next() {
    console.info(this.total, this.pageSize, this.total / this.pageSize, this.page +1)
    if (this.total / this.pageSize <= this.page +1) {
      this.page++;
      this.load();
    }
  }

  prev() {
    if (this.page > 1) {
      this.page--;
      this.load();
    }
  }
}
