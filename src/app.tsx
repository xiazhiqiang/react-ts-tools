import * as React from "react";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";

import NotFound from "./components/notFound";
import Demo from "./pages/demo";
import AlipayH5Url from "./pages/alipayH5Url";

import "./styles.css";

/**
 * 参考React router 用法：https://reactrouter.com/web/guides/quick-start
 */
export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <h1>目录</h1>
          <ul>
            <li>
              <Link to="/alipayH5url">支付宝打开 H5 转换工具</Link>
            </li>
            {/* <li>
              <Link to="/demo">Demo</Link>
            </li> */}
          </ul>
        </Route>
        <Route path="/alipayH5url" exact component={AlipayH5Url} />
        <Route path="/demo" exact component={Demo} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
