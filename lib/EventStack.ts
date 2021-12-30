import { Stack, StackProps } from "aws-cdk-lib";
import { RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { GenericTable } from "../infrastructure/genericTable";

export class EventStack extends Stack {
  private api = new RestApi(this, "apiPlutoTickets", {
    restApiName: "apiPlutoTickets",
    description:
      "This is the API for the PlutoTickets backend, this api contain all enpoints to TicketSystem",
  });

  private spacesTable = new GenericTable(this, {
    tableName: "EventsTable",
    primaryKey: "eventId",
    createLambdaPath: "Create",
    readLambdaPath: "Read",
   
  });

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const spaceResource = this.api.root.addResource("events");
    spaceResource.addMethod("POST", this.spacesTable.createLambdaIntegration);
    spaceResource.addMethod("GET", this.spacesTable.readLambdaIntegration);
    spaceResource.addMethod("PUT", this.spacesTable.updateLambdaIntegration);
    spaceResource.addMethod("DELETE", this.spacesTable.deleteLambdaIntegration);
  }
}
