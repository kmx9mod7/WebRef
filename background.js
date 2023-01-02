function getDate() {
  let date = new Date();
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return date.toISOString().split("T")[0];
}

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith('http')) {

    await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      args: [tab.title, tab.url, getDate()],
      func: (title, url, date) => {
        const text = `${title}, ${url}, (${date} 閲覧)`
        try {
          navigator.clipboard.writeText(text);
        } catch (e) {
          console.log(e);
        }
      },
    });
  }
});