#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";

import { EventStack } from "../lib/EventStack";
import { TicketStack } from "../lib/TicketStack";
import { ApiStack } from "../lib/ApiStack";
import { RestApi } from "aws-cdk-lib/aws-apigateway";

const app = new cdk.App();

const apiStack = new ApiStack(app, "apiStack",{
  stackName: "apiStack",
});

const eventStack = new EventStack(app, "EventStack", {
  stackName: "EventStack",
});

const ticketStack = new TicketStack(app, "TicketStack", {
  stackName: "TicketStack",
});
