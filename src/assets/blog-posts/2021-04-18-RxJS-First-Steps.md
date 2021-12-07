---
title: "Learning RxJS - Taming an Electric Eel"
categories:
  - Blog
  - coding practice
tags:
  - resources

---

## Where to start

I am currently learning Angular. And with Angular comes RxJS which is a library to process asynchronous data streams.

Only studying it for one week, I was quite confused in the beginning about what RxJS actually is or how to get a grasp of some of the most widely used operators. Everything seemed so weird and it felt like I had to painfully cut my brain into really thin slices to finally wrap my head around this technology.

After going through about 3/4 of one course, I arrived at the transformation operators and was totally lost when I tried to follow the explanations about nested `observables`. Observables are the streams of data that an `observer` (a function or an object) can `subscribe` to to get notified when something changes in the observable. Nested observables occur when one observable returns another observable and that needs to be either subscribed to inside the outer subscriber or it must be flattened. That is how I understood it at this point at least.  

After doing a little search for other resources that could provide a big picture view of RxJS and an explanation of some of those transformation operators, I found the following two videos by NeverBenBetter, which I found tremendously helpful. He uses Metaphors to explain the difference between e.g. promises and observables and extends the metaphor in his second video to also explicate a few operators that I found difficult to grasp. Compliments to NeverBenBetter and thanks a lot!


<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/GSI7iyK_ju4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/lM16-E-uCWc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>