import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Editor as ClassicEditor, EditorWatchdog } from '@ckeditor/ckeditor5-build-classic';
import { roleGuard } from '../../core/guards/auth.guard';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

export const routeMeta: RouteMeta = {
  canActivate: [roleGuard(['Admin'])],
};

@Component({
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink, CKEditorModule],
  template: `
  <div class="p-8" *ngIf="model()">

    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">
        Editing: {{ model().title }}
      </h1>

      <a routerLink="/admin/cms"
         class="text-gray-600 hover:underline">
        Back
      </a>
    </div>

    <div class="bg-white p-6 rounded-xl shadow space-y-6">

      <div>
        <label class="block text-sm font-medium mb-2">Title</label>
        <input
          [(ngModel)]="model().title"
          class="w-full border rounded px-3 py-2"/>
      </div>

      <div>
        <label class="block font-medium mb-2">Preview</label>
        <ckeditor
          [editor]="Editor"
          [(ngModel)]="model().preview">
        </ckeditor>
      </div>

      <div>
        <label class="block font-medium mb-2">Summary</label>
        <ckeditor
          [editor]="Editor"
          [(ngModel)]="model().summary">
        </ckeditor>
      </div>

      <div>
        <label class="block font-medium mb-2">Detail</label>
        <ckeditor
          [editor]="Editor"
          [(ngModel)]="model().detail">
        </ckeditor>
      </div>

      <button
        (click)="save()"
        class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        Save Changes
      </button>

      <div *ngIf="saved()"
           class="text-green-600 font-medium">
        ✔ Saved successfully
      </div>

    </div>

  </div>
  `
})
export default class CmsEditPage {

  Editor = ClassicEditor;

  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  model = signal<any | null>(null);
  saved = signal(false);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.http.get(`/api/cms/attributes/${id}`)
      .subscribe(res => this.model.set(res));
  }

  save() {
    this.saved.set(false);

    this.http.put(`/api/cms/attributes/${this.model().id}`, this.model())
      .subscribe(() => {
        this.saved.set(true);
      });
  }
}
