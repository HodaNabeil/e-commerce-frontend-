import Image from "next/image";

export default function PaymentBadges() {
  return (
    <div className="flex items-center gap-2 mt-4">
      <Image
        src="/klarna.png"
        alt="klarna"
        width={50}
        height={25}
        className="rounded-md"
      />
      <Image
        src="/cards.png"
        alt="cards"
        width={50}
        height={25}
        className="rounded-md"
      />
      <Image
        src="/stripe.png"
        alt="stripe"
        width={50}
        height={25}
        className="rounded-md"
      />
    </div>
  );
}
