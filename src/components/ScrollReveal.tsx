"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    function observeElements() {
      const elements = document.querySelectorAll<HTMLElement>(".reveal");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );

      elements.forEach((el) => observer.observe(el));
    }

    observeElements();

    // Obserwuje zmiany DOM przy nawigacji Next.js bez pełnego przeładowania strony
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
