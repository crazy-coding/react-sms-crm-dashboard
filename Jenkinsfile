#!groovy​
@Library('jenkins-shared-libraries')_

deliveryPipeline(
  runTests: false,
  deployPreProd: true,
  manualApproveProd: true,
  deployProd: true,
  serviceAlias: "mdm_control_connect_ui",
  deployNonMaster: true,
)
