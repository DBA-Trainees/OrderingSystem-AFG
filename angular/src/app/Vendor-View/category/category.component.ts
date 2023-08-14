import { Component } from '@angular/core';

import { CreateOrEditCategoryComponent } from './create-or-edit-category/create-or-edit-category.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  animations: [appModuleAnimation()],
})


export class CategoryComponent {


}
