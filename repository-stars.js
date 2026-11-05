document.querySelectorAll("[data-repository-stars]").forEach(async (element) => {
  const repository = element.dataset.repositoryStars;
  const cacheKey = 'qun-dai-repository-stars:' + repository;

  try {
    const savedCount = Number.parseInt(window.localStorage.getItem(cacheKey), 10);
    if (Number.isSafeInteger(savedCount) && savedCount >= 0) {
      element.textContent = savedCount.toLocaleString("en-US");
    }
  } catch {
    // Keep the count provided in the page when storage is unavailable.
  }

  try {
    const response = await fetch("https://api.github.com/repos/" + repository, {
      cache: "no-cache",
      headers: { Accept: "application/vnd.github+json" },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return;

    const { stargazers_count: count } = await response.json();
    if (!Number.isSafeInteger(count) || count < 0) return;

    element.textContent = count.toLocaleString("en-US");
    element.title = "Current GitHub star count";
    window.localStorage.setItem(cacheKey, String(count));
  } catch {
    // Keep the last known count when GitHub or browser storage is unavailable.
  }
});
