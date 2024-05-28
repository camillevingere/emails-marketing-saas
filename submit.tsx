"use client";
import { EventName, identify, track } from "@/lib/brevo/utils";
import { useMutation } from "@tanstack/react-query";
import type { EmailActionSchemaType } from "./email.schema";
import { createCoupon } from "./trackAction";

// Cette fonction submit est à utiliser dans un composant côté client (d'où le "use client")
const submit = useMutation({
    mutationFn: async ({ email, firstName }: EmailActionSchemaType) => {
      // Identify brevo user
      identify(email, { email: email });
      const coupon = await createCoupon();
      // Send signal to Brevo to send the marketing emails
      track(
        EventName.FORMATION_WORDPRESS_GRATUITE_V3,
        { email: email, PRENOM: firstName },
        {
          id: coupon.id,
          data: {
            urlWithCoupon: `https://codympia.com/formations/freelance-wordpress?couponId=${coupon.id}`,
          },
        },
      );
    },
  });