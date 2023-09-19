
let pubnub;
var channel = '10chat';
var submarine = {
    name: "",
    uuid: "",
    status:""
    };
let submarinesregistered = [];

const buttonClick = () => {
var regName =  /^[A-Za-z\s]*$/ ;
///^[a-zA-Z]+ [a-zA-Z]+$/;
// Assign unique uuid to each submarine
$("#submarine_id").val(UUID());
submarine = {
    name: $("#newSubmarineName").val(),
    uuid: $("#submarine_id").val(),
    status: "new"
    }
    
if(!regName.test(submarine.name)){
    alert('Please provide an interesrting name');
}else{
    registersubmarines(submarine);
}
};

const showMessage = (msg) => {
var message = document.createElement('div');
message.innerText = msg.message.title;
document.getElementById('messages').appendChild(message);
};


const toggle = (ref,id) => {
if($("#"+id).hasClass("btn-warning")==true)
{
    $("#"+id).removeClass("btn-warning");
    $("#"+id).addClass("btn-primary");
    $("#"+id).text("Be Visible");

    var submarine = {
    name: "",
    uuid: ref,
    status:"hide"
    };
}
else
{
    $("#"+id).removeClass("btn-primary");
    $("#"+id).addClass("btn-warning");
    $("#"+id).text("Shields Up");

    var submarine = {
    name: "",
    uuid: ref,
    status:"show"
    };
}
publishMessage(submarine);
}


const maintenance = (ref,id) => {
if($("#"+id).hasClass("btn-danger")==true)
{
    $("#"+id).removeClass("btn-danger");
    $("#"+id).addClass("btn-primary");
    $("#"+id).text("Operational");

    var submarine = {
    name: "",
    uuid: ref,
    status:"enable"
    };
}
else
{
    $("#"+id).removeClass("btn-primary");
    $("#"+id).addClass("btn-danger");
    $("#"+id).text("Maintenance");

    var submarine = {
    name: "",
    uuid: ref,
    status:"disable"
    };
}
publishMessage(submarine);
}
const registersubmarines = (submarine) =>
{
    let newItem = submarine.name;
    let newItemid = submarine.uuid;
    if (newItem.trim() == "" || newItem.trim() == null)
        return false;
    else
        newSubmarineName.value = '';
    
    var isSubmarineRegistered = submarinesregistered.includes(newItem); // returns true
    if(isSubmarineRegistered)
    {
        alert("Submarine Already Registered");
    }
    else
    {
        let li = document.createElement("li");
        li.className = "list-group-item";
        
        let ActivateButton = document.createElement("button");
        ActivateButton.setAttribute("onclick", "toggle('"+newItemid+"','actdct_"+newItemid+"')");
        ActivateButton.setAttribute("id", "actdct_"+newItemid);
        ActivateButton.className = "btn-warning btn btn-sm float-right";
        ActivateButton.appendChild(document.createTextNode("Shields Up"));
    
        let DisableButton = document.createElement("button");
        DisableButton.setAttribute("onclick", "maintenance('"+newItemid+"','enbdbl_"+newItemid+"')");
        DisableButton.setAttribute("id", "enbdbl_"+newItemid);
        DisableButton.className = "btn-primary btn btn-sm float-right";
        DisableButton.appendChild(document.createTextNode("Operational"));
    
        li.appendChild(document.createTextNode(newItem));
        li.appendChild(ActivateButton);
        li.appendChild(DisableButton);

        submarinesregistered.push(newItem);

        registeredsubmarines.appendChild(li);
        publishMessage(submarine);
    }
}

function removeItem(e) {
e.preventDefault();
}

const setupPubNub = () => {
let items = document.getElementById("registeredsubmarines");
// items.addEventListener("click", removeItem);

// Update this block with your publish/subscribe keys
pubnub = new PubNub({
    publishKey: "pub-c-1351e094-94a7-4bcd-9402-458139f9bed5",
    subscribeKey: "sub-c-402633b4-4ba8-469d-ac9a-fddf5e76298a",
    userId: "1213123123123"
});
pubnub.subscribe({channels: [channel]}); 
};
// run after page is loaded
window.onload = setupPubNub;

// publish message
const publishMessage = async (submarine) => {
// With the right payload, you can publish a message, add a reaction to a message,
// send a push notification, or send a small payload called a signal.
const publishPayload = {
    channel : channel,
    message: {
        name: submarine.name,
        id: submarine.uuid,
        status: submarine.status
    }
};
await pubnub.publish(publishPayload);
$("input").focus();
}

// Function to generate UUID
function UUID() {
// http://www.ietf.org/rfc/rfc4122.txt
var s = [];
var hexDigits = "0123456789abcdef";
for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
}
s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
s[8] = s[13] = s[18] = s[23] = "-";

var uuid = s.join("");
return uuid;
}
