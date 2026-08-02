import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { HonestyNotice } from "@/components/app/honesty-notice";
import { MarketplaceChatDesk } from "@/components/app/marketplace-chat-desk";
import { NETWORK_NAV } from "@/lib/module-nav";
import { getBridgeMode, isBridgeLiveConfigured } from "@/lib/tsm/bridge-rpc";

export default function NetworkChatPage() {
  const mode = getBridgeMode();
  const live = mode === "live" && isBridgeLiveConfigured();

  return (
    <>
      <PageHeader
        title="Chat"
        description="Conversation inbox for the linked supplier — reply in TranZfort"
        eyebrow="Marketplace"
      />
      <ModuleSubNav links={NETWORK_NAV} />

      {live ? (
        <HonestyNotice title="Read-only chat inbox">
          Threads match TranZfort for this company supplier. Sending replies, attachments, and
          unread sync stay in the TranZfort app — TSM does not clone the full chat client.
        </HonestyNotice>
      ) : (
        <HonestyNotice title="Mock chat inbox">
          Sample threads only. Set bridge to <code className="text-xs">live</code> to list real
          conversations.
        </HonestyNotice>
      )}

      <div className="mt-4">
        <MarketplaceChatDesk />
      </div>
    </>
  );
}
