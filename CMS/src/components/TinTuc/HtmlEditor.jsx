import React from "react";
import EditorToolbar, { modules, formats } from "./EditToolBar";
import "./style.css";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";

function HtmlEditor({ value, setValue }) {
  const onChangeValue = (value) => {
    setValue(value);
  };

  return (
    <>
      <EditorToolbar toolbarId={"t1"} />
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChangeValue}
        placeholder={"Viết nội dung tin tức..."}
        modules={modules("t1")}
        formats={formats}
      />
    </>
  );
}
export default HtmlEditor;
