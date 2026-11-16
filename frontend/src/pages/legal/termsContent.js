import site from "@/config/site";

const email = { href: `mailto:${site.email}`, label: site.email };

export const terms = {
  effectiveDate: site.legalEffectiveDate,
  intro: `These Terms of Use apply to ${site.domain}, operated by ${site.legalName}, doing business as Instant Drive Autos. By using the website, you agree to these terms. You must be at least 18 to submit a vehicle inquiry.`,
  sections: [
    {
      id: "our-role",
      title: "Our role",
      body: [
        "Instant Drive Autos helps customers find vehicles and connects them with participating dealerships. We may receive compensation from a dealership for our services. The selling or leasing dealership is identified in the applicable transaction documents. The financing provider determines credit eligibility and financing terms.",
      ],
    },
    {
      id: "vehicle-information-and-estimates",
      title: "Vehicle information and estimates",
      body: [
        "Vehicle availability, mileage, condition, pricing, incentives, and estimated payments may change. Payment estimates depend on factors such as the vehicle price, down payment, credit approval, interest rate, loan or lease term, taxes, and applicable fees. Confirm the vehicle details, total price, and payment terms with the dealership before signing. Any trade-in estimate is subject to review of the vehicle, its condition, and any outstanding loan.",
      ],
    },
    {
      id: "inquiries-and-agreements",
      title: "Inquiries and agreements",
      body: [
        "Submitting a vehicle request asks us to contact you about your inquiry. A request does not reserve a vehicle, charge a deposit, or guarantee an offer, financing, or a particular payment. Any purchase, lease, financing, or trade-in transaction is subject to the applicable signed agreements. Where applicable law requires a separate written brokerage agreement, that agreement governs our brokerage services for the transaction.",
      ],
    },
    {
      id: "using-the-website",
      title: "Using the website",
      body: [
        "Please provide accurate information and submit only information or photos you have permission to share. You authorize us to use and share submitted trade-in photos as needed to evaluate your trade-in and respond to your request. You may not impersonate another person, interfere with the website, or attempt to access another person’s information.",
      ],
    },
    {
      id: "website-content-and-third-party-services",
      title: "Website content and third-party services",
      body: [
        "Instant Drive Autos and its licensors retain their rights in website content. You may use the website to search for vehicles and request services. Reusing website content commercially requires the relevant rights holder’s permission unless applicable law allows it. Third-party websites and services, including credit application providers, have their own terms and privacy notices.",
      ],
    },
    {
      id: "privacy-and-updates",
      title: "Privacy and updates",
      body: [
        {
          p: [
            "See our ",
            { to: "/privacy-policy", label: "Privacy Policy" },
            " for details on how we handle information. We may update these terms by posting a revised version and updating the effective date. These terms preserve any consumer rights and remedies you have under applicable law.",
          ],
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      body: [
        { p: ["For questions about these terms or a vehicle inquiry, email ", email, ` or write to ${site.mailingAddress}.`] },
      ],
    },
  ],
};
