# TestVibe Templates

Cookbook templates for provider tool packages shown in `ExtensionsView`.

These templates mirror the current `Tools/<Provider>/tools.js` architecture used by TestVibe today:

- package-level metadata at the top of `tools.js`
- tool-level metadata directly above each exported tool
- `async function` tool implementations with a single object parameter
- private helper functions kept unexported
- CommonJS export surface via `module.exports = { ... }`
- optional `tools.manifest.json` for provider dependencies and provider-level runtime settings

They are intentionally aligned with the current provider package format, not with the separate local Playwright MCP runtime used for validation.

## Providers

- `Simple`
- `SQL`
- `MySQL`
- `REST`

## Current Tool Shape

Each provider folder now contains `tools.js` and `tools.manifest.json`.

Recommended conventions:

- Use `//#PackageDescription=...` at the top of the file.
- Declare provider configuration once with top-level `//#Variables=...` and `//#Secrets=...`.
- Place `//#Summary`, `//#Description`, `//#ReturnsType`, `//#ReturnsValue`, and optional `//#Example` lines directly above each exported tool.
- Prefer a single object parameter:
  - `async function queryMySql({ sql, host } = {}) { ... }`
- Keep helper functions private unless they are intended to be tools.
- Export the callable tools explicitly:
  - `module.exports = { queryMySql }`
- Use `tools.manifest.json` when the provider needs runtime dependencies such as SQL or HTTP client packages.

## Notes

- `Templates/SQL` includes a sample `tools.manifest.json` that declares `mssql` as a provider dependency.
- `Templates/MySQL` includes a sample `tools.manifest.json` that declares `mysql2` as a provider dependency.
- `init-script.js` is optional and only needed for page-bound/browser helper scenarios such as the existing `Tools/Wisej.NET` provider.
- Validation snippets executed through TestVibe's local MCP runtime may now use Node globals in `browser_run_code`, but that does not change the current template format for `Tools/<Provider>/tools.js`.
