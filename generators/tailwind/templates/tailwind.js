

// Import config from other files,
// and pass them in below:
const text = require("./src/config/text");
const sizes = require("./src/config/sizes");
const spacing = require("./src/config/spacing");
const borders = require("./src/config/borders");
const colors = require("./src/config/colors");
const screens = require("./src/config/screens");
const fonts = require("./src/config/fonts");
const shadows = require("./src/config/shadows");
const zIndex = require("./src/config/zIndex");
const opacity = require("./src/config/opacity");
const aspectRatio = require("./src/config/aspectRatio");

const _breakpoints = require("./src/config/breakpoints");

var breakpoints = {};
for ( var prop in _breakpoints.rulesets )
{
	breakpoints[ prop ] = _breakpoints.makebreakpoint( _breakpoints.rulesets[ prop ] );
}


/*

Tailwind - The Utility-First CSS Framework

A project by Adam Wathan (@adamwathan), Jonathan Reinink (@reinink),
David Hemphill (@davidhemphill) and Steve Schoger (@steveschoger).

Welcome to the Tailwind config file. This is where you can customize
Tailwind specifically for your project. Don't be intimidated by the
length of this file. It's really just a big JavaScript object and
we've done our very best to explain each section.

View the full documentation at https://tailwindcss.com.


|-------------------------------------------------------------------------------
| The default config
|-------------------------------------------------------------------------------
|
| This variable contains the default Tailwind config. You don't have
| to use it, but it can sometimes be helpful to have available. For
| example, you may choose to merge your custom configuration
| values with some of the Tailwind defaults.
|
*/

// var defaultConfig = require('tailwindcss/defaultConfig')()

