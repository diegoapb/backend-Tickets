import { Stack, StackProps, CfnOutput, Duration } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import * as sns from "aws-cdk-lib/aws-sns";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as subs from "aws-cdk-lib/aws-sns-subscriptions";
import { join } from "path";

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const myQueue = new sqs.Queue(this, "MyQueue");
    const myTopic = new sns.Topic(this, "MyTopic");

    myTopic.addSubscription(new subs.SqsSubscription(myQueue));

    const myLambda = new NodejsFunction(this, "my-lambda", {
      memorySize: 1024,
      timeout: Duration.seconds(5),
      runtime: Runtime.NODEJS_14_X,
      handler: "main",
      entry: join(__dirname, `../services/MainLambda/sqsLambda.ts`),
    });

    // 👇 add sqs queue as event source for lambda
    myLambda.addEventSource(
      new SqsEventSource(myQueue, {
        batchSize: 10,
      })
    );

    new CfnOutput(this, "snsTopicArn", {
      value: myTopic.topicArn,
      description: "The arn of the SNS topic",
    });

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
