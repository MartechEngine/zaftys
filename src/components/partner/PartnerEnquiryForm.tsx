import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";
import { indianMobileNational } from "@/lib/indian-mobile";
import {
  additionalVehicleOptions,
  capitalOptions,
  conditionOptions,
  fleetCountOptions,
  formCopy,
  vehicleOptions,
  type ExpandMode,
  type PartnerPath,
} from "@/lib/partner-page-copy";
import { useToast } from "@/hooks/use-toast";

type Errors = Record<string, string>;
type SubmissionStatus = { kind: "success" | "error"; message: string } | null;

const selectClass =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

type Props = {
  path: PartnerPath;
  onPathChange: (path: PartnerPath) => void;
};

export function PartnerEnquiryForm({ path, onPathChange }: Props) {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const started = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>(null);
  const [expandMode, setExpandMode] = useState<ExpandMode | "">("");
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [fleet, setFleet] = useState("");
  const [location, setLocation] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [freight, setFreight] = useState("");
  const [capital, setCapital] = useState("");
  const [truckCondition, setTruckCondition] = useState("");
  const [experience, setExperience] = useState("");
  const [additionalVehicles, setAdditionalVehicles] = useState("");
  const [financingNote, setFinancingNote] = useState("");
  const [website, setWebsite] = useState("");

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    trackEvent("form_partner_start", { placement: "partner-form", intent: path });
  };

  useEffect(() => {
    setErrors({});
    setSubmissionStatus(null);
    if (path !== "expand") setExpandMode("");
  }, [path]);

  const companyRequired = path === "fleet" || (path === "expand" && expandMode === "tranzfort");
  const showFleetFields = path === "fleet" || (path === "expand" && expandMode === "tranzfort");
  const showOwnershipFields = path === "first-truck" || (path === "expand" && expandMode === "ownership");

  const validate = (): Errors => {
    const next: Errors = {};
    if (!contact.trim()) next.contact = "Enter your name.";
    if (!indianMobileNational(phone)) next.phone = "Enter a 10-digit Indian mobile number.";
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Enter a valid email, or leave it blank.";
    }
    if (path === "expand" && !expandMode) next.expandMode = "Choose how you want to add trucks.";
    if (companyRequired && !company.trim()) next.company = "Enter your company or transporter name.";
    if (showFleetFields && !fleet) next.fleet = "Select how many trucks you run.";
    if (showFleetFields && !location.trim()) next.location = "Enter where you operate.";
    if (showOwnershipFields && path === "first-truck" && !capital) next.capital = "Select a capital band.";
    if (showOwnershipFields && path === "first-truck" && !truckCondition) {
      next.truckCondition = "Tell us if you are looking at a new or used truck.";
    }
    if (showOwnershipFields && !location.trim()) next.location = "Enter where you want to operate.";
    if (path === "expand" && expandMode === "ownership" && !fleet) next.fleet = "Select your current fleet size.";
    if (path === "expand" && expandMode && !additionalVehicles) {
      next.additionalVehicles = "Select how many vehicles you are considering.";
    }
    return next;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    const next = validate();
    setErrors(next);
    setSubmissionStatus(null);
    if (Object.keys(next).length > 0) {
      window.requestAnimationFrame(() => {
        const firstInvalid = formRef.current?.querySelector<HTMLElement>(
          'input[aria-invalid="true"], select[aria-invalid="true"], textarea[aria-invalid="true"]',
        );
        firstInvalid?.focus();
      });
      return;
    }

    const national = indianMobileNational(phone);
    if (!national) return;

    setIsSubmitting(true);
    const payload: Record<string, string> = {
      path,
      contact: contact.trim(),
      phone: national,
      website,
      email: email.trim(),
      location: location.trim(),
      vehicleType,
    };
    if (company.trim()) payload.company = company.trim();
    if (showFleetFields) {
      payload.fleet = fleet;
      if (freight.trim()) payload.freight = freight.trim();
    }
    if (path === "first-truck") {
      payload.capital = capital;
      payload.truckCondition = truckCondition;
      if (experience.trim()) payload.experience = experience.trim();
    }
    if (path === "expand" && expandMode) {
      payload.expandMode = expandMode;
      payload.fleet = fleet;
      payload.additionalVehicles = additionalVehicles;
      if (expandMode === "ownership") {
        if (capital) payload.capital = capital;
        if (financingNote.trim()) payload.financingNote = financingNote.trim();
      }
    }

    try {
      const response = await fetch("/api/partner.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const text = await response.text();
      let result: { success?: boolean; error?: string } = {};
      try {
        result = text ? (JSON.parse(text) as { success?: boolean; error?: string }) : {};
      } catch {
        throw new Error("Failed to submit application");
      }
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to submit application");
      }
      trackEvent("form_partner_success", { placement: "partner-form", intent: path });
      const successMessage =
        path === "first-truck" || (path === "expand" && expandMode === "ownership")
          ? formCopy.successOwnership
          : formCopy.successFleet;
      toast({
        title: "Enquiry received",
        description: successMessage,
      });
      setSubmissionStatus({ kind: "success", message: successMessage });
      setCompany("");
      setContact("");
      setPhone("");
      setEmail("");
      setFleet("");
      setLocation("");
      setVehicleType("");
      setFreight("");
      setCapital("");
      setTruckCondition("");
      setExperience("");
      setAdditionalVehicles("");
      setFinancingNote("");
      setWebsite("");
      setErrors({});
    } catch {
      trackEvent("form_partner_error", { placement: "partner-form", intent: path });
      setSubmissionStatus({ kind: "error", message: formCopy.error });
      toast({ title: "Error", description: formCopy.error, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      ref={formRef}
      className="space-y-6"
      onSubmit={handleSubmit}
      onFocusCapture={markStarted}
      noValidate
    >
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-navy">What best describes you?</legend>
        {(
          [
            ["fleet", "I already own a truck or fleet, and I want TranZfort / network loads."],
            ["first-truck", "I want to purchase my first truck and explore an operating partnership."],
            ["expand", "I want to add trucks."],
          ] as const
        ).map(([value, label]) => (
          <label key={value} className="flex items-start gap-3 text-sm text-foreground">
            <input
              type="radio"
              name="partner-path"
              className="mt-1"
              checked={path === value}
              onChange={() => {
                onPathChange(value);
              }}
            />
            <span>{label}</span>
          </label>
        ))}
      </fieldset>

      {path === "expand" ? (
        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-navy">How do you want to add trucks?</legend>
          {(
            [
              ["tranzfort", "Add them on TranZfort as network capacity."],
              ["ownership", "Discuss an operating partnership."],
            ] as const
          ).map(([value, label]) => (
            <label key={value} className="flex items-start gap-3 text-sm">
              <input
                type="radio"
                name="expand-mode"
                className="mt-1"
                checked={expandMode === value}
                aria-invalid={Boolean(errors.expandMode)}
                aria-describedby={errors.expandMode ? "expandMode-error" : undefined}
                onChange={() => {
                  setExpandMode(value);
                  setErrors({});
                }}
              />
              <span>{label}</span>
            </label>
          ))}
          {errors.expandMode ? (
            <p id="expandMode-error" className="text-sm text-destructive">
              {errors.expandMode}
            </p>
          ) : null}
        </fieldset>
      ) : null}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field id="contact" label="Your name" error={errors.contact} required>
          <Input
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            autoComplete="name"
            maxLength={120}
            aria-invalid={Boolean(errors.contact)}
            aria-describedby={errors.contact ? "contact-error" : undefined}
            required
          />
        </Field>
        <Field id="phone" label="Mobile number" error={errors.phone} required>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            placeholder="10-digit mobile"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            maxLength={20}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            required
          />
        </Field>
        <Field
          id="company"
          label="Company name"
          error={errors.company}
          required={companyRequired}
          hint={companyRequired ? undefined : "Optional"}
        >
          <Input
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            autoComplete="organization"
            maxLength={160}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "company-error" : undefined}
            required={companyRequired}
          />
        </Field>
        <Field id="email" label="Email" error={errors.email} hint="Optional">
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            maxLength={160}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </Field>
        <Field
          id="location"
          label="Operating location"
          error={errors.location}
          required={path !== "expand" || expandMode !== ""}
        >
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City or corridor"
            maxLength={120}
            aria-invalid={Boolean(errors.location)}
            aria-describedby={errors.location ? "location-error" : undefined}
            required={path !== "expand" || expandMode !== ""}
          />
        </Field>
        <Field id="vehicleType" label="Preferred vehicle type" hint="Optional">
          <select
            id="vehicleType"
            className={selectClass}
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          >
            <option value="">Select a type</option>
            {vehicleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {showFleetFields ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field id="fleet" label="Number of trucks" error={errors.fleet} required>
            <select
              id="fleet"
              className={selectClass}
              value={fleet}
              onChange={(e) => setFleet(e.target.value)}
              aria-invalid={Boolean(errors.fleet)}
              aria-describedby={errors.fleet ? "fleet-error" : undefined}
              required
            >
              <option value="">Select size</option>
              {fleetCountOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field id="freight" label="Primary freight or industry" hint="Optional">
            <Input id="freight" value={freight} onChange={(e) => setFreight(e.target.value)} maxLength={160} />
          </Field>
        </div>
      ) : null}

      {path === "first-truck" ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field id="capital" label="Available capital" error={errors.capital} required>
            <select
              id="capital"
              className={selectClass}
              value={capital}
              onChange={(e) => setCapital(e.target.value)}
              aria-invalid={Boolean(errors.capital)}
              aria-describedby={errors.capital ? "capital-error" : undefined}
              required
            >
              <option value="">Select a band</option>
              {capitalOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field id="truckCondition" label="New truck, used truck, or open to guidance" error={errors.truckCondition} required>
            <select
              id="truckCondition"
              className={selectClass}
              value={truckCondition}
              onChange={(e) => setTruckCondition(e.target.value)}
              aria-invalid={Boolean(errors.truckCondition)}
              aria-describedby={errors.truckCondition ? "truckCondition-error" : undefined}
              required
            >
              <option value="">Select one</option>
              {conditionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <div className="md:col-span-2">
            <Field id="experience" label="Trucking or business experience" hint="Optional">
              <Textarea
                id="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                maxLength={500}
                rows={3}
              />
            </Field>
          </div>
        </div>
      ) : null}

      {path === "expand" && expandMode === "ownership" ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field id="fleet" label="Current fleet size" error={errors.fleet} required>
            <select
              id="fleet"
              className={selectClass}
              value={fleet}
              onChange={(e) => setFleet(e.target.value)}
              aria-invalid={Boolean(errors.fleet)}
              aria-describedby={errors.fleet ? "fleet-error" : undefined}
              required
            >
              <option value="">Select size</option>
              {fleetCountOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field id="capital" label="Available capital" hint="Optional">
            <select id="capital" className={selectClass} value={capital} onChange={(e) => setCapital(e.target.value)}>
              <option value="">Select a band</option>
              {capitalOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <div className="md:col-span-2">
            <Field id="financingNote" label="Financing plans" hint="Optional">
              <Textarea
                id="financingNote"
                value={financingNote}
                onChange={(e) => setFinancingNote(e.target.value)}
                maxLength={300}
                rows={3}
              />
            </Field>
          </div>
        </div>
      ) : null}

      {path === "expand" && expandMode ? (
        <Field id="additionalVehicles" label="Additional vehicles being considered" error={errors.additionalVehicles} required>
          <select
            id="additionalVehicles"
            className={selectClass}
            value={additionalVehicles}
            onChange={(e) => setAdditionalVehicles(e.target.value)}
            aria-invalid={Boolean(errors.additionalVehicles)}
            aria-describedby={errors.additionalVehicles ? "additionalVehicles-error" : undefined}
            required
          >
            <option value="">Select a range</option>
            {additionalVehicleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      ) : null}

      {Object.keys(errors).length > 0 ? (
        <p role="alert" className="text-sm text-destructive">
          Check the fields marked above, then submit again.
        </p>
      ) : null}

      {submissionStatus ? (
        <div
          role={submissionStatus.kind === "error" ? "alert" : "status"}
          className={
            submissionStatus.kind === "error"
              ? "rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
              : "rounded-md border border-primary/20 bg-surface p-4 text-sm text-navy"
          }
        >
          {submissionStatus.message}
        </div>
      ) : null}

      <p className="text-sm text-muted-foreground">
        {formCopy.consent}{" "}
        <Link to="/privacy" className="underline hover:text-navy">
          Privacy policy
        </Link>
        .
      </p>

      <Button type="submit" size="lg" variant="accent" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            Processing... <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          </>
        ) : (
          "Submit partnership enquiry"
        )}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  required,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required ? <span className="text-destructive"> *</span> : null}
        {hint ? <span className="ml-2 font-normal text-muted-foreground">{hint}</span> : null}
      </Label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
