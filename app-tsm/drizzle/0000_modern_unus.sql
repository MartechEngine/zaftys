CREATE TABLE "network_listings" (
	"id" text PRIMARY KEY NOT NULL,
	"shipment_id" text NOT NULL,
	"state" text NOT NULL,
	"payload" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "network_offers" (
	"id" text PRIMARY KEY NOT NULL,
	"listing_id" text NOT NULL,
	"shipment_id" text NOT NULL,
	"status" text NOT NULL,
	"payload" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shipment_notes" (
	"id" text PRIMARY KEY NOT NULL,
	"shipment_id" text NOT NULL,
	"author" text NOT NULL,
	"body" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "network_listings_shipment_id_uidx" ON "network_listings" USING btree ("shipment_id");--> statement-breakpoint
CREATE INDEX "network_listings_state_idx" ON "network_listings" USING btree ("state");--> statement-breakpoint
CREATE INDEX "network_offers_listing_id_idx" ON "network_offers" USING btree ("listing_id");--> statement-breakpoint
CREATE INDEX "network_offers_shipment_id_idx" ON "network_offers" USING btree ("shipment_id");--> statement-breakpoint
CREATE INDEX "shipment_notes_shipment_id_idx" ON "shipment_notes" USING btree ("shipment_id");