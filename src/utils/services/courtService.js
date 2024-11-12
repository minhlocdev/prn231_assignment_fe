import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCourts } from "./queries/courtQuery";

export const useFetchPlayerCourts = (
  courtFilterDto,
  sortField,
  sortValue,
  pageNumber,
  pageSize
) => {
  return useQuery({
    queryKey: [
      "courts",
      courtFilterDto,
      sortField,
      sortValue,
      pageNumber,
      pageSize,
    ],
    queryFn: () =>
      getCourts(
        courtFilterDto,
        sortField,
        sortValue,
        pageNumber,
        pageSize,
        "player"
      ),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
};
export const useFetchOwnerCourts = (
  courtFilterDto,
  sortField,
  sortValue,
  pageNumber,
  pageSize
) => {
  return useQuery({
    queryKey: [
      "courts",
      courtFilterDto,
      sortField,
      sortValue,
      pageNumber,
      pageSize,
    ],
    queryFn: () =>
      getCourts(
        courtFilterDto,
        sortField,
        sortValue,
        pageNumber,
        pageSize,
        "court-owner"
      ),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });
};
