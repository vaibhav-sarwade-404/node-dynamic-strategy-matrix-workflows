const core = require("@actions/core");

try {
  // `os` input defined in action metadata file with default value "ubuntu-latest,windows-latest"
  const os = core.getInput("os", { require: true });

  // `nodeversion` input defined in action metadata file with default value "10,16"
  const nodeVersion = core.getInput("nodeversion", { required: true });

  core.info(
    `Inputs to transform ${JSON.stringify({
      os,
      nodeVersion
    })}`
  );

  // create arrays by splitting input on ','
  const osArray = os.split(",");
  const nodeVersionArray = nodeVersion.split(",");

  // Reduce array to string with single quotation mark
  const osInputStringified = osArray.map(_os => `'${_os}'`).toString();
  const nodeVersionInputStringified = nodeVersionArray
    .map(_nodeVersion => `'${_nodeVersion}'`)
    .toString();

  core.setOutput("os", `[${osInputStringified}]`);
  core.setOutput("nodeversion", `[${nodeVersionInputStringified}]`);
} catch (error) {
  core.setFailed(
    `Action failed to transform input with error: ${error.message}`
  );
}
