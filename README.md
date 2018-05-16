# One Darnley Road Front End Generator

Yeoman Command:
`$ yo darnley`



## Build Generators:

### `yo darnley:email`
- scaffold HTML email templates, with some basic includes assuming it'll be generated into a `craft/templates/_readonly` folder

### `yo darnley:tailwind`
 scaffold tailwind config, and sass files

### `yo darnley:js`
 scaffold folders for JS, create an app.js entry point, some example code for our 1dr-utils

### `yo darnley:gulp`
Generate a gulpfile to compile all of the above, generate separate gulpfile.config.js file.

### `yo darnley:html` 
Generate a static HTML project, perhaps with some basic twig.js compiling. Good for little experiments or a non-craft site. Probably just a single HTML boilerplate. 

### `yo darnley`
Main app. Will `composeWith`:

- email
- tailwind
- js
- gulp

And probably omit `html` for now.

## Share prompts
Since we have a lot of tasks, we might want to share config between them and yet also allow someone to run one generator on its own ( or cherry pick parts ), we need to ensure that the prompts get asked _once_ but _always_ - this works fine for the `app` parent generator but need to ensure there's some sort of if / else prompt on the children, and maybe it is always a composeWith for each project. 


## Thoughts
Should we just bundle craft into this as well? It's complicated enough that perhaps we should keep that as a separate project whereas all these generally depend on the gulpfile. 

## Gulp tasks

If people run some of the generators, can we make a gulpfile that has some or all of the tasks needed?

One option is to create a folder of gulp tasks (this will work well with gulp 4, which seems to encourage tasks as simple functions now) and then use package.json to store config for which tasks get registered, and read that in the gulpfile. 