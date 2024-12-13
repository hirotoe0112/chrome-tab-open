document.addEventListener('DOMContentLoaded', function () {
  // クエリパラメータを取得
  const url = new URL(window.location.href);
  const id = url.searchParams.get('id');
  if (id) {
    // タブセットの情報を取得
    chrome.storage.local.get(['tab_set'], function (value) {
      const tab_set = value.tab_set.find(tab => tab.id == id);
      document.querySelector('#name').value = tab_set.name;
      document.querySelector('#urls').value = tab_set.urls.join('\n');
    });
  }

  // Saveボタンにイベントリスナーを追加
  document.getElementById('save').addEventListener('click', function () {
    const name = document.getElementById('name').value;
    const urls = document.getElementById('urls').value.split('\n');
    save(id, name, urls);
  })
})

function save(id, name, urls) {
  // 保存済みデータを取得し、新規データを追加
  chrome.storage.local.get(['tab_set'], function (value) {
    const data = value.tab_set
    if (id) {
      // 編集の場合は既存のデータを更新
      const target_index = data.findIndex(tab => tab.id == id);
      data[target_index] = { name: name, id: id, urls: urls };
    } else {
      const new_data = { name: name, id: data.length + 1, urls: urls };
      data.push(new_data)
    }
    // ストレージに保存
    chrome.storage.local.set({ 'tab_set': data }, function () {
      // 保存完了のメッセージを表示
      const status = document.getElementById('status');
      status.textContent = '保存しました';
      setTimeout(function () {
        status.textContent = '';
        document.querySelector('#name').value = '';
        document.querySelector('#urls').value = '';
      }, 750);
    });
  })
}