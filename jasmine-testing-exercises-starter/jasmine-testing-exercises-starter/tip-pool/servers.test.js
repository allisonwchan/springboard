describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
    
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();
    
    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
    
  });

  it ('should not add new row if input fields are empty', function() {
    serverNameInput.value = '';
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(0);
  })

  it ('should add new row to server table if input fields not empty', function() {
    submitServerInfo();
    updateServerTable();

    let tableCells = document.querySelectorAll('#serverTable tbody tr td');

    expect(tableCells.length).toEqual(3);
    expect(tableCells[0].innerText).toEqual('Alice');
    expect(tableCells[1].innerText).toEqual('$0.00');
    expect(tableCells[2].innerText).toEqual('X');
  })

  afterEach(function() {
    // teardown logic
    serverTbody.innerHTML = '';
    serverId = 0;
    allServers = {};
  });
});
