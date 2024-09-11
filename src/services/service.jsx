import axios from "axios";

export default class Service {
  articlesURL = "/articles";

  apiClient = axios.create({
    baseURL: "https://blog.kata.academy/api",
    timeout: 1000,
    headers: {
      accept: "application/json",
    },
  });

  getArticles = async () => {
    try {
      const response = await this.apiClient.get(`${this.articlesURL}`, {
        params: {
          limit: 5,
          offset: 0,
        },
      });
      if (!response.status) {
        throw new Error(
          `Could not fetch ${this.articlesURL} received ${response.status}`
        );
      }
      return await response.data;
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };
}
