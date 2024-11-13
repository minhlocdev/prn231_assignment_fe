import axiosClient from "../../configuration/axiosClient";
import {
  GET_COURTS_BY_ID_ENDPOINT,
  GET_COURTS_OWNER_ENDPOINT,
  GET_COURTS_PLAYER_ENDPOINT,
} from "../../constants/endpoints"; // Make sure to define this endpoint
import queryString from "query-string";

export const getCourts = async (
  courtFilterDto,
  sortField,
  sortValue = "asc",
  pageNumber = 1,
  pageSize = 10,
  fetchFor
) => {
  const params = {
    CourtGroupId: courtFilterDto.CourtGroupId,
    CourtName: courtFilterDto.CourtName,
    Address: courtFilterDto.Address,
    Contact: courtFilterDto.Contact,
    MaxPlayers: courtFilterDto.MaxPlayers,
    Status: courtFilterDto.Status,
    sortField,
    sortValue,
    pageNumber,
    pageSize,
  };

  const queryParams = queryString.stringify(params, { skipNull: true });

  const response = await axiosClient.get(
    `${
      fetchFor === "player"
        ? GET_COURTS_PLAYER_ENDPOINT
        : GET_COURTS_OWNER_ENDPOINT
    }?${queryParams}`
  );

  return {
    isSuccess: response.data.isSuccess,
    message: response.data.message,
    result: {
      data: response.data.result.data || [],
      totalCount: response.data.result.totalCount || 0,
    },
  };
};

export const getCourt = async (courtId) => {
  const response = await axiosClient.get(
    `${GET_COURTS_BY_ID_ENDPOINT}${courtId}`
  );

  return {
    isSuccess: response.data.isSuccess,
    message: response.data.message,
    result: response.data.result || [],
  };
};
