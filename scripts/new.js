// Saveボタンにイベントリスナーを追加
document.getElementById('save').addEventListener('click', function () {
  const name = document.getElementById('name').value;
  const urls = document.getElementById('urls').value.split('\n');
  save(name, urls);
})

function save(name, urls) {
  // 保存済みデータを取得し、新規データを追加
  chrome.storage.local.get(['tab_set'], function (value) {
    const data = value.tab_set
    const new_data = { name: name, id: data.length + 1, urls: urls };
    data.push(new_data)
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