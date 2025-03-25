(async () => {
  let ranksHTML = "";
  let selectedMarks = (await chrome.storage.local.get("selectedMarks")).selectedMarks;

  if (selectedMarks === undefined) {
    selectedMarks = {};

    RANKS.forEach((rank) => {
      selectedMarks[rank] = MARKS[0];
    });

    chrome.storage.local.set({ "selectedMarks": selectedMarks });
  }

  RANKS.forEach((rank) => {
    let marksHTML = "";

    MARKS.forEach((mark) => {
      const selected = selectedMarks[rank] === mark ? " selected" : "";

      marksHTML += `<option value="${mark}"${selected}>${mark}</option>`;
    });

    ranksHTML += `<tr><td>${rank}</td><td><select name="${rank}">${marksHTML}</select></td></tr>`;
  });

  document.getElementById("ranks").innerHTML = ranksHTML;

  document.querySelectorAll("select").forEach((select) => {
    select.addEventListener("change", async (event) => {
      let selectedMarks = (await chrome.storage.local.get("selectedMarks")).selectedMarks;

      selectedMarks[event.target.name] = event.target.value;

      chrome.storage.local.set({ "selectedMarks": selectedMarks });
    });
  });
})();

document.getElementById("check-off").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { method: "check-off" }).catch((error) => {
      console.log(error);
    });
  });
});

document.getElementById("reset").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { method: "reset" }).catch((error) => {
      console.log(error);
    });
  });
});