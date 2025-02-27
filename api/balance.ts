import { api } from "@/lib/axios";

export async function getBalanceStats(groupId: number, from: Date, to: Date) {
  const { data } = await api.get("/stats/balance", {
    params: {
      groupId,
      from: from.toISOString(),
      to: to.toISOString(),
    },
  });
  return data;
}
