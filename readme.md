# 模版项目

1. 修改 package.json
1. 修改 publish.yaml
1. npm i && npm run dev
1. 修改 index.ts

# s.yml

````
edition: 1.0.0 
name: fcBaseApp   
access: default

services:
  fc-base-test:
    component: devsapp/fc-base-sdk
    props:
      region: cn-shenzhen
      service:
        name: fc-base-service
      function:
        name: test-function
        service: fc-base-service
        filename: './code.zip'
        handler: 'index.handler'
        memorySize: 128
        runtime: nodejs12
        timeout: 60
      triggers:
        - name: httpTrigger
          function: test-function
          service: fc-base-service
          type: http
          config:
            authType: anonymous
            methods:
              - GET
  fc-base-test-1:
    component: ${path(../..)}
    props:
      region: cn-shenzhen
      service:
        name: fc-base-service
      function:
        name: test-function
        service: fc-base-service
        filename: './code.zip'
        handler: 'index.handler'
        memorySize: 128
        runtime: nodejs12
        timeout: 60
      triggers:
        - name: httpTrigger
          function: test-function
          service: fc-base-service
          type: http
          config:
            authType: anonymous
            methods:
              - GET
````