module.exports = {


	aspectRatio: aspectRatio,

	/*
	|-----------------------------------------------------------------------------
	| Colors                                  https://tailwindcss.com/docs/colors
	|-----------------------------------------------------------------------------
	|
	| The color palette defined above is also assigned to the "colors" key of
	| your Tailwind config. This makes it easy to access them in your CSS
	| using Tailwind's config helper. For example:
	|
	| .error { color: config('colors.red') }
	|
	*/

	colors: colors.colors,


	/*
	|-----------------------------------------------------------------------------
	| Screens                      https://tailwindcss.com/docs/responsive-design
	|-----------------------------------------------------------------------------
	|
	| Screens in Tailwind are translated to CSS media queries. They define the
	| responsive breakpoints for your project. By default Tailwind takes a
	| "mobile first" approach, where each screen size represents a minimum
	| viewport width. Feel free to have as few or as many screens as you
	| want, naming them in whatever way you'd prefer for your project.
	|
	| Tailwind also allows for more complex screen definitions, which can be
	| useful in certain situations. Be sure to see the full responsive
	| documentation for a complete list of options.
	|
	| Class name: .{screen}:{utility}
	|
	*/

	screens: screens,
	breakpoints: breakpoints,


	/*
	|-----------------------------------------------------------------------------
	| Fonts                                    https://tailwindcss.com/docs/fonts
	|-----------------------------------------------------------------------------
	|
	| Here is where you define your project's font stack, or font families.
	| Keep in mind that Tailwind doesn't actually load any fonts for you.
	| If you're using custom fonts you'll need to import them prior to
	| defining them here.
	|
	| By default we provide a native font stack that works remarkably well on
	| any device or OS you're using, since it just uses the default fonts
	| provided by the platform.
	|
	| Class name: .font-{name}
	|
	*/

	fonts: fonts.fontFaces,

	// Custom:
	fontPaths: fonts.fontPaths,


	/*
	|-----------------------------------------------------------------------------
	| Text sizes                         https://tailwindcss.com/docs/text-sizing
	|-----------------------------------------------------------------------------
	|
	| Here is where you define your text sizes. Name these in whatever way
	| makes the most sense to you. We use size names by default, but
	| you're welcome to use a numeric scale or even something else
	| entirely.
	|
	| By default Tailwind uses the "rem" unit type for most measurements.
	| This allows you to set a root font size which all other sizes are
	| then based on. That said, you are free to use whatever units you
	| prefer, be it rems, ems, pixels or other.
	|
	| Class name: .text-{size}
	|
	*/

	textSizes: text.textSizes,


	/*
	|-----------------------------------------------------------------------------
	| Font weights                       https://tailwindcss.com/docs/font-weight
	|-----------------------------------------------------------------------------
	|
	| Here is where you define your font weights. We've provided a list of
	| common font weight names with their respective numeric scale values
	| to get you started. It's unlikely that your project will require
	| all of these, so we recommend removing those you don't need.
	|
	| Class name: .font-{weight}
	|
	*/

	fontWeights: text.fontWeights,


	/*
	|-----------------------------------------------------------------------------
	| Leading (line height)              https://tailwindcss.com/docs/line-height
	|-----------------------------------------------------------------------------
	|
	| Here is where you define your line height values, or as we call
	| them in Tailwind, leadings.
	|
	| Class name: .leading-{size}
	|
	*/

	leading: text.leading,


	/*
	|-----------------------------------------------------------------------------
	| Tracking (letter spacing)       https://tailwindcss.com/docs/letter-spacing
	|-----------------------------------------------------------------------------
	|
	| Here is where you define your letter spacing values, or as we call
	| them in Tailwind, tracking.
	|
	| Class name: .tracking-{size}
	|
	*/

	tracking: text.tracking,


	/*
	|-----------------------------------------------------------------------------
	| Text colors                         https://tailwindcss.com/docs/text-color
	|-----------------------------------------------------------------------------
	|
	| Here is where you define your text colors. By default these use the
	| color palette we defined above, however you're welcome to set these
	| independently if that makes sense for your project.
	|
	| Class name: .text-{color}
	|
	*/

	textColors: colors.text,


	/*
	|-----------------------------------------------------------------------------
	| Background colors             https://tailwindcss.com/docs/background-color
	|-----------------------------------------------------------------------------
	|
	| Here is where you define your background colors. By default these use
	| the color palette we defined above, however you're welcome to set
	| these independently if that makes sense for your project.
	|
	| Class name: .bg-{color}
	|
	*/

	backgroundColors: colors.backgrounds,


	/*
	|-----------------------------------------------------------------------------
	| Border widths                     https://tailwindcss.com/docs/border-width
	|-----------------------------------------------------------------------------
	|
	| Here is where you define your border widths. Take note that border
	| widths require a special "default" value set as well. This is the
	| width that will be used when you do not specify a border width.
	|
	| Class name: .border{-side?}{-width?}
	|
	*/

	borderWidths: borders.borderWidths,


	/*
	|-----------------------------------------------------------------------------
	| Border colors                     https://tailwindcss.com/docs/border-color
	|-----------------------------------------------------------------------------
	|
	| Here is where you define your border colors. By default these use the
	| color palette we defined above, however you're welcome to set these
	| independently if that makes sense for your project.
	|
	| Take note that border colors require a special "default" value set
	| as well. This is the color that will be used when you do not
	| specify a border color.
	|
	| Class name: .border-{color}
	|
	*/

	borderColors: colors.borders,


	/*
	|-----------------------------------------------------------------------------
	| Border radius                    https://tailwindcss.com/docs/border-radius
	|-----------------------------------------------------------------------------
	|
	| Here is where you define your border radius values. If a `default` radius
	| is provided, it will be made available as the non-suffixed `.rounded`
	| utility.
	|
	| If your scale includes a `0` value to reset already rounded corners, it's
	| a good idea to put it first so other values are able to override it.
	|
	| Class name: .rounded{-side?}{-size?}
	|
	*/

	borderRadius: borders.borderRadius,


	/*
	|-----------------------------------------------------------------------------
	| Width                                    https://tailwindcss.com/docs/width
	|-----------------------------------------------------------------------------
	|
	| Here is where you define your width utility sizes. These can be
	| percentage based, pixels, rems, or any other units. By default
	| we provide a sensible rem based numeric scale, a percentage
	| based fraction scale, plus some other common use-cases. You
	| can, of course, modify these values as needed.
	|
	|
	| It's also worth mentioning that Tailwind automatically escapes
	| invalid CSS class name characters, which allows you to have
	| awesome classes like .w-2/3.
	|
	| Class name: .w-{size}
	|
	*/

	width: sizes.width,


	/*
	|-----------------------------------------------------------------------------
	| Height                                  https://tailwindcss.com/docs/height
	|-----------------------------------------------------------------------------
	|
	| Here is where you define your height utility sizes. These can be
	| percentage based, pixels, rems, or any other units. By default
	| we provide a sensible rem based numeric scale plus some other
	| common use-cases. You can, of course, modify these values as
	| needed.
	|
	| Class name: .h-{size}
	|
	*/

	height: sizes.height,


	/*
	|-----------------------------------------------------------------------------
	| Minimum width                        https://tailwindcss.com/docs/min-width
	|-----------------------------------------------------------------------------
	|
	| Here is where you define your minimum width utility sizes. These can
	| be percentage based, pixels, rems, or any other units. We provide a
	| couple common use-cases by default. You can, of course, modify
	| these values as needed.
	|
	| Class name: .min-w-{size}
	|
	*/

	minWidth: sizes.minWidth,


	/*
	|-----------------------------------------------------------------------------
	| Minimum height                      https://tailwindcss.com/docs/min-height
	|-----------------------------------------------------------------------------
	|
	| Here is where you define your minimum height utility sizes. These can
	| be percentage based, pixels, rems, or any other units. We provide a
	| few common use-cases by default. You can, of course, modify these
	| values as needed.
	|
	| Class name: .min-h-{size}
	|
	*/

	minHeight: sizes.minHeight,


	/*
	|-----------------------------------------------------------------------------
	| Maximum width                        https://tailwindcss.com/docs/max-width
	|-----------------------------------------------------------------------------
	|
	| Here is where you define your maximum width utility sizes. These can
	| be percentage based, pixels, rems, or any other units. By default
	| we provide a sensible rem based scale and a "full width" size,
	| which is basically a reset utility. You can, of course,
	| modify these values as needed.
	|
	| Class name: .max-w-{size}
	|
	*/

	maxWidth: sizes.maxWidth,


	/*
	|-----------------------------------------------------------------------------
	| Maximum height                      https://tailwindcss.com/docs/max-height
	|-----------------------------------------------------------------------------
	|
	| Here is where you define your maximum height utility sizes. These can
	| be percentage based, pixels, rems, or any other units. We provide a
	| couple common use-cases by default. You can, of course, modify
	| these values as needed.
	|
	| Class name: .max-h-{size}
	|
	*/

	maxHeight: sizes.maxHeight,


	/*
	|-----------------------------------------------------------------------------
	| Padding                                https://tailwindcss.com/docs/padding
	|-----------------------------------------------------------------------------
	|
	| Here is where you define your padding utility sizes. These can be
	| percentage based, pixels, rems, or any other units. By default we
	| provide a sensible rem based numeric scale plus a couple other
	| common use-cases like "1px". You can, of course, modify these
	| values as needed.
	|
	| Class name: .p{side?}-{size}
	|
	*/

	padding: spacing.padding,


	/*
	|-----------------------------------------------------------------------------
	| Margin                                  https://tailwindcss.com/docs/margin
	|-----------------------------------------------------------------------------
	|
	| Here is where you define your margin utility sizes. These can be
	| percentage based, pixels, rems, or any other units. By default we
	| provide a sensible rem based numeric scale plus a couple other
	| common use-cases like "1px". You can, of course, modify these
	| values as needed.
	|
	| Class name: .m{side?}-{size}
	|
	*/

	margin: spacing.margin,


	/*
	|-----------------------------------------------------------------------------
	| Negative margin                https://tailwindcss.com/docs/negative-margin
	|-----------------------------------------------------------------------------
	|
	| Here is where you define your negative margin utility sizes. These can
	| be percentage based, pixels, rems, or any other units. By default we
	| provide matching values to the padding scale since these utilities
	| generally get used together. You can, of course, modify these
	| values as needed.
	|
	| Class name: .-m{side?}-{size}
	|
	*/

	negativeMargin: spacing.negativeMargin,


	/*
	|-----------------------------------------------------------------------------
	| Shadows                                https://tailwindcss.com/docs/shadows
	|-----------------------------------------------------------------------------
	|
	| Here is where you define your shadow utilities. As you can see from
	| the defaults we provide, it's possible to apply multiple shadows
	| per utility using comma separation.
	|
	| If a `default` shadow is provided, it will be made available as the non-
	| suffixed `.shadow` utility.
	|
	| Class name: .shadow-{size?}
	|
	*/

	shadows: shadows,


	/*
	|-----------------------------------------------------------------------------
	| Z-index                                https://tailwindcss.com/docs/z-index
	|-----------------------------------------------------------------------------
	|
	| Here is where you define your z-index utility values. By default we
	| provide a sensible numeric scale. You can, of course, modify these
	| values as needed.
	|
	| Class name: .z-{index}
	|
	*/

	zIndex: zIndex,


	/*
	|-----------------------------------------------------------------------------
	| Opacity                                https://tailwindcss.com/docs/opacity
	|-----------------------------------------------------------------------------
	|
	| Here is where you define your opacity utility values. By default we
	| provide a sensible numeric scale. You can, of course, modify these
	| values as needed.
	|
	| Class name: .opacity-{name}
	|
	*/

	opacity: opacity,

	/*
	|-----------------------------------------------------------------------------
	| Options                  https://tailwindcss.com/docs/configuration#options
	|-----------------------------------------------------------------------------
	|
	| Here is where you can set your Tailwind configuration options. For more
	| details about these options, visit the configuration options documentation.
	|
	*/

	options: {
		prefix: '',
		important: false,
		separator: ':',
	},

	plugins: [
	    require('tailwind-aspect-ratio')
	],


	modules: {

		// From plugin:
		aspectRatio: ['responsive'],
		

		fonts: [],
		fontWeights: [],
		textStyle: [],
		tracking: [],
		cursor: [],
		leading: [],
		lists: [],

		opacity: ['responsive', 'hover', 'group-hover'],
		
		// no responsive or focus, add focus manually 
		borderColors: [],
		backgroundColors: ['hover','group-hover'],
		textColors: ['hover', 'group-hover'],


		appearance: ['responsive'],
		backgroundPosition: ['responsive'],
		backgroundSize: ['responsive'],
		borderRadius: ['responsive'],
		borderStyle: ['responsive'],
		borderWidths: ['responsive'],

		display: ['responsive'],
		flexbox: ['responsive'],
		float: ['responsive'],
		height: ['responsive'],

		margin: ['responsive'],
		maxHeight: ['responsive'],
		maxWidth: ['responsive'],
		minHeight: ['responsive'],
		minWidth: ['responsive'],
		negativeMargin: ['responsive'],
		overflow: ['responsive'],
		padding: ['responsive'],
		pointerEvents: ['responsive'],
		position: ['responsive'],
		resize: ['responsive'],
		textAlign: ['responsive'],
		textSizes: ['responsive'],
		verticalAlign: ['responsive'],
		visibility: ['responsive'],
		whitespace: ['responsive'],
		width: ['responsive'],
		zIndex: ['responsive'],

		shadows: false,
		userSelect: false, // ['responsive'],
	}
}
