#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { EventStack } from '../lib/EventStack';


const app = new cdk.App();

new EventStack(app, 'EventStack', {
  stackName: 'EventStack',
});
