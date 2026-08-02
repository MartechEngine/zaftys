CREATE TABLE "tsm_shipments" (
	"id" text PRIMARY KEY NOT NULL,
	"org_id" text NOT NULL,
	"public_id" text NOT NULL,
	"status" text NOT NULL,
	"payload" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tsm_drivers" (
	"id" text PRIMARY KEY NOT NULL,
	"org_id" text NOT NULL,
	"payload" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tsm_vehicles" (
	"id" text PRIMARY KEY NOT NULL,
	"org_id" text NOT NULL,
	"payload" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tsm_positions" (
	"id" text PRIMARY KEY NOT NULL,
	"org_id" text NOT NULL,
	"order_id" text,
	"vehicle_id" text,
	"driver_id" text,
	"latitude" double precision,
	"longitude" double precision,
	"recorded_at" timestamp with time zone,
	"payload" jsonb,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "tsm_shipments_org_id_idx" ON "tsm_shipments" USING btree ("org_id");--> statement-breakpoint
CREATE INDEX "tsm_shipments_org_status_idx" ON "tsm_shipments" USING btree ("org_id","status");--> statement-breakpoint
CREATE INDEX "tsm_drivers_org_id_idx" ON "tsm_drivers" USING btree ("org_id");--> statement-breakpoint
CREATE INDEX "tsm_vehicles_org_id_idx" ON "tsm_vehicles" USING btree ("org_id");--> statement-breakpoint
CREATE INDEX "tsm_positions_org_id_idx" ON "tsm_positions" USING btree ("org_id");--> statement-breakpoint
CREATE INDEX "tsm_positions_order_id_idx" ON "tsm_positions" USING btree ("order_id");
