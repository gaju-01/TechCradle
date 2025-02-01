import ReactQuill from "react-quill";
import TextEditorStyles from "./TextEditor.module.css";

const modules = {
    toolbar: [
     [{ header: [1, 2, 3, 4, 5, 6, false] }], ["bold", "italic", "underline", "strike", "blockquote"],
     [{ align: ["right", "center", "justify"] }], [{ list: "ordered" }, { list: "bullet" }],
     ["link", "image"],["emoji"]
    ]
};

const TextEditor = (props) => { 
    return <ReactQuill className={`${TextEditorStyles["decorate-text-editor"]}`} modules={modules} value={props.value} onChange={props.onChange} placeholder="Enter the description" />
}

export default TextEditor;