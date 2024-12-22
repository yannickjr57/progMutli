import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-favoris',
  templateUrl: 'favoris.page.html',
  styleUrls: ['favoris.page.scss']
})
export class FavorisPage implements OnInit {
  favoris$ = this.supabase.favoris$;
  constructor(
        private readonly supabase: SupabaseService, private route: ActivatedRoute,
      ) {}

  
  ngOnInit(): void {
    this.supabase.getFavoris();
    
  }

}
