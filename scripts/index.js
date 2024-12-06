const tab_area = document.querySelector('#tabs');

//chrome.storage.local.clear()


// ストレージからタブ一覧データを取得する
function get_tab_list(callback) {
  //chrome.strage.localからtab_setというキーで取得する
  chrome.storage.local.get(['tab_set'], function (value) {
    if (!value.tab_set) {
      chrome.storage.local.set({ 'tab_set': [] }, function () {
        console.log('tab_setが存在しなかったため、tab_setを作成しました')
      })
      callback([])
    } else {
      callback(value.tab_set)
    }
  })
}

// 登録されているタブセットの一覧をポップアップに表示する
function display_tab_list(tab_list) {
  const ul = document.createElement('ul');
  tab_list.forEach(tab_set => {
    const li = document.createElement('li');
    li.textContent = tab_set.name;
    li.addEventListener('click', () => {
      open_tabs(tab_set.id);
    });
    ul.appendChild(li);
  })
  tab_area.appendChild(ul);
}

// タブセットをクリックしたときに登録されたタブを開く
function open_tabs(tab_id) {
  get_tab_list(function (tab_list) {
    // tab_idに一致するタブのurlsを取得する
    const target_tab = tab_list.find(tab => tab.id === tab_id);
    if (target_tab) {
      // 取得したurlsを使ってタブを開く
      target_tab.urls.forEach(url => {
        chrome.tabs.create({ url: url });
      })
    }
  })
}

// 初期化処理
get_tab_list(function (data) {
  display_tab_list(data);
})