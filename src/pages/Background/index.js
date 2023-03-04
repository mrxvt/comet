import getPosts from '../../utils/getPosts'

const setIcon = (url) => {
  chrome.storage.local.get(['noPopupCheck'], (storage) => {
    if (!storage.noPopupCheck) {
      getPosts(url).then((posts) => {
        console.log('postCount', posts.length)
        const icon = posts.length ? '../icon48.png' : '../iconGrey48.png'
        chrome.action.setIcon({
          path: {
            48: icon,
          },
        })
      })
    }
  })
}

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
  console.log(tab)

  setIcon(tab.url)
})

chrome.tabs.onActivated.addListener(() => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    console.log('1', tabs[0].url)
    setIcon(tabs[0].url)
  })
})
