import SEO from "../components/seo/SEO.jsx";

// ---- Change these values after confirming with the client ----
const SHIPPING_DAYS = "2 to 3 business days within Tamil Nadu and 3 to 7 business days for other parts of India";
const RETURN_DAYS = "three working days";
const BUSINESS = {
  name: "Brenn Global",
  email: "support@brennglobal.in",
  phone: "+91 84899 99988",
  location: "Udumalaipettai, Tamil Nadu, India",
};
const UPDATED = "October 2026";
// ---------------------------------------------------------------

const contactLine = `You can reach us at ${BUSINESS.email} or ${BUSINESS.phone}.`;

const POLICIES = {
  terms: {
    title: "Terms and Conditions",
    path: "/terms-and-conditions",
    sections: [
      {
        heading: "About these terms",
        body: [
          `This website is operated by ${BUSINESS.name}, ${BUSINESS.location}. By using this website or placing an order, you agree to these terms.`,
        ],
      },
      {
        heading: "Products and prices",
        body: [
          "All prices are listed in Indian Rupees (INR). We try to keep product details and prices accurate, but we may correct errors and update prices at any time. If we cancel an order because of a pricing or stock error, you will receive a full refund.",
        ],
      },
      {
        heading: "Orders and payment",
        body: [
          "An order is confirmed only after payment is successful. Payments are processed securely by Razorpay. We do not see or store your card, UPI or bank details.",
        ],
      },
      {
        heading: "Shipping, returns and refunds",
        body: [
          "Please read our Shipping Policy and Refund and Cancellation Policy, which form part of these terms.",
        ],
      },
      {
        heading: "Use of this website",
        body: [
          "You agree not to misuse this website, attempt to disrupt it, or use it for any unlawful purpose. All content, logos and images on this website belong to " +
            BUSINESS.name +
            " and may not be copied without permission.",
        ],
      },
      {
        heading: "Limitation of liability",
        body: [
          "To the extent permitted by law, we are not liable for indirect or incidental losses arising from the use of this website or our products. Our total liability for any order is limited to the amount you paid for it.",
        ],
      },
      {
        heading: "Governing law",
        body: ["These terms are governed by the laws of India."],
      },
      {
        heading: "Contact",
        body: [contactLine],
      },
    ],
  },

  privacy: {
    title: "Privacy Policy",
    path: "/privacy-policy",
    sections: [
      {
        heading: "What we collect",
        body: [
          "When you place an order or contact us, we collect your name, mobile number, email address and delivery address. We also receive your payment status and payment ID from Razorpay.",
        ],
      },
      {
        heading: "How we use it",
        body: [
          "We use your details only to process and deliver your order, send order updates, respond to your enquiries and meet legal requirements.",
        ],
      },
      {
        heading: "Payments",
        body: [
          "Payments are handled by Razorpay. Your card, UPI and bank details are entered on Razorpay's secure payment window and are never stored on our website or servers.",
        ],
      },
      {
        heading: "Sharing your information",
        body: [
          "We do not sell your personal information. We share it only with service providers needed to run the store, such as our payment provider, our hosting and database providers, and delivery partners, or when the law requires it.",
        ],
      },
      {
        heading: "Cookies and storage",
        body: [
          "This website stores your shopping cart in your browser so it is still there when you return. We may also use analytics tools to understand how the site is used.",
        ],
      },
      {
        heading: "Your choices",
        body: [
          "You can ask us to correct or delete your personal information at any time by contacting us. " + contactLine,
        ],
      },
    ],
  },

  refund: {
    title: "Refund and Cancellation Policy",
    path: "/refund-policy",
    sections: [
      {
        heading: "Cancellations",
        body: [
          "You can cancel an order before it is shipped by contacting us. " +
            contactLine +
            " Once an order has been shipped, it can no longer be cancelled.",
        ],
      },
      {
        heading: "Returns",
        body: [
                    `If you receive a damaged or wrong item, please report it within ${RETURN_DAYS} of purchase and contact us with your order reference. An unpacking video, recorded while opening the parcel, is mandatory for every claim. If the issue is confirmed, we will replace the item with a new one. We do not offer returns or refunds for any other reason.`,
        ],
      },
      {
        heading: "Refunds",
        body: [
                    "We do not offer refunds for returns. If we cancel your order (for example, because of a pricing or stock error) or a payment is taken but the order cannot be fulfilled, the full amount is refunded to your original payment method. This usually reaches your account within 5 to 7 business days, depending on your bank.",
        ],
      },
      {
        heading: "Items that are not returnable",
        body: [
                    "We do not accept returns or refunds for a change of mind, or for products that have been used or damaged after delivery. Claims reported after three working days, or without an unpacking video, cannot be accepted.",
        ],
      },
      {
        heading: "Contact",
        body: [contactLine],
      },
    ],
  },

  shipping: {
    title: "Shipping Policy",
    path: "/shipping-policy",
    sections: [
      {
        heading: "Where we ship",
        body: ["We currently deliver across India."],
      },
      {
        heading: "Processing and delivery time",
        body: [
          `Orders are processed after payment is confirmed. Delivery usually takes ${SHIPPING_DAYS} from the date of order. Delivery times may vary by location and during holidays or busy periods.`,
        ],
      },
      {
        heading: "Shipping charges",  
        body: ["Delivery charges, if any, depend on the delivery location and are confirmed before your order is shipped."],
      },
      {
        heading: "Tracking",
        body: [
          "Once your order is shipped, we will share tracking details by email or phone where available.",
        ],
      },
      {
        heading: "Delivery problems",
        body: [
          "If your order is delayed, damaged in transit, or you entered a wrong address, please contact us as soon as possible. " +
            contactLine,
        ],
      },
    ],
  },
};

const Policy = ({ type }) => {
  const policy = POLICIES[type];

  return (
    <div className="mx-auto max-w-3xl px-6 py-40 sm:px-10">
      <SEO
        title={`${policy.title} | ${BUSINESS.name}`}
        description={`${policy.title} for ${BUSINESS.name}`}
        path={policy.path}
      />

      <h1 className="text-4xl font-extrabold tracking-tight">{policy.title}</h1>
      <p className="mt-2 text-sm text-slate">Last updated: {UPDATED}</p>

      <div className="mt-10 space-y-8">
        {policy.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-bold">{section.heading}</h2>
            {section.body.map((text, i) => (
              <p key={i} className="mt-2 leading-relaxed text-ink/80">
                {text}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
};

export default Policy;