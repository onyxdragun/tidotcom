import { useEffect } from "react";

export const useDocumentTitle = (title) => {
  useEffect(() => {
    const fullTitle = title ? `${title} - Tyler Ingram Photography` : 'Tyler Ingram Photography';
    document.title = fullTitle;
  }, [title]);
};
