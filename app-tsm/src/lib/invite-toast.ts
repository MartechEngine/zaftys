import { toast } from "sonner";

/** Success toast that surfaces a copyable `/invite/[token]` link when present. */
export function toastInviteLink(title: string, invitePath?: string) {
  if (!invitePath) {
    toast.success(title);
    return;
  }

  const absolute =
    typeof window !== "undefined" ? `${window.location.origin}${invitePath}` : invitePath;

  toast.success(title, {
    description: invitePath,
    duration: 12_000,
    action: {
      label: "Copy link",
      onClick: () => {
        void navigator.clipboard.writeText(absolute).then(
          () => toast.message("Invite link copied"),
          () => toast.error("Could not copy link"),
        );
      },
    },
  });
}
