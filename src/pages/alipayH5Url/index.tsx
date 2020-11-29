import React, { useState } from "react";
import QRCode from "qrcode.react";
import "./index.scss";

const testH5Url = (url: string) => /^https?:\/\//.test(url);

const zlbIndexWebview = (originUrl: string) => {
  return `alipays://platformapi/startapp?appId=2018090361258298&page=pages%2Findex%2Findex&query=${encodeURIComponent(
    `url=${encodeURIComponent(originUrl)}&type=mini`
  )}`;
};

const zlbWebviewBridge = (originUrl: string) => {
  return `alipays://platformapi/startapp?appId=2018090361258298&page=pages%2FwebviewBridged%2Findex&query=${encodeURIComponent(
    `webviewUrl=${encodeURIComponent(originUrl)}`
  )}`;
};

const miniappOpenH5 = (originUrl: string) => {
  return `alipays://platformapi/startapp?appId=20000067&url=${encodeURIComponent(
    originUrl
  )}`;
};

const transferFuncMap: any = {
  zlbIndexWebview,
  zlbWebviewBridge,
  miniappOpenH5
};

/**
 * 参考：https://myjsapi.alipay.com/jsapi/h5app-lifecycle.html
 */
export default () => {
  const [originUrl, setOriginUrl] = useState<string>("");
  const [openType, setOpenType] = useState<string>("");
  const [transferredUrl, setTransferredUrl] = useState<string>("");

  const textareaOnChange = (e: any) => {
    setOriginUrl(e.target.value ? e.target.value.trim() : "");
  };

  const radioOnChange = (e: any) => {
    setOpenType(e.target.value);
  };

  const btnOnClick = () => {
    if (!openType) {
      alert("未选择打开方式！");
      return false;
    }

    if (!testH5Url(originUrl)) {
      alert("请输入 H5 URL");
      return false;
    }

    if (typeof transferFuncMap[openType] === "function") {
      const url = transferFuncMap[openType](originUrl);
      setTransferredUrl(url);
    }
  };

  return (
    <div className="page">
      <h1 className="title">唤起支付宝打开 H5 转换工具</h1>

      <label>请选择打开方式：</label>
      <div>
        <ul className="ul">
          <li>
            <input
              type="radio"
              name="urlOpenType"
              value="zlbIndexWebview"
              id="zlbIndexWebview"
              onChange={radioOnChange}
            />
            <label htmlFor="zlbIndexWebview">
              浙里办小程序 <strong>首页跳转 webview 页加载 H5</strong>
            </label>
          </li>
          <li>
            <input
              type="radio"
              name="urlOpenType"
              id="zlbWebviewBridge"
              value="zlbWebviewBridge"
              onChange={radioOnChange}
            />
            <label htmlFor="zlbWebviewBridge">
              浙里办小程序 <strong>webviewBridged 页加载 H5</strong>
            </label>
          </li>
          <li>
            <input
              type="radio"
              name="urlOpenType"
              id="miniappOpenH5"
              value="miniappOpenH5"
              onChange={radioOnChange}
            />
            <label htmlFor="miniappOpenH5">
              支付宝 <strong> H5 容器加载</strong>
            </label>
          </li>
        </ul>
      </div>

      <textarea
        className="textarea"
        placeholder="请输入待转换的URL"
        onChange={textareaOnChange}
      />

      <div className="btn-wrapper">
        <button onClick={btnOnClick}>点击转换</button>
      </div>

      {true ? (
        <div className="transfer-wrapper">
          <QRCode
            value={transferredUrl}
            includeMargin={true}
            level="M"
            size={128 * Math.ceil(transferredUrl.length / 150)}
          />
          <pre>{transferredUrl}</pre>
        </div>
      ) : null}
    </div>
  );
};
