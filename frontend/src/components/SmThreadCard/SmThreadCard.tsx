import { Thread } from "@/pages/CommunityThread/CommunityThread.type";
import SmThreadCardView from "./SmThreadCard.view";

export default function SmThreadCard({ data }: { data: Thread }) {
  return <SmThreadCardView data={data} />;
}
