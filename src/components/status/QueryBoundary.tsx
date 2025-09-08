import type { ReactNode } from "react";

type Props = {
  isLoading?: boolean;
  isError: boolean;
  error?: unknown;
  isFetching?: boolean;

  isEmpty?: boolean;

  onRetry?: () => void;

  variant?: "list" | "detail";
  loading?: ReactNode;
  empty?: ReactNode;

  children: ReactNode;
};

export default function QueryBoundary({
  isLoading,
  isFetching,
  isEmpty,
  loading,
  empty,
  children,
}: Props) {
  if (isLoading || isFetching) {
    return <>{loading ?? null}</>;
  }

  if (isEmpty) {
    return <>{empty ?? null}</>;
  }

  return <>{children}</>;
}
