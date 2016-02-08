# Phonebuzz
Bill Derouin

### Deploying
```npm install```

```npm start```

### Endpoints
#### Phase 1
Set phone endpoint for Twilio to ```POST /phonebuzz``` 

Will say prompt, you have to enter a number and hit pound (or wait 5 seconds).

It will reload same endpoint with body param ```Digits``` that you just entered and read off FizzBuzz.

#### Phase 2, 3, & 4
Visit [homepage](http://derouinw-phonebuzz.herokuapp.com/). You can enter phone number to call - make sure to format with +1 at the beginning. 

You can enter a delay in seconds in the delay box.

Didn't finish part 4, but you can see where the history would have gone below that.

### Additional Comments
I'm afraid I didn't have enough time to finish before you guys wanted it in, but the plan was to hit the ```/phonebuzz2``` endpoint and modify it to send the phonebuzz number with it too, from the history. And when you make a request to make a new call, I would add a new document to the database with the details.

Overall, I decided to use node.js on heroku with MongoDB, just because that's really all the web backend I'm familiar with from past projects. I'm still learning it all and best practices, so forgive me for any "noob" moves, but please let me know what I can improve! I'm always trying to get better, of course.

#### Future improvements
If I had more time to work on this project, I would have done some things to make it work better in a real-world environment. I think that some of the variables and endpoints could be named better, and that's something I'd like to learn about web backend (i.e. API design). I also would use process variables for some of the data like the database uri and Twilio API variables. And for the page itself, I would work on making a better design, probably with a template engine like Jade. It would probably also be good to make the call delay asychronous, especially for large delays. Finally, more error checking and failure management is always better and something I didn't really do a lot of.



Anyways, thanks for reading and I look forward to hearing back from you guys! I had a lot of fun with this, and I think it's a really cool and interesting way to screen a candidate. I'm pretty bummed I didn't get a chance to flesh it out more. Let me know if you have any questions, my email is [derouinbill@gmail.com](derouinbill@gmail.com);
