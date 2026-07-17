CREATE TABLE "app_documents" (
	"collection" text NOT NULL,
	"id" text NOT NULL,
	"payload" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "app_documents_collection_id_pk" PRIMARY KEY("collection","id")
);
--> statement-breakpoint
CREATE TABLE "shipment_documents" (
	"id" text PRIMARY KEY NOT NULL,
	"shipment_id" text NOT NULL,
	"type" text NOT NULL,
	"name" text NOT NULL,
	"storage_key" text,
	"content_type" text,
	"size_bytes" text,
	"uploaded_at" timestamp with time zone DEFAULT now() NOT NULL,
	"payload" jsonb
);
--> statement-breakpoint
CREATE INDEX "app_documents_collection_idx" ON "app_documents" USING btree ("collection");--> statement-breakpoint
CREATE INDEX "shipment_documents_shipment_id_idx" ON "shipment_documents" USING btree ("shipment_id");