# salesforce-genesys-realtime-transcription
How to leverage the Genesys Cloud SDK inside Saleforce for real-time transcription and knowledge surfacing with the Embedded Framework.

This Example is built using the Genesys Cloud SDK for Saleforce that us part of the "Embedded Framework" AppExchange installation package. This does NOT require Salesforce Voice or Einstein. Details on the Public documentation can be found [HERE](https://help.mypurecloud.com/articles/events-in-salesforce/) under the "Events" there is a Notification that you can receive through the LMS if you "Subscribe" to the "conversationTranscription" option details on this are in teh same page the deep link is [HERE](https://help.mypurecloud.com/articles/events-in-salesforce/#subscribe).


Below is an example of the CSS utility theming in this repo. While seeing the transcript in realtime is nice this is more around using that realtime data to do something with it.... eg showing salesfoce knowledge articles in realtime.

![](/docs/images/screenshot1.png?raw=true)

To do this you need knowledge enabled in your salesforce environment as well as knowledge articles created with information on topics you want to prompt agents on.