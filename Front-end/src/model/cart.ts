export interface CartItem {
    bookId: number;
    amount: number;
}

export interface ICart {
  items: CartItem[]
}

export class Cart {
    private items: Map<number, number> = new Map();
  
    // Add item to the cart
    addItem(bookId: number, amount: number): void {
      this.items.set(bookId, amount);
    }
  
    // Remove item from the cart
    removeItem(bookId: number): void {
      this.items.delete(bookId);
    }
  
    // Update the amount of an item in the cart
    updateAmount(bookId: number, amount: number): void {
      if (this.items.has(bookId)) {
        this.items.set(bookId, amount);
      }
    }
  
    // Get the items in the cart
    getItems(): CartItem[] {
      return Array.from(this.items.entries()).map(([bookId, amount]) => ({
        bookId,
        amount,
      }));
    }
}

export interface Order {
  items : CartItem[]
  shippingAddress: string
  phoneNumber: string
}