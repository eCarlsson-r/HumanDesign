import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/api/api.service';
import { roleGuard } from '../../core/guards/auth.guard';
import { RouteMeta } from '@analogjs/router';

export const routeMeta: RouteMeta = {
  canActivate: [roleGuard(['Admin'])],
};

@Component({
  standalone: true,
  imports: [NgFor, RouterLink, FormsModule],
  template: `
  <div class="p-8">

    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">CMS Editor</h1>

      <select
        class="border rounded px-3 py-2"
        [(ngModel)]="value"
        (change)="load()">
        <option value="">All</option>
        <option value="Type">Types</option>
        <option value="Profile">Profiles</option>
        <option value="Gate">Gates</option>
        <option value="Channel">Channels</option>
        <option value="Center">Centers</option>
        <option value="Cross">Cross</option>
        <option value="Variable">Variables</option>
        <option value="Arrow">Variable Arrow</option>
      </select>
    </div>

    <div class="bg-white shadow rounded-xl overflow-x-auto">

      <table class="min-w-full text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3 text-left">Property</th>
            <th class="p-3 text-left">Value</th>
            <th class="p-3 text-left">Title</th>
            <th class="p-3 text-left"></th>
          </tr>
        </thead>

        <tbody>
          <tr *ngFor="let item of items()"
              class="border-t hover:bg-gray-50">
            <td class="p-3">{{ item.property }}</td>
            <td class="p-3">{{ item.value }}</td>
            <td class="p-3 font-medium">{{ item.title }}</td>
            <td class="p-3">
              <a
                [routerLink]="['/admin/cms', item.id]"
                class="text-blue-600 hover:underline">
                Edit
              </a>
            </td>
          </tr>
        </tbody>
      </table>

    </div>

  </div>
  `
})
export default class CmsListPage {
  private api = inject(ApiService);

  items = signal<any[]>([]);
  value = '';

  ngOnInit() {
    this.load();
  }

  load() {
    if (!this.value) return;
    let url = '/cms/attributes';
    if (this.value) url += `?property=${this.value}`;

    this.api.get<any[]>(url)
      .subscribe(res => this.items.set(res));
  }
}
