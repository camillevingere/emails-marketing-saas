"use client";
import Script from "next/script";
import { useState } from "react";

// À intégrer dans la section <head> de ton layout ou de ton app
export default function BrevoScript() {
  const [sendinblueLoaded, setSendinblueLoaded] = useState(false);

  return (
    <Script
      id="script-sendinblue"
      strategy="afterInteractive"
      onReady={() => {
        // using onReady because onLoad doesn't fire for inline scripts
        setSendinblueLoaded(true);
      }}
      dangerouslySetInnerHTML={{
        /* the code below is provided by Sendinblue */
        __html: `
        (function() {
          window.sib = {
              equeue: [],
              client_key: "TON_BREVO_CLIENT_KEY"
          };
          /* OPTIONAL: email for identify request*/
          window.sendinblue = {};
          for (var j = ['track', 'identify', 'trackLink', 'page'], i = 0; i < j.length; i++) {
          (function(k) {
              window.sendinblue[k] = function() {
                  var arg = Array.prototype.slice.call(arguments);
                  (window.sib[k] || function() {
                          var t = {};
                          t[k] = arg;
                          window.sib.equeue.push(t);
                      })(arg[0], arg[1], arg[2], arg[3]);
                  };
              })(j[i]);
          }
          var n = document.createElement("script"),
              i = document.getElementsByTagName("script")[0];
          n.type = "text/javascript", n.id = "sendinblue-js", n.async = !0, n.src = "https://sibautomation.com/sa.js?key=" + window.sib.client_key, i.parentNode.insertBefore(n, i), window.sendinblue.page();
        })();
        `,
      }}
    />
  );
}
