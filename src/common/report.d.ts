declare namespace ServerlessDevsReport {
  export interface Fc {
    region: string;
    service?: string;
    function?: string;
    triggers?: string[];
  }

  export interface ReportData {
    name: string;
    access: string;
    content: Fc;
  }
}
