let elem = document.getElementsByTagName('textarea')[0];
elem.value = "phone";
elem._valueTracker.setValue('phone');
let event = new Event('change', {
    bubbles:true,
    cancelable: true
});

elem.dispatchEvent(event);