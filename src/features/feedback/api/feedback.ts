import client from "../../../api/client";
import type { ApiResponse } from "../../../api/types";
import type { CreateFeedbackRequest } from "../types/types";
import { unwrapNoContent } from "../../../api/helpers";

export const feedbackApi = {
  async create(body: CreateFeedbackRequest): Promise<void> {
    const res = await client.post<ApiResponse<unknown>>("/feedbacks", body, {
      validateStatus: () => true,
    });

    unwrapNoContent(res);
  },
};
