# salesforce-genesys-realtime-transcription
How to leverage the Genesys Cloud SDK inside Saleforce for real-time transcription and knowledge surfacing with the Embedded Framework.

This Example is built using the Genesys Cloud SDK for saleforce that us part of the "Embedded Framework" AppExchange installation package. This does NOT require Salesforce Voice or Einstein. Details on the Public documentation can be found [HERE](https://help.mypurecloud.com/articles/events-in-salesforce/) under the "Events" there is a Notification that you can receive through the LMS if you "Subscribe" to the "conversationTranscription" option details on this are in teh same page the deep link is [HERE](https://help.mypurecloud.com/articles/events-in-salesforce/#subscribe). IF you are more after the use case of saving the conversation transcript inside of a salesforce object then there is a specific SDK object to do this and information about this can be found [HERE](https://help.mypurecloud.com/articles/use-the-sdk-to-create-voice-transcript-in-genesys-cloud-for-salesforce/).


Below is an example of the CSS utility theming in this repo. While seeing the transcript in realtime is nice this is more around using that realtime data to do something with it.... eg showing salesfoce knowledge articles in realtime.

![](/docs/images/screenshot1.png?raw=true)

To do this you need knowledge enabled in your salesforce environment as well as knowledge articles created with information on topics you want to prompt agents on. In my case I have just created some simple Knowledge articles like the below

![](/docs/images/knowledge.png?raw=true)

The way this has been built out is to simple pop a Knowledge article when the conversation has an utterance that matches an existing Knowledge article. This popup also puts it in focus, If this is to interruptive to agents you could offer this as a button or visually render the KB article in the background etc. This is really dependent on the experience you are building out.

# Step 1 - enable the service

First of all you will need to ensure that Genesys Cloud is setup to have Voice Transcription enabled. This does require to be licensed for the feature details on commercials are outside of this scope of the repo. You will also need to ensure that you have the "Low Latency Transcription" option enabled as we are getting the real time transcript through the "Notificaitons API" this will have a large improvement on performance.

![](/docs/images/screenshot2.png?raw=true)

# Step 2 - Create Lightning Component

In the Salesforce Developer Console create a new Lightning Component Bundle and use each of the objects in this repo for the

    Component (GCtranscript.cmp)
    Controller (GCtranscriptController.js)
    Helper (GCtranscriptHelper.js)
    Style (GCtranscript.css)

Its probably easiest to simply copy and paste the contents from each file into your files you have created as part of the bundle. Then save the changes.

![](/docs/images/screenshot4.png?raw=true)

# Step 3 - Create Apex Class

In the Developer console also create a new Apex Class file. This is based on the assumption you dont already have one created and in use for the Genesys Cloud SDK. If you do simply add the code from the file GCplatform.apxc in this repo to it. Otherwise create the new class file call it

    GCplatform

Then paste in the contents of the GCplatform.apxc file in this repo and save the file.

# Step 4 - Ensure LMC is enabled

Inside the Genesys Cloud installation package (That you already have installed and setup) ensure that the Lightning Message Channel is enabled with at least "Notification" selected so the events can be received. More details can be found [HERE](https://help.mypurecloud.com/articles/configure-client-events/).

![](/docs/images/screenshot3.png?raw=true)

# Step 5 - Set the Utility

Edit the "App" under the "App Manager" that you are using to enable the new "Utility Item". Ensure that the "Start automatically" option is ticked and save the changes.

# Step 6 - Knowledge

While now the transcription will be enabled and showing up on calls to the platform without having knowledge items in the Salesforce environment nothing will "popup". To set this up enable Knowledge in the saleforce environment and create a new article and publish it like in my 

    "What is the meaning of life" 

example in the above intro to this readme.

# Options

You will notice that in the Apex Class file you created the default code I have in there does look for only Knowledge Articles that are

    PublishStatus='Online' AND Language = 'en_US'

This means that they need to be "Published" as well as in en-US. If you are using a different language for example this query would need to be adjusted of course.

In the Helper.js file you will also notice I have put comments on the parts that only transcribe strings longer then 1 Char as well as KB search's only when it longer the 10 Chars. This is to stop search's on single words like "mmmm" or "yea ok" etc this will drastically reduce search's that hit the Apex Class.

Also in this Helper.js file you will see the "confidence" that is set by default I have it at 

    .8 which is 80%

but you can configure this if required by simply changing this value.