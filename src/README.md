# `src` Directory

Welcome to the source directory, here is a quick navigation guide for you:

* `index.tsx` - the entrypoint for Create React App (not important, but required).
* `App.tsx` - the code called by `index.tsx`, this has the navigation bar source and calls `TaskFactory.tsx`.
* `TaskFactory.tsx` - the React component that handles the states of all the data below the navigation bar. **This is most of the project code.**
* `index.css` - the basic CSS stylesheet that contains the font settings.
* `Centered.tsx` - a wrapper component for any content that should be center-aligned on the page.
* `Popup.tsx` - the logic that handles the styling of the popup that you can see after clicking export.
* `DockerSelect.tsx`, `MacOSSelect.tsx`, `WindowsSelect.tsx`, and `FreeBSDSelect.tsx` - each of these classes contains the code for the choosing of the exact OS version/image/identifier for each specific OS.
* `react-app-env-d.ts` - this file is needed by TypeScript, but I don't know what its purpose is.
* `CacheConfig.tsx`, `ScriptConfig.tsx` - these React components handle the expandable drawers that have the settings for each individual cache and script.
* `Static.tsx` - holds basic static content.
* `classes.ts` - this class (*which does not have any React logic in it, and should remain strictly typed*) handles the scripts, caches, OSes, and all the data related to them, as well as code that tells the app how to export them as valid YAML strings.
