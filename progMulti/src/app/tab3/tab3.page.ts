import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  favoris$ = this.supabase.favoris$;
  constructor(
        private readonly supabase: SupabaseService, private route: ActivatedRoute,
      ) {}

  
  

}
