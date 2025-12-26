import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useTrackingLogger from "../../../hooks/useTrackingLogger";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { logTracking } = useTrackingLogger();

  // console.log(parcelId);

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending || !user) {
    return <span className="loading loading-spinner text-primary"></span>;
  }

  console.log(parcelInfo);

  const amount = parcelInfo.cost;
  const amountInCents = amount * 100;
  console.log(amountInCents);

  // submit button handle

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return <span className="loading loading-spinner text-primary"></span>;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return <span className="loading loading-spinner text-primary"></span>;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      //   console.log("[error]", error);
      setError(error.message);
    } else {
      setError("");
      console.log("[PaymentMethod]", paymentMethod);
    }

    // create payment intent
    const res = await axiosSecure.post("/create-payment-intent", {
      amountInCents,
      parcelId,
    });

    console.log("response of payment : ", res);

    const clientSecret = res.data.clientSecret;

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.displayName,
          email: user.email,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
    } else {
      setError("");
      if (payload.paymentIntent.status === "succeeded") {
        console.log("Payment Succeded!");
        console.log(payload);

        const transactionId = payload.paymentIntent.id;

        const paymentData = {
          parcelId,
          email: user.email,
          amount,
          transactionId: transactionId,
          paymentMethod: payload.paymentIntent.payment_method_types,
        };

        const paymentRes = await axiosSecure.post("/payments", paymentData);

        if (paymentRes.data.insertedId) {
          console.log("payment successful");

          await Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            html: `<strong>Transaction ID : </strong> <code> ${transactionId} </code> `,
            confirmButtonText: "Go to My Parcels",
          });

          await logTracking({
            tracking_id: parcelInfo.tracking_id,
            status: "payment_done",
            details: `paid by ${user.displayName}`,
            updated_by: user.email,
          });

          // REDIRECT TO MY PARCELS

          navigate("/dashboard/myParcels");
        }
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      >
        <CardElement className="p-2 border rounded"></CardElement>
        <button
          className="btn btn-primary text-black w-full"
          type="submit"
          disabled={!stripe}
        >
          Pay ৳{amount}
        </button>
        {error && <p className="text text-red-500 font-bold"> {error} </p>}
      </form>
    </div>
  );
};

export default PaymentForm;
