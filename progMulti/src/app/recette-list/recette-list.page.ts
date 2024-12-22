import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recette-list',
  templateUrl: 'recette-list.page.html',
  styleUrls: ['recette-list.page.scss']
})
export class Tab1Page implements OnInit {

  recettes$ = this.supabase.recettes$

  constructor(
    private readonly supabase: SupabaseService,
  ) {}

  ngOnInit() {
    this.supabase.getRecettes();  
  }
}
