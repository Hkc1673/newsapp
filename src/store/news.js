import Request from "./request";

export const newsFetch = async (query, from, sortBy) => {
    return Request(
      `https://newsapi.org/v2/everything?q=${query}&from=${from}&sortBy=${sortBy}&language=en&apiKey=${process.env.REACT_APP_API_KEY}`
    ).then((result) => {
      return result;
    });
  };