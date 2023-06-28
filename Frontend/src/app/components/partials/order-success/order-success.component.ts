import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent {


  constructor(private router: Router) { }

  ngOnInit(): void {
    // Redirect to home page after 3 seconds (adjust the delay as needed)
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000);
  }
}
