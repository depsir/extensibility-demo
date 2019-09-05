import React, {useState, useEffect} from 'react';
import ReactDom from 'react-dom';
import Form from "react-jsonschema-form";

const schema = {
  title: "Customize this page by providing a custom jsonschema and a webcomponent",
  type: "object",
  required: [],
  properties: {
    jsonschema: {type: "string", title: "JSONschema url", default: "./formdefinition.json"},
    webcomponent: {type: "object", title: "Webcomponent",
      properties:{
        url: {type: "string", title: "Url", default: "https://qrcode-webcomponent.netlify.com/qr-code.js"},
        tag: {type: "string", title: "Tag", default: "qr-code"}
      }
  }
  }
};

const ConfigurationForm  = ({onSubmit}) => {
  return <Form schema={schema}
        onSubmit={d => onSubmit(d.formData)}
        />
}

const CustomPage  = ({formSchema, tag}) => {
  const [data, setData] = useState({});
  return <div>
    <Form schema={formSchema}
               onSubmit={data => setData(data.formData)}
        />
     <div
      dangerouslySetInnerHTML={{
        __html: `<${tag}
            data='${JSON.stringify(data)}'>
        </${tag}>`
      }}
    />
    </div>
}

const Explanation = () => {
    return <div>
        <h2>Description</h2>
        <p>This page is a showcase for an extensible architecture</p>
        <p>In this example is shown an entirely customizable page composed by a form to submit data and a webcomponent to process and render the submitted data</p>
        <p>To use this page you should provide the url of a JSON schema describing a form and the url and tag name for a webcomponent. When you submit this configuration, the customized page will be constructed and shown</p>
        <p>The form is pre-filled with a schema and webcomponent to transform a url into a qrcode. Just press submit to view the page!</p>
        <p>For a detailed explanation of the technologies used refer to <a href="https://github.com/depsir/extensibility-demo">https://github.com/depsir/extensibility-demo</a></p>
        
    </div>
}

const App = () => {

    const [formSchema, setFormSchema] = useState("")
    const [webcomponentTag, setWebcomponentTag] = useState("")

    const onSubmitConfiguration = (data) => {
      const script = document.createElement("script");
      script.type = "module";
      script.src = data.webcomponent.url;
      document.getElementsByTagName("head")[0].appendChild(script);
    setWebcomponentTag(data.webcomponent.tag)

        fetch(data.jsonschema).then(res => {
            res.json().then(setFormSchema)
        })
    }

    if (!formSchema) {
        return <div>
                <ConfigurationForm onSubmit={onSubmitConfiguration}/>
                <Explanation />
            </div>
    }

    return <CustomPage formSchema={formSchema} tag={webcomponentTag}/>

}

ReactDom.render(<App />, document.getElementById('app'));

