import React, { useState } from "react";
import { message, Button, Tooltip, Radio } from "antd";
import QRCode from "qrcode.react";
import { copyToClipboard } from "../../utils/index";

import "./index.scss";

// const testH5Url = (url: string) => /^https?:\/\//.test(url);

const zlbMpaas = ({ originUrl, portalEnv }: any) => {
  return `zwfw://MiniApp?appId=2019031512345679&page=%2Fpages%2Findex%2Findex&query=${encodeURIComponent(
    `type=mini&portalEnv=${portalEnv}${
      originUrl ? `&url=${encodeURIComponent(originUrl)}` : ""
    }`
  )}`;
};

const zlbIndexWebview = ({ originUrl, portalEnv }: any) => {
  return `alipays://platformapi/startapp?appId=2018090361258298&page=pages%2Findex%2Findex&query=${encodeURIComponent(
    `type=mini&portalEnv=${portalEnv}${
      originUrl ? `&url=${encodeURIComponent(originUrl)}` : ""
    }`
  )}`;
};

const zlbWebviewBridge = ({ originUrl, portalEnv }: any) => {
  return `alipays://platformapi/startapp?appId=2018090361258298&page=pages%2FwebviewBridged%2Findex&query=${encodeURIComponent(
    `portalEnv=${portalEnv}${
      originUrl ? `&webviewUrl=${encodeURIComponent(originUrl)}` : ""
    }`
  )}`;
};

const alipayWebview = ({ originUrl, portalEnv }: any) => {
  return `alipays://platformapi/startapp?appId=20000067&url=${encodeURIComponent(
    originUrl || ""
  )}&portalEnv=${portalEnv}`;
};

const guanghaWebview = ({ originUrl, portalEnv }: any) => {
  return `alipays://platformapi/startapp?appId=2018090361258298&page=${encodeURIComponent(
    `pages/zw_base_h5/index?title=title&url=${
      originUrl ? encodeURIComponent(originUrl) : ""
    }`
  )}&query=${encodeURIComponent(`type=mini&portalEnv=${portalEnv}`)}`;
};

const transferFuncMap: any = {
  zlbMpaas,
  zlbIndexWebview,
  zlbWebviewBridge,
  alipayWebview,
  guanghaWebview
};

const radioStyle = { display: "block" };

/**
 * 参考：https://myjsapi.alipay.com/jsapi/h5app-lifecycle.html
 */
export default () => {
  const [originUrl, setOriginUrl] = useState<string>("");
  const [openType, setOpenType] = useState<string>("zlbIndexWebview"); // 默认浙里办小程序webviewBridged
  const [transferredUrl, setTransferredUrl] = useState<string>("");
  const [portalEnv, setPortalEnv] = useState("online"); // 默认走正式

  const textareaOnChange = (e: any) => {
    setOriginUrl(e.target.value ? e.target.value.trim() : "");
  };

  const radioOnChange = (e: any) => {
    setOpenType(e.target.value);
  };

  const envRadioOnChange = (e: any) => {
    setPortalEnv(e.target.value);
  };

  const btnOnClick = () => {
    if (!openType) {
      alert("未选择打开方式！");
      return false;
    }

    if (typeof transferFuncMap[openType] === "function") {
      const url = transferFuncMap[openType]({ originUrl, portalEnv });
      setTransferredUrl(url);
    }
  };

  return (
    <div className="page">
      <h1 className="title">唤起容器打开 H5 转换工具</h1>

      <h3>请选择打开方式：</h3>
      <Radio.Group
        onChange={radioOnChange}
        value={openType}
        defaultValue={openType}
      >
        <Radio style={radioStyle} value="guanghaWebview">
          支付宝浙里办小程序{" "}
          <strong>（直接 webview（光华插件）加载 H5）</strong>
        </Radio>
        <Radio style={radioStyle} value="zlbIndexWebview">
          支付宝浙里办小程序 <strong>（首页跳转 webview 页加载 H5）</strong>
        </Radio>
        <Radio style={radioStyle} value="zlbWebviewBridge">
          支付宝浙里办小程序 <strong>（webviewBridged 页加载 H5）</strong>
        </Radio>
        <Radio style={radioStyle} value="zlbMpaas">
          浙里办 APP <strong>（ Mpaas 小程序 webview 加载 H5）</strong>
        </Radio>
        <Radio style={radioStyle} value="alipayWebview">
          支付宝 APP <strong>（ H5 容器加载 H5）</strong>
        </Radio>
      </Radio.Group>

      <h3>请选择环境：</h3>
      <Radio.Group
        onChange={envRadioOnChange}
        value={portalEnv}
        defaultValue={portalEnv}
      >
        <Radio value="online">正式</Radio>
        <Radio value="prepub">预发</Radio>
        <Radio value="daily">日常</Radio>
      </Radio.Group>

      <textarea
        className="textarea"
        placeholder="请输入待转换的URL"
        onChange={textareaOnChange}
      />

      <Button type="primary" onClick={btnOnClick}>
        点击转换
      </Button>

      {true ? (
        <div className="transfer-wrapper">
          <QRCode
            value={transferredUrl}
            includeMargin={true}
            level="M"
            size={128 * Math.ceil(transferredUrl.length / 150)}
          />
          <Tooltip title="双击链接即可复制" placement="top">
            <p
              className="transferred-url-text"
              onDoubleClick={() => {
                copyToClipboard(transferredUrl);
                message.success("已复制到剪贴板！");
              }}
            >
              {transferredUrl}
            </p>
          </Tooltip>
        </div>
      ) : null}
    </div>
  );
};
