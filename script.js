window.onload = function(){
  let operation = {
    result : 0,
    acum : 0,
    operator :'+',
    apply: function(){
      switch (this.operator) {
        case '*':{
          this.result = this.result * this.acum;
          break;
        }
        case '/':{
          this.result = this.result / this.acum;
          break;
        }
        case '+':{
          this.result = this.result + this.acum;
          break;
        }
        case '-':{
          this.result = this.result - this.acum;
          break;
        }
        default:{
          this.reset();
        }
      }
      if(this.result.toString().length > 8){
        if(this.result.toString().toLowerCase().indexOf('e')>0){
          this.reset();
        }
        else{
          this.result = +(this.result.toString().substring(0,9));
        }
      }
    },
    reset: function(){
      this.result = 0;
      this.acum = 0;
      this.operator = '+';
    },
  };

  function DeleteTextNodes(){
    let botonPads = document.getElementsByClassName('buttonsPad');
    for(let i=0;i<botonPads.length;i++){
      let toRemove = [];
      for(let j = 0; j < botonPads[i].children.length; j++){
        if(botonPads[i].children[j].nodeType == 3){
          toRemove.push(botonPads[i].children[j]);
        }
      }
      for(let j = 0; j < botonPads[i].children.length; j++){
        botonPads[i].removeChild(toRemove[j]);
      }
    }
  }

  function GetScreenContentList(){
    return document.getElementsByClassName('screen-content');
  }

  function GetScreenErrorList(){
    return document.getElementsByClassName('screen-error');
  }

  function GetDigitBtnList(){
    return document.getElementsByClassName('btn-digit');
  }

  function GetEqualsBtnList(){
    return document.getElementsByClassName('btn-equals');
  }

  function GetDotBtnList(){
    return document.getElementsByClassName('btn-dot');
  }

  function GetOperatorBtnList(){
    return document.getElementsByClassName('btn-operator');
  }

  function GetResetBtnList(){
    return document.getElementsByClassName('btn-reset');
  }

  function HideErrorMsg(){
    let screensErrorSign = GetScreenErrorList();
    for(let i=0;i<screensErrorSign.length;i++){
      screensErrorSign[i].classList.add("hide");
    }
  }

  function ShowErrorMsg(){
    let screensErrorSign = GetScreenErrorList();
    for(let i=0;i<screensErrorSign.length;i++){
      screensErrorSign[i].classList.remove("hide");
    }
  }

  function HideAcum(){
    let screensContentSign = GetScreenContentList();
    for(let i=0;i<screensContentSign.length;i++){
      screensContentSign[i].classList.add("hide");
    }
  }

  function ShowAcum(){
    let screensContentSign = GetScreenContentList();
    for(let i=0;i<screensContentSign.length;i++){
      screensContentSign[i].classList.remove("hide");
    }
  }

  function ParseResult(){
    if(operation.result > 99999999 || operation.result < -99999999 || operation.result.toString().toLowerCase().indexOf('e')>0){
      operation.reset();
      HideAcum();
      ShowErrorMsg();
    }
  }

  function SetValueDisplay(value){
    let displays = GetScreenContentList();
    for (let i = 0; i < displays.length; i++) {
      displays[i].innerText = value;
    }
  }

  function registerClickHandlers(){
    let multiplier = 10;
    function digitPressed(event){
      let button = event.target;
      let value = button.value;

      if(operation.acum.toString().length > 8){
        operation.reset();
        HideAcum();
        ShowErrorMsg();
      }
      else{
        if(multiplier > 1){
          operation.acum *= multiplier;
          operation.acum += +value;
        }
        else{
          let decimalToAppend = (+value*multiplier).toFixed(7);
          operation.acum += (+value*multiplier);
          multiplier *= 0.1;
        }
        SetValueDisplay(operation.acum);
      }
    }

    function dotPressed(){
      multiplier = 0.1;
      ParseResult();
      SetValueDisplay(operation.acum);
    }

    function resetPressed(event){
      operation.reset();
      SetValueDisplay(operation.acum);
      HideErrorMsg();
      ShowAcum();
    }

    function equalsPressed(){
      multiplier = 10;
      operation.apply();
      ParseResult();
      SetValueDisplay(operation.result);
    }

    function operatorPressed(event){
      multiplier = 10;
      let operator = event.target.value;
      operation.apply();
      ParseResult();
      operation.acum = 0;
      SetValueDisplay(operation.result);
      operation.operator = operator;
    }

    let dotBtns = GetDotBtnList();
    for (let i = 0; i < dotBtns.length; i++) {
      dotBtns[i].addEventListener('click', dotPressed);
    }

    let digits = GetDigitBtnList();
    for (let i = 0; i < digits.length; i++) {
      digits[i].addEventListener('click', digitPressed);
    }

    HideErrorMsg();

    let resetBtns = GetResetBtnList();
    for (let i = 0; i < resetBtns.length; i++) {
      resetBtns[i].addEventListener('click', resetPressed);
    }

    let operatorsBtns = GetOperatorBtnList();
    for (let i = 0; i < operatorsBtns.length; i++) {
      operatorsBtns[i].addEventListener('click', operatorPressed);
    }

    let equalsBtns = GetEqualsBtnList();
    for (let i = 0; i < equalsBtns.length; i++) {
      equalsBtns[i].addEventListener('click', equalsPressed);
    }
  }

  registerClickHandlers();
};
