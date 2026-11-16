import site from "@/config/site";

const email = { href: `mailto:${site.email}`, label: site.email };

export const privacy = {
  effectiveDate: site.legalEffectiveDate,
  intro: `This Privacy Policy describes how ${site.legalName}, doing business as Instant Drive Autos, handles information when you visit ${site.domain}, contact us, or use our vehicle inquiry services.`,
  sections: [
    {
      id: "information-we-collect",
      title: "Information we collect",
      body: [
        {
          list: [
            {
              term: "Contact and inquiry information.",
              text: "When you contact us or submit a vehicle request, we collect the information you provide, such as your name, phone number, email address, ZIP code, vehicle preferences, and messages.",
            },
            {
              term: "Purchase and financing preferences.",
              text: "If you provide them, we collect your purchase or lease preference, estimated monthly income, and planned down payment to help respond to your request.",
            },
            {
              term: "Trade-in information.",
              text: "If you request a trade-in evaluation, we may collect details such as your vehicle’s year, make, mileage, VIN, outstanding loan balance, and photos you upload.",
            },
            {
              term: "Website information.",
              text: "When you visit, our website and hosting providers may receive information such as your IP address, browser type, and request logs. We do not store or sell any of this information, and it exists to enhance your user experience.",
            },
          ],
        },
      ],
    },
    {
      id: "how-we-use-information",
      title: "How we use information",
      body: [
        "We use information to respond to inquiries, find vehicles that match your preferences, coordinate dealership introductions and test drives, help with trade-in inquiries, and connect you with purchase, lease, or financing options you request. We also use information to operate and secure the website, maintain business records, and meet legal obligations.",
        "We may contact you by phone, text, or email about your request using the contact information you provide.",
      ],
    },
    {
      id: "when-we-share-information",
      title: "When we share information",
      body: [
        {
          list: [
            {
              term: "Dealerships and financing partners.",
              text: "To respond to your request, we may share relevant contact, vehicle, trade-in, and financing preference information with the dealership or financing partner involved. Those businesses handle the information they receive under their own privacy notices and applicable law.",
            },
            {
              term: "Service providers.",
              text: "Companies that provide hosting, form processing, communications, or other services may handle information to support our operations.",
            },
            {
              term: "Legal and security purposes.",
              text: "We may disclose information as required by law or as permitted to protect rights, investigate fraud, or address security issues.",
            },
          ],
        },
      ],
    },
    {
      id: "third-party-credit-applications",
      title: "Third-party credit applications",
      body: [
        "If you follow a link to a separate credit application or prequalification service, review that provider’s privacy notice and credit authorization before submitting information. The provider’s disclosures explain who receives your application and whether a credit inquiry may occur. Please keep Social Security numbers and bank account details out of our general inquiry forms, emails, texts, and trade-in photos.",
      ],
    },
    {
      id: "retention-and-your-choices",
      title: "Retention and your choices",
      body: [
        "We keep information as needed to handle your request, maintain business records, resolve disputes, and meet legal obligations. You can contact us to ask about your information or request access, correction, or deletion. We may need to verify your identity and may retain information when permitted or required by law. If you receive promotional emails from us, use the unsubscribe link or contact us to ask to stop receiving them.",
      ],
    },
    {
      id: "updates-and-contact",
      title: "Updates and contact",
      body: [
        "We will post changes to this policy here and update the effective date.",
        { p: ["For privacy questions or requests, email ", email, ` or write to ${site.mailingAddress}.`] },
      ],
    },
  ],
};
