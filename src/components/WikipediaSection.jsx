import React, { useEffect } from "react";
import axios from "axios";

const WikipediaSection = ({ searchTerm, setLoading, setArticle }) => {
  useEffect(() => {
    const fetchWikipediaData = async () => {
      if (!searchTerm) {
        setArticle("Please enter a valid search term.");
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get("https://en.wikipedia.org/w/api.php", {
          params: {
            action: "query",
            format: "json",
            origin: "*",
            prop: "extracts",
            exintro: true,
            explaintext: true,
            titles: searchTerm,
          },
        });

        const pages = response.data.query.pages;
        const pageId = Object.keys(pages)[0];
        const article = pages[pageId]?.extract || "No article found.";
        setArticle(article);
      } catch (error) {
        console.error("Error fetching data from Wikipedia:", error);
        setArticle("Failed to fetch article.");
      } finally {
        setLoading(false);
      }
    };

    fetchWikipediaData();
  }, [searchTerm, setArticle, setLoading]);

  return null; // This component is for side-effects only
};

export default WikipediaSection;
