({
    clearTranscript: function (component) {
        component.set("v.lineItems", [])
    },
    searchKB: function (component, text) {
        var action = component.get("c.getArticlesList")
        action.setParams({ searchVar: text })
        action.setCallback(this, function (response) {
            var state = response.getState()
            if (state === "SUCCESS") {
                var data = response.getReturnValue()
                var knowledgeId = data[0][0].KnowledgeArticleId
                if (knowledgeId != null) {
                    console.log(data[0][0])
                    var workspaceAPI = component.find("workspace")
                    workspaceAPI.openTab({
                        recordId: knowledgeId,
                        focus: true
                    }).then(function (response) {
                        workspaceAPI.getTabInfo({
                            tabId: response
                        }).then(function (tabInfo) {
                            console.log("The url for this tab is: " + tabInfo.url)
                        })
                    })
                        .catch(function (error) {
                            console.error(error)
                        })
                }
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response.getError()
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.error("Error message: " +
                            errors[0].message)
                    }
                } else {
                    console.error("Unknown error")
                }
            }
        })
        $A.enqueueAction(action)
    },
    renderTranscript: function (component, text, direction, helper) {
        helper = this
        var existing = component.get("v.lineItems")
        $A.createComponents([
            ["lightning:card", {
                "title": text,
                "class": direction
            }]
        ],
            function (components, status, errorMessage) {
                if (status === "SUCCESS") {
                    existing = existing.concat(components)
                    component.set("v.lineItems", existing)
                    if (text.length > 10) { helper.searchKB(component, text, helper) }	//Only search KB is string is longer then 10 chars
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                    // Show offline error
                }
                else if (status === "ERROR") {
                    console.error("Error: " + errorMessage)
                    // Show error message
                }
            }
        )
    },
    transcriptFilter: function (component, jsonData, helper) {
        helper.this
        console.log("Transcript Notification: ", jsonData)
        try {
            for (const transcript of jsonData.transcripts) {
                console.log("transcripts...")
                var text = ""
                for (const words of transcript.alternatives) {
                    console.log(words)
                    for (const word of words.words) {
                        console.log("word: ", word.word)
                        console.log("confidence: ", word.confidence)
                        if (.8 < word.confidence) {
                            text = text + " " + word.word
                        }
                    }
                }
                if (transcript.channel === "EXTERNAL") {
                    console.log("External: " + text)
                    if (text.length > 1) { helper.renderTranscript(component, text, "card-customer", helper) }	//Only render is longer then 1 char

                } else {
                    console.log("Internal: " + text)
                    if (text.length > 1) { helper.renderTranscript(component, text, "card-internal", helper) }	//Only render is longer then 1 char
                }
            }
        } catch (err) {
            if (err.toString().includes("jsonData.transcripts is not iterable")) {
                //do nothing even message
            } else {
                console.error("Error: ", err)
            }
        }
    }
})