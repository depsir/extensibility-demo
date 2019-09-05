Extensibility demo
==================

This project is a showcase for an extensible architecture. You can find the live example at https://extensibility-demo.netlify.com

In the example is shown an entirely customizable page composed by a form to submit data and a webcomponent to process and render the submitted data

To use this page you should provide the url of a JSON schema describing a form and the url and tag name for a webcomponent. When you submit this configuration, the customized page will be constructed and shown

The form is pre-filled with a schema and webcomponent to transform a url into a qrcode. Just press submit to view the page!


## Technologies

The main page is a simple React application that renders the initial form and the description.

As soon as some data is submitted, the jsonschema is fetched, along with the webcomponent. Then the custom page is rendered with an instance of [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form), a generic library to build a form from a jsonschema definition.
Below the form, the tag of the webcomponent is rendered, and the loaded webcomponent does the rest.

The interaction between the form and the webcomponent is managed by the custom page, which simply pass the entire form data to the webcomponent, into a `data` property.

The example qr-code webcomponent was developed specifically for this demo, using [LitElement](https://lit-element.polymer-project.org). You can find the source code of the webcomponent [here](https://github.com/depsir/qrcode-webcomponent)

Note that also the initial form is rendered through react-jsonschema-form
