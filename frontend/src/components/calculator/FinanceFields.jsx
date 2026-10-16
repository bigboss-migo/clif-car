import { calculatorDefaults, creditTiers, stateNames } from "@/config/finance";
import { NumberField, SelectField } from "@/components/calculator/fields";

const stateOptions = stateNames.map((s) => ({ value: s, label: s }));
const tierOptions = creditTiers.map((t) => ({ value: t.id, label: `${t.label} (${t.range})` }));
const termOptions = calculatorDefaults.finance.termOptions.map((t) => ({ value: String(t), label: `${t} months` }));

export const FinanceFields = ({ values, set }) => (
  <div className="grid gap-5 sm:grid-cols-2" data-testid="finance-fields">
    <NumberField id="price" label="Vehicle price" value={values.price} onChange={set("price")} step={500} />
    <NumberField id="cashDown" label="Cash down" value={values.cashDown} onChange={set("cashDown")} />
    <NumberField id="tradeIn" label="Trade-in value" value={values.tradeIn} onChange={set("tradeIn")} />
    <NumberField id="incentives" label="Rebates / incentives" value={values.incentives} onChange={set("incentives")} />
    <SelectField id="state" label="Registration state" value={values.state} onChange={set("state")} options={stateOptions} />
    <SelectField id="creditTier" label="Credit profile" value={values.creditTier} onChange={set("creditTier")} options={tierOptions} />
    <SelectField id="term" label="Term" value={values.term} onChange={set("term")} options={termOptions} />
  </div>
);
