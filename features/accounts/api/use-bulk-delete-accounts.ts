import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.accounts["bulk-delete"]["$post"]>;
type ResquestType = InferRequestType<typeof client.api.accounts["bulk-delete"]["$post"]>["json"];

export const useBulkDeleteAccounts = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, ResquestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts["bulk-delete"]["$post"]({
        json
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Accounts deleted");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: () => {
      toast.error("Failed to deleted accounts");
    },
  });

  return mutation;
};
