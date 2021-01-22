 const functions = Runtime.getFunctions();
 const AddressTaskHandler = require(functions['Address_task'].path);
 const paymentTaskHandler = require(functions['payment_task'].path);
 const AgentTransferTypeHandler = require(functions['agent_transfer_task'].path);
 const greetingTaskHandler = require(functions['greeting_task'].path);
 const goodbyeTaskHandler = require(functions['goodbye_task'].path);
 const collectFallbackTaskHandler = require(functions['collect_fallback_task'].path);
 const fallbackHandler = require(functions['fallback_task'].path);

 const responseBuilder = require(functions['responseBuilder'].path);


exports.handler = async (context, event, callback) => {
  console.log("Index");
  const { CurrentTask } = event;
  let {CurrentTaskConfidence} = event;
  let CurrentConfidencevalue= Number(CurrentTaskConfidence);
  console.log("currenttask: "+ CurrentTask);
  console.log("CurrentTaskConfidence: "+ CurrentTaskConfidence);
  console.log("CurrentConfidencevalue: "+ CurrentConfidencevalue);
 
  // calling task handlers
  if(CurrentConfidencevalue === 1 || CurrentConfidencevalue === 0)
  {
  switch (CurrentTask) {

    case 'Address':
      console.log('Address');
      await AddressTaskHandler.Address_task(context, event, callback,responseBuilder.RB);
      break;

      case 'payment':
      console.log('payment');
      await paymentTaskHandler.payment_task(context, event, callback,responseBuilder.RB);
      break;

      case 'Agent':
      console.log('Agent');
      await AgentTransferTypeHandler.agent_transfer_task(context, event, callback,responseBuilder.RB);
      break;

   
    case 'greeting':
      console.log('greeting');
      await greetingTaskHandler.greeting_task(context, event, callback,responseBuilder.RB);
      break;

    case 'goodbye':
      await goodbyeTaskHandler.goodbye_task(context, event, callback,responseBuilder.RB);
      break;

    case 'collect_fallback':
      await collectFallbackTaskHandler.collect_fallback_task(context, event, callback,responseBuilder.RB);
      break;

    case 'fallback':
     await fallbackHandler.fallback_task(context, event, callback,responseBuilder.RB);
      break;

    default:
      await fallbackHandler.fallback_task(context, event, callback,responseBuilder.RB);
      break;
  }
}
else
{
  
    await fallbackHandler.fallback_task(context, event, callback,responseBuilder.RB);
    console.log("else fallback");
    return;

}
};

