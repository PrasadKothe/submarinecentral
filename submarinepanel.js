let pubnub;
var channel = '10chat';
const addMessage = (msg) => {
var subelement = document.createElement('img');
subelement.setAttribute("id", msg.message.id);
subelement.alt = msg.message.name;
subelement.setAttribute("src", "./submarine.png");
var subtitle = document.createElement('label');
subtitle.innerHTML  = msg.message.name;
document.getElementById('submarine_dashbaord').appendChild(subelement).appendChild(subtitle);
};
const removeMessage = (msg) => {
document.getElementById(msg.message.id).remove();
};
const hideMessage = (msg) => {
document.getElementById(msg.message.id).style.visibility = "hidden";
};
const showMessage = (msg) => {
document.getElementById(msg.message.id).style.visibility = "visible";
};
const disableMessage = (msg) => {
$("#"+msg.message.id).attr("src", "./submarine-maint.png");
};
const enableMessage = (msg) => {
$("#"+msg.message.id).attr("src", "./submarine.png");
};
const setupPubNub = () => {
// Update this block with your publish/subscribe keys
pubnub = new PubNub({
    publishKey: "pub-c-1351e094-94a7-4bcd-9402-458139f9bed5",
    subscribeKey: "sub-c-402633b4-4ba8-469d-ac9a-fddf5e76298a",
    userId: "1213123123123"
});
pubnub.subscribe({channels: [channel]}); 
pubnub.addListener({
    message: function (m) {
        if(m.message.status=="new")
            addMessage(m)
        if(m.message.status=="show")
            showMessage(m)
        if(m.message.status=="hide")
            hideMessage(m)
        if(m.message.status=="disable")
            disableMessage(m)
        if(m.message.status=="enable")
            enableMessage(m)
        return Promise.resolve();
    }
});
};
// run after page is loaded
window.onload = setupPubNub;