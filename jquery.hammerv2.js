(function(){
    var EVENTS = "tap,doubletap,press,";
    EVENTS += "pan,panstart,panmove,panend,pancancel,panleft,panright,panup,pandown,";
    EVENTS += "swipe,swipeleft,swiperight,swipeup,swipedown,";
    EVENTS += "pinch,pinchstart,pinchmove,pinchend,pinchcancel,pinchin,pinchout,";
    EVENTS += "rotate,rotatestart,rotatemove,rotateend,rotatecancel";

    $.fn.originalOn = $.fn.on;
    $.fn.originalOff = $.fn.off;

    $.fn.on = function(event, selector, data, callback, one){
    var autoRemove, delegator, $this = this;
    if (event && !(typeof(event) == 'string')) {
      $.each(event, function(type, fn){
        $this.on(type, selector, data, fn, one);
      });
      return $this;
    }
    if (!(typeof(selector) == 'string') && !(typeof(callback) == "function") && callback !== false)
      callback = data, data = selector, selector = undefined
    if ((typeof(data) == "function") || data === false)
      callback = data, data = undefined

    if (callback === false) callback = function(){return false;};

    if(EVENTS.indexOf(event) != -1){
        if(this[0].hammer == null){
            this[0].hammer = new Hammer(this[0]);
        }
        this[0].hammer.on(event, callback);
    }else{
        $this.originalOn(event, selector, data, callback, one);
    }
    return $this;
  };

  $.fn.off = function(event, selector, callback){
    if (event && !(typeof(event) == 'string')) {
      $.each(event, function(type, fn){
        $this.off(event, selector, callback);
      });
      return $this;
    }

    if(EVENTS.indexOf(event) != -1){
        this[0].hammer.off(event);
    }else{
        $this.originalOff(event, selector, callback);
    }
  };
})();







