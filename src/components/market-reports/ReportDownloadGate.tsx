import { useEffect, useId, useState, type FormEvent, type ReactNode } from "react";
import { Download, Loader2, Lock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  gatedReportPdfUrl,
  hasReportAccess,
  submitReportLead,
} from "@/lib/report-access";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type ReportDownloadGateProps = {
  reportSlug: string;
  reportTitle: string;
  /** Called after unlock when the user intended to read online. */
  onUnlockedRead?: () => void;
  /** Called after unlock when the user intended to download. */
  onUnlockedDownload?: (pdfUrl: string) => void;
  children: (helpers: {
    requestDownload: () => void;
    requestRead: () => void;
    unlocked: boolean;
  }) => ReactNode;
};

type Intent = "download" | "read" | null;

export function ReportDownloadGate({
  reportSlug,
  reportTitle,
  onUnlockedRead,
  onUnlockedDownload,
  children,
  autoOpen = false,
}: ReportDownloadGateProps & { autoOpen?: boolean }) {
  const { toast } = useToast();
  const titleId = useId();
  const [unlocked, setUnlocked] = useState(false);
  const [open, setOpen] = useState(false);
  const [intent, setIntent] = useState<Intent>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    jobTitle: "",
    email: "",
    website: "",
  });

  useEffect(() => {
    const ok = hasReportAccess();
    setUnlocked(ok);
    if (!ok && autoOpen) {
      setIntent("read");
      setOpen(true);
    }
  }, [autoOpen]);

  const finishIntent = (token?: string) => {
    const downloadUrl = gatedReportPdfUrl(reportSlug, { download: true, token });
    const readUrl = gatedReportPdfUrl(reportSlug, { token });
    setUnlocked(true);
    setOpen(false);

    if (intent === "download" && downloadUrl) {
      trackEvent("report_download", { page: reportSlug });
      if (onUnlockedDownload) {
        onUnlockedDownload(downloadUrl);
      } else {
        window.location.assign(downloadUrl);
      }
      return;
    }
    if (intent === "read") {
      if (onUnlockedRead) {
        onUnlockedRead();
      } else if (readUrl) {
        window.open(readUrl, "_blank", "noopener,noreferrer");
      }
    }
  };

  const requestDownload = () => {
    if (hasReportAccess()) {
      setIntent("download");
      finishIntent();
      return;
    }
    setIntent("download");
    setOpen(true);
  };

  const requestRead = () => {
    if (hasReportAccess()) {
      setIntent("read");
      finishIntent();
      return;
    }
    setIntent("read");
    setOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await submitReportLead({
        name: form.name,
        jobTitle: form.jobTitle,
        email: form.email,
        reportSlug,
        website: form.website,
      });
      if (!result.success || !result.accessToken) {
        throw new Error(result.error || "Could not unlock the report.");
      }
      toast({
        title: "Report unlocked",
        description: "Thanks. You can download or read ZAFTYS market reports on this device.",
      });
      finishIntent(result.accessToken);
      setForm({ name: "", jobTitle: "", email: "", website: "" });
    } catch (err) {
      toast({
        title: "Could not unlock",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {children({ requestDownload, requestRead, unlocked })}

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-navy/55 p-4 sm:items-center"
          role="presentation"
          onClick={() => !isSubmitting && setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={cn(
              "relative w-full max-w-md border border-border bg-white p-6 shadow-2xl",
              "max-h-[90vh] overflow-y-auto",
            )}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-navy"
              aria-label="Close"
              disabled={isSubmitting}
              onClick={() => setOpen(false)}
            >
              <X size={18} />
            </button>

            <div className="mb-5 flex items-start gap-3 pr-6">
              <span className="mt-0.5 rounded-md bg-navy/5 p-2 text-navy">
                <Lock size={18} />
              </span>
              <div>
                <h2 id={titleId} className="font-heading text-xl font-bold text-navy">
                  Unlock the full PDF
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Enter your work details to download or read <span className="font-medium text-navy">{reportTitle}</span>.
                  We will also add you to ZAFTYS research updates. Company email required.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
                value={form.website}
                onChange={(e) => setForm((prev) => ({ ...prev, website: e.target.value }))}
              />

              <div className="space-y-2">
                <Label htmlFor="report-lead-name">Full name</Label>
                <Input
                  id="report-lead-name"
                  required
                  maxLength={120}
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="report-lead-job">Job title</Label>
                <Input
                  id="report-lead-job"
                  required
                  maxLength={120}
                  autoComplete="organization-title"
                  placeholder="e.g. Head of Logistics"
                  value={form.jobTitle}
                  onChange={(e) => setForm((prev) => ({ ...prev, jobTitle: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="report-lead-email">Company email</Label>
                <Input
                  id="report-lead-email"
                  type="email"
                  required
                  maxLength={255}
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                />
                <p className="text-xs text-muted-foreground">Personal inboxes (Gmail, Yahoo, etc.) are not accepted.</p>
              </div>

              <Button type="submit" variant="accent" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={16} /> Unlocking…
                  </>
                ) : (
                  <>
                    <Download className="mr-2" size={16} />
                    {intent === "read" ? "Unlock and read" : "Unlock and download"}
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
