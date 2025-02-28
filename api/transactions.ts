import { api } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

export const getBalanceStats = (from: string, to: string) => {
  return useQuery({
    queryKey: ["balance", from, to],
    queryFn: async () => {
      const response = await api.get("api/stats/balance", {
        params: {
          from: from,
          to: to,
        },
      });
      return response.data;
    },
  });
};

export const createTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      amount,
      description,
      date,
      category,
      type,
    }: {
      amount: number;
      description?: string;
      date: Date;
      category: string;
      type: "income" | "expense";
    }) => {
      const response = await api.post(
        "/api/transactions",
        {
          amount,
          description,
          date: date.toISOString(),
          category,
          type,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      router.back();
    },
  });
};

// Get transaction history
export const getTransactions = (from: Date, to: Date) => {
  return useQuery({
    queryKey: ["transactions", from, to],
    queryFn: async () => {
      const response = await api.get("/transactions", {
        params: {
          from: from.toISOString(),
          to: to.toISOString(),
        },
      });
      return response.data;
    },
  });
};
