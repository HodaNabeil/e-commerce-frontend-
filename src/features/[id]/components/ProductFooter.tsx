import Link from "next/link";

export default function ProductFooter() {
  return (
    <footer className="text-xs text-gray-500 leading-relaxed my-2">
      By clicking <strong>Pay Now</strong>, you agree to our{" "}
      <Link href="#" className="underline hover:text-gray-700">
        Terms & Conditions
      </Link>{" "}
      and{" "}
      <Link href="/privacy" className="underline hover:text-gray-700">
        Privacy Policy
      </Link>
      . You authorize us to charge your selected payment method for the total
      amount shown. All sales are subject to our{" "}
      <Link href="#" className="underline hover:text-gray-700">
        Return and Refund Policies
      </Link>
      .
    </footer>
  );
}
