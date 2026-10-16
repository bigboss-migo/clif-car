// Editable option lists for the /contact lead form (Step 2).

const nextModelYear = new Date().getFullYear() + 1;
export const vehicleYears = Array.from({ length: nextModelYear - 2000 + 1 }, (_, i) => String(nextModelYear - i));

export const vehicleMakes = [
  "Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Bugatti", "Buick", "Cadillac", "Chevrolet",
  "Chrysler", "Dodge", "Ferrari", "Fiat", "Ford", "Genesis", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep",
  "Kia", "Koenigsegg", "Lamborghini", "Land Rover", "Lexus", "Lincoln", "Lotus", "Lucid", "Maserati", "Mazda",
  "McLaren", "Mercedes-Benz", "MINI", "Mitsubishi", "Nissan", "Pagani", "Polestar", "Porsche", "RAM", "Rivian",
  "Rolls-Royce", "Subaru", "Tesla", "Toyota", "Volkswagen", "Volvo", "Other",
];

export const OTHER_MODEL = "Other / Not listed";

export const vehicleColors = [
  "Black", "White", "Gray", "Silver", "Blue", "Red", "Green", "Brown / Beige", "Yellow / Gold", "Orange", "Other", "No preference",
];

export const acquisitionOptions = ["Finance", "Lease", "Pay cash", "Not sure yet"];

export const budgetOptions = [
  "Under $50k", "$50k–$75k", "$75k–$100k", "$100k–$150k", "$150k–$250k", "$250k–$400k", "$400k+",
];

// Upper bound (exclusive) per budget bracket, used to map a numeric ?budget= prefill to an option.
export const budgetBrackets = [50000, 75000, 100000, 150000, 250000, 400000, Infinity];

export const downPaymentOptions = ["Under $5k", "$5k–$10k", "$10k–$25k", "$25k–$50k", "$50k+", "Paying cash"];

export const creditRangeOptions = [
  "Excellent 780+", "Good 720–779", "Fair 660–719", "Building 600–659", "Rebuilding 580–599", "Below 580",
  "No credit / business income", "Not sure",
];

export const timelineOptions = ["As soon as possible", "Within 2 weeks", "Within 30 days", "1–3 months", "Just researching"];

export const tradeInOptions = ["No trade-in", "Yes, paid off", "Yes, I still owe on it"];

export const REFERRAL_OPTION = "Friend/Referral";
export const heardAboutOptions = ["Instagram", "TikTok", "YouTube", "Google search", REFERRAL_OPTION, "Other"];
