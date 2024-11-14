import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUsers } from "./queries/userQuery";

export const useFetchUsers = (
  filterField,
  filterValue,
  sortField,
  sortValue,
  pageNumber = 1,
  pageSize = 5
) => {
  return useQuery({
    queryKey: [
      "users",
      filterField,
      filterValue,
      sortField,
      sortValue,
      pageNumber,
      pageSize,
    ],
    queryFn: () =>
      getUsers(
        filterField,
        filterValue,
        sortField,
        sortValue,
        pageNumber,
        pageSize
      ),
    placeholderData: keepPreviousData,
  });
};
