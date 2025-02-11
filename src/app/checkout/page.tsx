"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<
    "PIX" | "BOLETO" | "CREDIT_CARD"
  >("PIX");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real application, you would send this data to your backend
      // and process the payment there.
      const paymentData = {
        method: paymentMethod,
        ...(paymentMethod === "CREDIT_CARD" && { cardDetails }),
      };
      console.log("Payment data:", paymentData);

      // Simulating a payment process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Payment Successful",
        description: "Your order has been placed successfully.",
      });

      // Redirect to a confirmation page
      router.push("/order-confirmation");
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description:
          "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <RadioGroup
          value={paymentMethod}
          onValueChange={(value) =>
            setPaymentMethod(value as typeof paymentMethod)
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="PIX" id="pix" />
            <Label htmlFor="pix">PIX</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="BOLETO" id="boleto" />
            <Label htmlFor="boleto">Boleto</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="CREDIT_CARD" id="credit-card" />
            <Label htmlFor="credit-card">Credit Card</Label>
          </div>
        </RadioGroup>

        {paymentMethod === "CREDIT_CARD" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="card-number">Card Number</Label>
              <Input
                id="card-number"
                value={cardDetails.number}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, number: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="card-name">Name on Card</Label>
              <Input
                id="card-name"
                value={cardDetails.name}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, name: e.target.value })
                }
                required
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label htmlFor="card-expiry">Expiry Date</Label>
                <Input
                  id="card-expiry"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="card-cvc">CVC</Label>
                <Input
                  id="card-cvc"
                  value={cardDetails.cvc}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvc: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </div>
        )}

        <Button type="submit" className="w-full">
          Pay Now
        </Button>
      </form>
    </div>
  );
}
