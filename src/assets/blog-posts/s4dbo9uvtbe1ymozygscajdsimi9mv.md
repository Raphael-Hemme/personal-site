## The Problem

When trying to use p5.js inside an Angular app a week or so ago, I struggled to find instructions or tutorials on the matter that were working and up-to-date. One of the tutorials was a bit outdated but still very helpful once I figured out how to get rid of the error messages that immediately poped up when trying to set it up with a more recent Angular version (12.2).

But first let's get two questions out of the way: 
1. What is p5.js and 
2. Why even bother using it inside an Angular app?

### What is P5.js
p5.js is a library for creative coding. It provides functions or tools that make it easy to generate or manipulate images, video and sound. That makes it -among other things - particularly useful for creating generative art.

### Why use p5.js in a framework like Angular 
While p5.js gives us quite a few options to interactively react to user input like keypresses or mouse movement, at this point, I think it is much more convenient to use a web-framework like Angular (or React, Vue, Svelte ...) to build a site around the sketch and handle data-flow and rendering in a reactive manner while allowing p5 to shine on the canvas.

## Base Setup
For my experimentation, I decided to choose build a simple app that let's you create and modify a 2D image of a robot.

### Create a fresh app with the CLI
With this general idea, I picked a descriptive name for the project, then used the Angular CLI to generate a new project with `ng new` followed by the name like this:

```bash
ng new p5-angular-robot-generator
```

The CLI will asks whether you want to add angular routing and which stylesheet format you would like to use. 
I decided to add routing and chose `scss`.

After those prompts, the CLI creates a new directory in the current working directoy, initializes it as a git repository and installs a basic Angular App.

Now it is time to open the new project in a code-editor and start by removing all the boilerplate code in the `app.component.html` which is located in `scr/app/` inside the new project directory. 

I replaced the boilerplate code with just the following line that allows me to dynamically load the components I'll create in the next step when someone navigates to specific URLs directly in the browsers address bar: 
```html
<router-outlet></router-outlet>
```

### Generate basic component setup with the Angular CLI


### Install p5.js into the app

### Change strict-mode to false

