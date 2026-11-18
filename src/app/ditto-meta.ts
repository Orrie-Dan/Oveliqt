// Per-instance Ditto metadata. Validation-only node ids stay in .clone/generated.
export type DittoNodeMeta = { anchor?: string };
export type DittoNodeMetaMap = Record<number, DittoNodeMeta | undefined>;

export const MediaTile_meta: DittoNodeMetaMap[] = [
    { 4: { anchor: "style-1" } },
    { 4: { anchor: "style-2" } },
    { 4: { anchor: "style-3" } }
];
export const Tile13_meta: DittoNodeMetaMap[] = [
    { 3: { anchor: "style-18" } },
    { 3: { anchor: "style-19" } },
    { 3: { anchor: "style-20" } }
];
