# TestVibe Templates

Cookbook templates for provider tool packages shown in `ExtensionsView`.

These templates mirror the current `Tools/<Provider>/tools.js` architecture used by TestVibe today:

- package-level metadata at the top of `tools.js`
- tool-level metadata directly above each exported tool
- `async function` tool implementations with a single object parameter
- private helper functions kept unexported
- CommonJS export surface via `module.exports = { ... }`

## Providers

- `Simple`
- `SQL`
- `MySQL`
- `REST`

## Current Tool Shape

Each provider folder currently contains a `tools.js` file that can be copied into `Tools/<Provider>/tools.js`.

Recommended conventions:

- Use `//#PackageDescription=...` at the top of the file.
- Declare provider configuration once with top-level `//#Variables=...` and `//#Secrets=...`.
- Place `//#Summary`, `//#Description`, `//#ReturnsType`, `//#ReturnsValue`, and optional `//#Example` lines directly above each exported tool.
- Prefer a single object parameter:
  - `async function queryMySql({ sql, host } = {}) { ... }`
- Keep helper functions private unless they are intended to be tools.
- Export the callable tools explicitly:
  - `module.exports = { queryMySql }`

## Notes

- These templates intentionally avoid database or HTTP client package installs. They are scaffolds for the current runtime, not dependency manifests.
- `init-script.js` is optional and only needed for page-bound/browser helper scenarios such as the existing `Tools/Wisej.NET` provider.
