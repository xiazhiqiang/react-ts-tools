import * as React from "react";
import { render } from "react-dom";

// 引入antd样式
import "antd/dist/antd.css";

import App from "./app";

const rootElement = document.getElementById("root");
render(<App />, rootElement);
