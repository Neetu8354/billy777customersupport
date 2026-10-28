export const dynamic = "force-dynamic";

const STICKERS = [
  { id: 1, kind: "emoji", value: "😂" }, { id: 2, kind: "emoji", value: "❤️" },
  { id: 3, kind: "emoji", value: "👍" }, { id: 4, kind: "emoji", value: "🔥" },
  { id: 5, kind: "emoji", value: "🙏" }, { id: 6, kind: "emoji", value: "😍" },
  { id: 7, kind: "emoji", value: "🎉" }, { id: 8, kind: "emoji", value: "😭" },
  { id: 9, kind: "emoji", value: "👌" }, { id: 10, kind: "emoji", value: "💯" },
  { id: 11, kind: "emoji", value: "😊" }, { id: 12, "kind": "emoji", value: "🤝" },
  { id: 13, kind: "emoji", value: "😎" }, { id: 14, kind: "emoji", value: "🥳" },
  { id: 15, kind: "emoji", value: "😅" }, { id: 16, kind: "emoji", value: "🤗" },
  { id: 17, kind: "emoji", value: "👏" }, { id: 18, kind: "emoji", value: "💪" },
  { id: 19, kind: "emoji", value: "🤔" }, { id: 20, kind: "emoji", value: "😴" },
  { id: 21, kind: "emoji", value: "🙌" }, { id: 22, kind: "emoji", value: "✨" },
  { id: 23, kind: "emoji", value: "💐" }, { id: 24, kind: "emoji", value: "🚚" },
];

export async function GET() {
  return Response.json({ success: true, stickers: STICKERS });
}
