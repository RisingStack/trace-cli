# trace-cli

Command line utility for [Trace by RisingStack](https://trace.risingstack.com/) monitoring tool.

## requirements

`node >= 4.x.x`

## install

npm i -g @risingstack/trace-cli

## usage

```
Usage: trace-cli [subcommand] <args ...>

Commands:

  deployhook   Sends deployhook to highlight your application versions in Trace
  help [cmd]   display help for [cmd]

Example: trace-cli deployhook --git

Options:

  -h, --help     output usage information
  -V, --version  output the version number
```

### deployhook

Sends deploy hook to highlight revisions on various Trace features like metrics charts.

```
Usage: trace-cli deployhook <args ...>

Options:

  -h, --help              output usage information
  -g, --git [value]       use last GIT commit for revision, description and user
  -r, --revision [value]  deploy revision, like GIT short hash
  -m, --message [value]   deploy description, like commit message
  -u, --user [value]      deploy created by, like committer
  --api-key [value]       TRACE_API_KEY from Trace
  --service-name [value]  TRACE_SERVICE_NAME from Trace
```

You can also pass api-key and service name as environment variables like: `TRACE_API_KEY` and `TRACE_SERVICE_NAME`.
