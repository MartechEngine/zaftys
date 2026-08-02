import type {
  MaterialSuggestion,
  VehicleCatalog,
} from "@/lib/tsm/catalog-types";

/**
 * Local stub catalog aligned to TranZfort prod post-load envelopes
 * (`post_selectable` + `is_post_envelope` rows from catalog v2 migrations).
 *
 * Label format matches TZ: `Open Truck • 10W • 12-19T`
 * Category codes match TZ: `open_truck`, `trailer`, `container`, …
 */
export function stubVehicleCatalog(): VehicleCatalog {
  return {
    source: "stub",
    fetchedAt: new Date().toISOString(),
    categories: [
      { code: "lcv", nameEn: "LCV", uiMode: "body_and_capacity" },
      { code: "open_truck", nameEn: "Open Truck", uiMode: "wheels_body_capacity" },
      { code: "trailer", nameEn: "Trailer", uiMode: "wheels_body_capacity" },
      { code: "container", nameEn: "Container", uiMode: "wheels_length_capacity" },
      { code: "bulker", nameEn: "Bulker", uiMode: "wheels_body_capacity" },
      { code: "tanker", nameEn: "Tanker", uiMode: "wheels_body_capacity" },
      { code: "tipper", nameEn: "Tipper", uiMode: "wheels_body_capacity" },
      { code: "reefer", nameEn: "Reefer", uiMode: "wheels_body_capacity" },
    ],
    bodyStyles: [
      { categoryCode: "lcv", code: "open", nameEn: "Open" },
      { categoryCode: "lcv", code: "closed", nameEn: "Closed" },
      { categoryCode: "open_truck", code: "full_body", nameEn: "Full Body" },
      { categoryCode: "open_truck", code: "high_side", nameEn: "High Side" },
      { categoryCode: "trailer", code: "high_side", nameEn: "High Side" },
      { categoryCode: "trailer", code: "flat_bed", nameEn: "Flat Bed" },
      { categoryCode: "container", code: "length_ft", nameEn: "Length (FT)" },
      { categoryCode: "bulker", code: "cement_bulker", nameEn: "Cement Bulker" },
      { categoryCode: "bulker", code: "lime_bulker", nameEn: "Lime Bulker" },
      { categoryCode: "bulker", code: "powder_bulker", nameEn: "Powder Bulker" },
      { categoryCode: "bulker", code: "fly_ash_bulker", nameEn: "Fly Ash Bulker" },
      { categoryCode: "tanker", code: "water_tanker", nameEn: "Water Tanker" },
      { categoryCode: "tanker", code: "chemical_tanker", nameEn: "Chemical Tanker" },
      { categoryCode: "tanker", code: "petroleum_tanker", nameEn: "Petroleum Tanker" },
      { categoryCode: "tanker", code: "edible_oil_tanker", nameEn: "Edible Oil Tanker" },
      { categoryCode: "tipper", code: "mining", nameEn: "Mining" },
      { categoryCode: "reefer", code: "reefer", nameEn: "Reefer" },
    ],
    configurations: [
      // LCV
      {
        code: "lcv_4w_open_0_5_1t",
        categoryCode: "lcv",
        bodyStyleCode: "open",
        labelEn: "LCV • 4W • Open • Ace 0.75-1T",
        wheelsW: 4,
        loadingTonMin: 0.75,
        loadingTonMax: 1,
        postSelectable: true,
        isPostEnvelope: true,
      },
      {
        code: "lcv_6w_container_6_7t",
        categoryCode: "lcv",
        bodyStyleCode: "closed",
        labelEn: "LCV • 6W • Container • 6-7T",
        wheelsW: 6,
        loadingTonMin: 6,
        loadingTonMax: 7,
        postSelectable: true,
        isPostEnvelope: true,
      },

      // Open Truck — post envelopes (granular half/full hidden from post)
      {
        code: "open_6w_full_7_13t",
        categoryCode: "open_truck",
        bodyStyleCode: "full_body",
        labelEn: "Open Truck • 6W • 7.5-13T",
        wheelsW: 6,
        loadingTonMin: 7.5,
        loadingTonMax: 13,
        postSelectable: true,
        isPostEnvelope: true,
      },
      {
        code: "open_10w_12_19t",
        categoryCode: "open_truck",
        bodyStyleCode: "full_body",
        labelEn: "Open Truck • 10W • 12-19T",
        wheelsW: 10,
        loadingTonMin: 12,
        loadingTonMax: 19,
        postSelectable: true,
        isPostEnvelope: true,
      },
      {
        code: "open_12w_20_25t",
        categoryCode: "open_truck",
        bodyStyleCode: "full_body",
        labelEn: "Open Truck • 12W • 20-25T",
        wheelsW: 12,
        loadingTonMin: 20,
        loadingTonMax: 25,
        postSelectable: true,
        isPostEnvelope: true,
      },
      {
        code: "open_14w_25_30t",
        categoryCode: "open_truck",
        bodyStyleCode: "full_body",
        labelEn: "Open Truck • 14W • 25-30T",
        wheelsW: 14,
        loadingTonMin: 25,
        loadingTonMax: 30,
        postSelectable: true,
        isPostEnvelope: true,
      },
      {
        code: "open_16w_33_35t",
        categoryCode: "open_truck",
        bodyStyleCode: "high_side",
        labelEn: "Open Truck • 16W • 33-35T",
        wheelsW: 16,
        loadingTonMin: 33,
        loadingTonMax: 35,
        postSelectable: true,
        isPostEnvelope: true,
      },
      {
        code: "open_18w_high_34_43t",
        categoryCode: "open_truck",
        bodyStyleCode: "high_side",
        labelEn: "Open Truck • 18W • High Side • 34-43T",
        wheelsW: 18,
        loadingTonMin: 34,
        loadingTonMax: 43,
        postSelectable: true,
        isPostEnvelope: true,
        matchGroupCode: "18w_high_side",
      },

      // Trailer
      {
        code: "trailer_12w_high_20_22t",
        categoryCode: "trailer",
        bodyStyleCode: "high_side",
        labelEn: "Trailer • 12W • High Side • 20-22T",
        wheelsW: 12,
        loadingTonMin: 20,
        loadingTonMax: 22,
        postSelectable: true,
        isPostEnvelope: true,
      },
      {
        code: "trailer_14w_high_28_32t",
        categoryCode: "trailer",
        bodyStyleCode: "high_side",
        labelEn: "Trailer • 14W • High Side • 28-32T",
        wheelsW: 14,
        loadingTonMin: 28,
        loadingTonMax: 32,
        postSelectable: true,
        isPostEnvelope: true,
      },
      {
        code: "trailer_16w_high_33_35t",
        categoryCode: "trailer",
        bodyStyleCode: "high_side",
        labelEn: "Trailer • 16W • High Side • 33-35T",
        wheelsW: 16,
        loadingTonMin: 33,
        loadingTonMax: 35,
        postSelectable: true,
        isPostEnvelope: true,
      },
      {
        code: "trailer_18w_high_38_42t",
        categoryCode: "trailer",
        bodyStyleCode: "high_side",
        labelEn: "Trailer • 18W • High Side • 34-42T",
        wheelsW: 18,
        loadingTonMin: 34,
        loadingTonMax: 42,
        postSelectable: true,
        isPostEnvelope: true,
        matchGroupCode: "18w_high_side",
      },
      {
        code: "trailer_22w_high_42_48t",
        categoryCode: "trailer",
        bodyStyleCode: "high_side",
        labelEn: "Trailer • 22W • High Side • 40-48T",
        wheelsW: 22,
        loadingTonMin: 40,
        loadingTonMax: 48,
        postSelectable: true,
        isPostEnvelope: true,
      },

      // Container (axle / length variants)
      {
        code: "container_6w_19ft_7_5t",
        categoryCode: "container",
        bodyStyleCode: "length_ft",
        labelEn: "Container • 6W • 19FT • 7.5T",
        wheelsW: 6,
        lengthFt: "19",
        loadingTonMin: 7.5,
        loadingTonMax: 7.5,
        postSelectable: true,
        isPostEnvelope: true,
      },
      {
        code: "container_6w_20_24ft_7_9t",
        categoryCode: "container",
        bodyStyleCode: "length_ft",
        labelEn: "Container • 6W • 20-24FT • 7.5-9T",
        wheelsW: 6,
        lengthFt: "20-24",
        loadingTonMin: 7.5,
        loadingTonMax: 9,
        postSelectable: true,
        isPostEnvelope: true,
      },
      {
        code: "container_10w_32ft_sa_7_9t",
        categoryCode: "container",
        bodyStyleCode: "length_ft",
        labelEn: "Container • 10W • 32FT SA • 7.5-9T",
        wheelsW: 10,
        lengthFt: "32SA",
        loadingTonMin: 7.5,
        loadingTonMax: 9,
        postSelectable: true,
        isPostEnvelope: true,
      },
      {
        code: "container_10w_32ft_ma_14_18t",
        categoryCode: "container",
        bodyStyleCode: "length_ft",
        labelEn: "Container • 10W • 32FT MA • 14.5-18T",
        wheelsW: 10,
        lengthFt: "32MA",
        loadingTonMin: 14.5,
        loadingTonMax: 18,
        postSelectable: true,
        isPostEnvelope: true,
      },
      {
        code: "container_10w_32ft_ta_19_30t",
        categoryCode: "container",
        bodyStyleCode: "length_ft",
        labelEn: "Container • 10W • 32FT TA • 19-30T",
        wheelsW: 10,
        lengthFt: "32TA",
        loadingTonMin: 19,
        loadingTonMax: 30,
        postSelectable: true,
        isPostEnvelope: true,
      },

      // Bulker
      {
        code: "bulker_14w_lime_20_28t",
        categoryCode: "bulker",
        bodyStyleCode: "lime_bulker",
        labelEn: "Bulker • 14W • Lime • 20-28T",
        wheelsW: 14,
        loadingTonMin: 20,
        loadingTonMax: 28,
        postSelectable: true,
        isPostEnvelope: true,
      },
      {
        code: "bulker_14w_powder_20_30t",
        categoryCode: "bulker",
        bodyStyleCode: "powder_bulker",
        labelEn: "Bulker • 14W • Powder • 20-30T",
        wheelsW: 14,
        loadingTonMin: 20,
        loadingTonMax: 30,
        postSelectable: true,
        isPostEnvelope: true,
      },
      {
        code: "bulker_18w_cement_22_32t",
        categoryCode: "bulker",
        bodyStyleCode: "cement_bulker",
        labelEn: "Bulker • 18W • Cement • 22-32T",
        wheelsW: 18,
        loadingTonMin: 22,
        loadingTonMax: 32,
        postSelectable: true,
        isPostEnvelope: true,
      },
      {
        code: "bulker_18w_flyash_22_32t",
        categoryCode: "bulker",
        bodyStyleCode: "fly_ash_bulker",
        labelEn: "Bulker • 18W • Fly Ash • 22-32T",
        wheelsW: 18,
        loadingTonMin: 22,
        loadingTonMax: 32,
        postSelectable: true,
        isPostEnvelope: true,
      },

      // Tipper
      {
        code: "tipper_12w_mining_18_26t",
        categoryCode: "tipper",
        bodyStyleCode: "mining",
        labelEn: "Tipper • 12W • Mining • 18-26T",
        wheelsW: 12,
        loadingTonMin: 18,
        loadingTonMax: 26,
        postSelectable: true,
        isPostEnvelope: true,
      },
      {
        code: "tipper_14w_mining_22_30t",
        categoryCode: "tipper",
        bodyStyleCode: "mining",
        labelEn: "Tipper • 14W • Mining • 22-30T",
        wheelsW: 14,
        loadingTonMin: 22,
        loadingTonMax: 30,
        postSelectable: true,
        isPostEnvelope: true,
      },

      // Tanker
      {
        code: "tanker_16w_chemical_20_30t",
        categoryCode: "tanker",
        bodyStyleCode: "chemical_tanker",
        labelEn: "Tanker • 16W • Chemical • 20-30T",
        wheelsW: 16,
        loadingTonMin: 20,
        loadingTonMax: 30,
        postSelectable: true,
        isPostEnvelope: true,
      },
      {
        code: "tanker_18w_water_18_28t",
        categoryCode: "tanker",
        bodyStyleCode: "water_tanker",
        labelEn: "Tanker • 18W • Water • 18-28T",
        wheelsW: 18,
        loadingTonMin: 18,
        loadingTonMax: 28,
        postSelectable: true,
        isPostEnvelope: true,
      },
      {
        code: "tanker_18w_petroleum_20_32t",
        categoryCode: "tanker",
        bodyStyleCode: "petroleum_tanker",
        labelEn: "Tanker • 18W • Petroleum • 20-32T",
        wheelsW: 18,
        loadingTonMin: 20,
        loadingTonMax: 32,
        postSelectable: true,
        isPostEnvelope: true,
      },
      {
        code: "tanker_18w_edible_oil_18_28t",
        categoryCode: "tanker",
        bodyStyleCode: "edible_oil_tanker",
        labelEn: "Tanker • 18W • Edible Oil • 18-28T",
        wheelsW: 18,
        loadingTonMin: 18,
        loadingTonMax: 28,
        postSelectable: true,
        isPostEnvelope: true,
      },

      // Reefer
      {
        code: "reefer_14w_18_24t",
        categoryCode: "reefer",
        bodyStyleCode: "reefer",
        labelEn: "Reefer • 14W • Reefer • 18-24T",
        wheelsW: 14,
        loadingTonMin: 18,
        loadingTonMax: 24,
        postSelectable: true,
        isPostEnvelope: true,
      },
      {
        code: "reefer_18w_20_28t",
        categoryCode: "reefer",
        bodyStyleCode: "reefer",
        labelEn: "Reefer • 18W • Reefer • 20-28T",
        wheelsW: 18,
        loadingTonMin: 20,
        loadingTonMax: 28,
        postSelectable: true,
        isPostEnvelope: true,
      },
    ],
  };
}

