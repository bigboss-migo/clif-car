import { calculatorDefaults, creditTiers, leaseTaxMethodLabels, stateNames } from "@/config/finance";
import { NumberField, SelectField } from "@/components/calculator/fields";
import { MoneyFactorField } from "@/components/calculator/MoneyFactorField";
import { ResidualSlider } from "@/components/calculator/ResidualSlider";

const { lease } = calculatorDefaults;
const stateOptions = stateNames.map((s) => ({ value: s, label: s }));
const tierOptions = creditTiers.map((t) => ({ value: t.id, label: `${t.label} (${t.range})` }));
const termOptions = lease.termOptions.map((t) => ({ value: String(t), label: `${t} months` }));
const mileOptions = lease.mileageOptions.map((m) => ({ value: String(m), label: `${m.toLocaleString("en-US")} mi/yr` }));

export const LeaseFields = ({ values, set, result, onMfEdit, onMfAuto }) => (
  <div className="space-y-6" data-testid="lease-fields">
    <div className="grid gap-5 sm:grid-cols-2">
      <NumberField id="msrp" label="MSRP (sticker)" value={values.msrp} onChange={set("msrp")} step={500} />
      <NumberField id="leasePrice" label="Selling price" value={values.leasePrice} onChange={set("leasePrice")} step={500} />
      <NumberField id="leaseCashDown" label="Cash down / cap reduction" value={values.leaseCashDown} onChange={set("leaseCashDown")} />
      <NumberField id="tradeIn" label="Trade-in value" value={values.tradeIn} onChange={set("tradeIn")} />
      <NumberField id="incentives" label="Rebates / incentives" value={values.incentives} onChange={set("incentives")} />
      <SelectField id="state" label="Registration state" value={values.state} onChange={set("state")} options={stateOptions} />
      <SelectField id="creditTier" label="Credit profile" value={values.creditTier} onChange={set("creditTier")} options={tierOptions} />
      <SelectField id="leaseTerm" label="Lease term" value={values.leaseTerm} onChange={set("leaseTerm")} options={termOptions} />
      <SelectField id="annualMiles" label="Miles per year" value={values.annualMiles} onChange={set("annualMiles")} options={mileOptions} />
      <NumberField id="acquisitionFee" label="Acquisition fee" value={values.acquisitionFee} onChange={set("acquisitionFee")} step={50} />
      <MoneyFactorField
        tierMf={result.tier.leaseMoneyFactor}
        effectiveMf={result.moneyFactor}
        custom={values.mfCustom}
        value={values.customMF}
        onEdit={onMfEdit}
        onAuto={onMfAuto}
        onChange={set("customMF")}
      />
    </div>
    <ResidualSlider value={values.residualSlider} onChange={set("residualSlider")} residualPct={result.residualPct} residual={result.residual} />
    <p data-testid="lease-tax-method" className="rounded-md border border-border bg-muted px-4 py-3 text-xs text-muted-foreground">
      <span className="font-bold uppercase tracking-[0.16em] text-foreground">Lease tax · {values.state}:</span>{" "}
      {leaseTaxMethodLabels[result.taxMethod]}
    </p>
  </div>
);
