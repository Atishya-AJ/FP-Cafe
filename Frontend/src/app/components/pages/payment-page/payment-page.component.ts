import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent implements OnInit {
  paymentForm!: FormGroup;


  constructor(private formBuilder: FormBuilder ,
     private router: Router,
     private cartService: CartService) { }

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvv: ['', Validators.required],
      cardHolderName: ['', Validators.required]
    });
  }

  submitPayment()
  {
    if (this.paymentForm.valid) {
      // Perform payment processing logic here\
      this.cartService.clearCart();
      console.log('Payment submitted successfully!');

      // Navigate to the order success page
      this.router.navigateByUrl('/order-success');
    } else {
      // Handle invalid form submission
      console.log('Invalid payment form!');
    }

  }

  submitCOD() {
    // Perform any necessary operations for Cash on Delivery

    // Redirect to Order Success page
    this.router.navigate(['/order-success']);
    this.cartService.clearCart();

  }
}
