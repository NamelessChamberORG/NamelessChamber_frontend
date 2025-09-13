import { useMutation } from "@tanstack/react-query";
import type { CreateFeedbackRequest } from "../types/types";
import { feedbackApi } from "../api/feedback";

export function useCreateFeedback() {
  return useMutation({
    mutationFn: (body: CreateFeedbackRequest) => feedbackApi.create(body),
  });
}
