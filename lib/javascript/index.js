chrome.experimental.socket.create('tcp', '127.0.0.1', 8080, function(socketInfo) {
    chrome.experimental.socket.connect(socketInfo.socketId, function (result) {
          chrome.experimental.socket.write(socketInfo.socketId, "Hello, world!");         
      });
  });