import { vehicleMakes, vehicleYears } from "@/config/formOptions";
import { MoneyInput, NumberInput, Select, Text, YesNo } from "@/pages/process/quote/controls";
import { PhotoUpload } from "@/pages/process/quote/PhotoUpload";

const VIN_HINT = "17 characters, found on the driver-side dashboard or door jamb. Skip it if you don't have it handy.";

// Rendered only when "Are you trading in?" is Yes.
export const TradeInFields = ({ photos, setPhotos, ...props }) => {
  const { values, errors, setField } = props;
  return (
    <div data-testid="trade-in-fields" className="space-y-6 border-l-4 border-primary bg-background/60 p-5 sm:p-6">
      <h4 className="text-xl">Tell us about your trade-in</h4>
      <div className="grid gap-6 sm:grid-cols-3">
        <Select id="tradeInYear" label="Year" options={vehicleYears} {...props} />
        <Select id="tradeInMake" label="Make" options={vehicleMakes} {...props} />
        <NumberInput id="tradeInMileage" label="Mileage" placeholder="64,000" {...props} />
      </div>
      <Text
        id="tradeInVin"
        label="VIN"
        optional
        hint={VIN_HINT}
        autoCapitalize="characters"
        autoComplete="off"
        spellCheck={false}
        maxLength={17}
        {...props}
        setField={(k, v) => setField(k, v.toUpperCase())}
      />
      <YesNo id="tradeInHasLoan" label="Is there an outstanding loan?" value={values.tradeInHasLoan} onChange={(v) => setField("tradeInHasLoan", v)} error={errors.tradeInHasLoan} />
      {values.tradeInHasLoan === "yes" && <MoneyInput id="tradeInAmountOwed" label="Amount owed" {...props} />}
      <PhotoUpload photos={photos} setPhotos={setPhotos} />
    </div>
  );
};
