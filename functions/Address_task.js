exports.Address_task =async function(context, event, callback,RB) {
    try {
    let Listen = false;
    let Remember = {};
    let Collect = false;
    let Tasks = false;
    let Redirect = false;
    let Handoff = false;
    let Say = "";
    // Add your code here.
    const Memory = JSON.parse(event.Memory);
    
    let mailingAddress;
    let webPaymentAddress;

    if(Memory.mailingAddress=== undefined)
       mailingAddress='Woodland';
    else
       mailingAddress=Memory.mailingAddress;
    
    if(Memory.webPaymentAddress=== undefined)
       webPaymentAddress='test@convergentusa.com';
    else
      webPaymentAddress=Memory.webPaymentAddress;
    
    Say=`The mailing address is: ${mailingAddress}, and the web address is : ${webPaymentAddress}.`;
    
    Remember.AFlag = 'A';
    Redirect = 'task://greeting';
   
    //End of your code.
  
   RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);
  
} catch (error) {
console.error(error);
callback( error);
}
};