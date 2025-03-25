chrome.runtime.onMessage.addListener(async (request) => {
  const rootID = "#All_Oikiri_Table";
  const markClass = ".selectBox";
  const marksClass = ".dropDown";

  switch (request.method) {
    case "check-off":
      const selectedMarks = (await chrome.storage.local.get("selectedMarks")).selectedMarks;

      document.querySelectorAll(`${rootID} .HorseList`).forEach(($horse, index) => {
        const $mark = $horse.querySelector(markClass);
        const $rank = $horse.querySelector('[class*="Rank_"]');

        if ($mark !== null && $rank !== null) {
          $mark.click();

          const rankMatch = $rank.className.match(/Rank_(.*)/);
          const rank = rankMatch[1];
          const key = rank === "" ? "無" : rank;
          const selectedMark = selectedMarks[key];

          $horse.querySelectorAll(`${marksClass} li`).forEach(($selector) => {
            if ($selector.textContent === selectedMark) {
              setTimeout(() => {
                $selector.click();
              }, 150 * index);
            }
          });
        }
      });

      break;
    case "reset":
      document.querySelectorAll(`${rootID} ${markClass}`).forEach(($mark) => {
        $mark.click();
      });

      document.querySelectorAll(`${rootID} ${marksClass}`).forEach(($marks, index) => {
        setTimeout(() => {
          $marks.querySelector("li:first-child").click();
        }, 60 * index);
      });

      break;
    default:
  }
});