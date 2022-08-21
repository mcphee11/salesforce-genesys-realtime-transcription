({
    onClientEvent: function (component, message, helper) {
        //console.log(JSON.stringify(message))  //Uncomment for debugging
        var eventData = message.getParams()
        if (eventData) {
            if (eventData.type === "InitialSetup") {
                console.log("SDK Ready")
                var body = {
                    type: "PureCloud.Subscribe",
                    data: {
                        type: "Notification",
                        categories: ["conversationTranscription"]
                    }
                }
                component.find("clientEventMessageChannel").publish(body)
                console.log("SUB Sent")
            }
            if (eventData.category === "conversationTranscription") {
                console.log("Transcript received")
                helper.transcriptFilter(component, eventData.data, helper)
            }
            //------------------------- VOICE ---------------------------------------------
            if (eventData.type === "Interaction"
                && eventData.data.isCallback === false
                && eventData.data.isDialer === false
                && eventData.data.isChat === false
                && eventData.data.isEmail === false
                && eventData.data.isMessage === false
                && eventData.data.isVoicemail === false
                && eventData.data.state === "DISCONNECTED") {
                    console.log("Disconnected Voice")
                    helper.clearTranscript(component)
            }
        }
    }
})