"use server";
import { stripe } from "@/lib/stripe";

// Cette fonction est une fonction côté serveur car stripe ne peut pas être utilisé côté client
// On accède à des variables d'environnement sensibles donc à faire côté serveur (d'où le "use server")
export const createCoupon = async () => {
  {
    // Create unique coupon for the user
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
    // const coupon = { id: null };
    const coupon = await stripe.coupons.create({
      duration: "once",
      percent_off: 50,
      redeem_by: Math.floor(oneWeekFromNow.getTime() / 1000),
    });

    return coupon;
  }
};
