import {
  index,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

/** Portal-owned shipment notes (survives restart when DATABASE_URL is set). */
export const shipmentNotes = pgTable(
  "shipment_notes",
  {
    id: text("id").primaryKey(),
    shipmentId: text("shipment_id").notNull(),
    author: text("author").notNull(),
    body: text("body").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("shipment_notes_shipment_id_idx").on(t.shipmentId)],
);

/** Outbound TranZfort listings — JSON payload matches NetworkListing. */
export const networkListings = pgTable(
  "network_listings",
  {
    id: text("id").primaryKey(),
    shipmentId: text("shipment_id").notNull(),
    state: text("state").notNull(),
    payload: jsonb("payload").notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    uniqueIndex("network_listings_shipment_id_uidx").on(t.shipmentId),
    index("network_listings_state_idx").on(t.state),
  ],
);

/** Offers against outbound listings — JSON payload matches NetworkOffer. */
export const networkOffers = pgTable(
  "network_offers",
  {
    id: text("id").primaryKey(),
    listingId: text("listing_id").notNull(),
    shipmentId: text("shipment_id").notNull(),
    status: text("status").notNull(),
    payload: jsonb("payload").notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("network_offers_listing_id_idx").on(t.listingId),
    index("network_offers_shipment_id_idx").on(t.shipmentId),
  ],
);

/**
 * Generic portal entity bag (ADR-007 Phase C).
 * One row per domain entity; payload is the domain JSON record.
 */
export const appDocuments = pgTable(
  "app_documents",
  {
    collection: text("collection").notNull(),
    id: text("id").notNull(),
    payload: jsonb("payload").notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    primaryKey({ columns: [t.collection, t.id] }),
    index("app_documents_collection_idx").on(t.collection),
  ],
);

/** Shipment document metadata (+ optional MinIO object key). */
export const shipmentDocuments = pgTable(
  "shipment_documents",
  {
    id: text("id").primaryKey(),
    shipmentId: text("shipment_id").notNull(),
    type: text("type").notNull(),
    name: text("name").notNull(),
    storageKey: text("storage_key"),
    contentType: text("content_type"),
    sizeBytes: text("size_bytes"),
    uploadedAt: timestamp("uploaded_at", { withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
    payload: jsonb("payload"),
  },
  (t) => [index("shipment_documents_shipment_id_idx").on(t.shipmentId)],
);
