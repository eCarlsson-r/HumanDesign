import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, } from '@angular/router';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouteMeta } from '@analogjs/router';
import { roleGuard } from '../../../../core/guards/auth.guard';
import { ApiService } from '../../../../core/api/api.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

export const routeMeta: RouteMeta = {
  canActivate: [roleGuard(['Admin'])],
};

@Component({
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink, CKEditorModule],
  template: `
  <div class="p-8 max-w-7xl mx-auto" *ngIf="model()">

    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">
        Editing: {{ model().title }}
      </h1>

      <a routerLink="/cms"
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
        <ckeditor [editor]="Editor" [(ngModel)]="model().preview" />
      </div>

      <div>
        <label class="block font-medium mb-2">Summary</label>
        <ckeditor [editor]="Editor" [(ngModel)]="model().summary" />
      </div>

      <div>
        <label class="block font-medium mb-2">Detail</label>
        <ckeditor [editor]="Editor" [(ngModel)]="model().detail" />
      </div>

      <button
        (click)="save()"
        class="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700">
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
  public Editor: any;
  public isBrowser = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private api: ApiService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  model = signal<any | null>(null);
  saved = signal(false);

  ngOnInit() {
    // Only load the editor if it's running in the browser
    if (this.isBrowser) {
      import('@ckeditor/ckeditor5-build-classic').then(ClassicEditor => {
        this.Editor = ClassicEditor.default;
      });
    }

    const id = this.route.snapshot.paramMap.get('id');

    this.api.get(`cms/gate/${id}`)
      .subscribe(res => this.model.set(res));
  }

  save() {
    this.saved.set(false);

    this.api.put(`cms/gate/${this.model().id}`, this.model())
      .subscribe(() => {
        this.saved.set(true);
      });
  }
}