const STUB_MATERIALS: MaterialSuggestion[] = [
  { code: "CEMENT", nameEn: "Cement", groupCode: "construction" },
  { code: "STEEL", nameEn: "Steel coils", groupCode: "metals" },
  { code: "IRON_ORE", nameEn: "Iron ore", groupCode: "minerals" },
  { code: "COAL", nameEn: "Coal", groupCode: "minerals" },
  { code: "FMCG", nameEn: "FMCG packed goods", groupCode: "general" },
  { code: "TEXTILES", nameEn: "Textiles", groupCode: "general" },
  { code: "GRAIN", nameEn: "Grain / agri", groupCode: "agri" },
  { code: "SAND", nameEn: "Sand / aggregate", groupCode: "construction" },
  { code: "CHEMICALS", nameEn: "Chemicals (non-haz)", groupCode: "industrial" },
  { code: "PLASTIC", nameEn: "Plastic granules", groupCode: "industrial" },
  { code: "FERTILIZER", nameEn: "Fertilizer", groupCode: "agri" },
  { code: "MACHINERY", nameEn: "Machinery / project cargo", groupCode: "project" },
];

export function stubSearchMaterials(query: string, limit = 12): MaterialSuggestion[] {
  const q = query.trim().toLowerCase();
  if (q.length < 1) return STUB_MATERIALS.slice(0, limit);
  return STUB_MATERIALS.filter(
    (m) =>
      m.code.toLowerCase().includes(q) ||
      m.nameEn.toLowerCase().includes(q) ||
      (m.groupCode?.toLowerCase().includes(q) ?? false),
  ).slice(0, limit);
}

export function suggestMaterialFromCommodity(commodity: string): MaterialSuggestion | null {
  const q = commodity.trim().toLowerCase();
  if (!q || q === "—") return null;
  return (
    STUB_MATERIALS.find(
      (m) =>
        m.nameEn.toLowerCase() === q ||
        m.code.toLowerCase() === q ||
        m.nameEn.toLowerCase().includes(q) ||
        q.includes(m.nameEn.toLowerCase().split(" ")[0] ?? ""),
    ) ?? null
  );
}
