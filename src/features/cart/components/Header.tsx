"use client";

import React from "react";

export default function Header() {
  return (
    <div className="text-center mb-8 lg:mb-12">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
        Your Shopping Cart
      </h1>
      <p className="text-sm sm:text-base text-muted-foreground">
        Review your items and proceed to checkout
      </p>
    </div>
  );
}
