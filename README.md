# To do


## Build Generators:

### `odr-frontend:email`
- scaffold HTML email templates, with some basic includes assuming it'll be generated into a `craft/templates/_readonly` folder

### `odr-frontend:tailwind`
 scaffold tailwind config, and sass files

### `odr-frontend:js`
 scaffold folders for JS, create an app.js entry point, some example code for our 1dr-utils

### `odr-frontend:gulp`
Generate a gulpfile to compile all of the above, generate separate gulpfile.config.js file.

### `odr-frontend:html` 
Generate a static HTML project, perhaps with some basic twig.js compiling. Good for little experiments or a non-craft site. Probably just a single HTML boilerplate. 

### `odr-frontend`
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

Should we rename to soemthign easier to type? `odrfe`?  Or give it some jaunty branded name? `yo darnley`?