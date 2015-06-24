$.post(
  {'url': 'http://sentiment.vivekn.com/api/batch/'},
  {'data': 
    [{'txt': 'butts butts'},
    {'txt':'this is some text'}]     
  },
  function (retData) {
    console.log(retData);
  }
);