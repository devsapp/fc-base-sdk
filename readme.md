# 模版项目

1. 修改 package.json
1. 修改 publish.yaml
1. npm i && npm run dev
1. 修改 index.ts

# s.yml

````
Test:
  Component: web-*?
  Provider: alibaba
  Access: wss
  Properties:
    region: cn-shenzhen
    service:
      name: zblog
      # logConfig: Auto
      # description: 测试环节
    function:
      # name: zblog
      # runtime: nodejs12
      # description: 测试环节
      customContainerConfig:
        image: registry.cn-shenzhen.aliyuncs.com/test-wss/nodejs12:v0.1
        command: '["node", "index.js"]'
        # args: '["--port", "9000"]'
      # caPort: 9000
      code:
        src: ./src
        excludes:
          - package-lock.json
    # trigger:
    #   name: def
    #   type: http
    #   config:
    #     authType: anonymous
    #     methods:
    #       - GET
    #       - POST
    #       - PUT
    customDomains:
      - domainName: Auto
        protocol: HTTP
        routeConfigs:
          - path: '/*'
      # - domainName: test.shoushuai.top
      #   protocol: HTTP,HTTPS
      #   routeConfigs:
      #     - path: '/'
      #   certConfig:
      #     certName: test
      #     certificate: ./certConfigCutom/cate.pem
      #     privateKey: ./certConfigCutom/key.pem
````