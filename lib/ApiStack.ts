import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { join } from "path";

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new RestApi(this, "apiPlutoTickets", {
      restApiName: "apiPlutoTickets",
      description: "This is the main API for the Pluto Tickets",
    });

    const helloLambdaNode = new NodejsFunction(this, "helloLambdaNode", {
      entry: join(__dirname, "../services/MainLambda/hello.ts"),
      handler: "handler",
    });

    const helloResource = api.root.addResource("hello");
    const helloIntegration = new LambdaIntegration(helloLambdaNode);
    helloResource.addMethod("GET", helloIntegration);
  }
}
