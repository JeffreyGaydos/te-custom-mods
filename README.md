# Tank Encyclopedia Custom Modifications
## te-custom-mods | Current Version: 2.1.47

A wordpress plugin that performs various customizations for the website https://tanks-encyclopedia.com/

Plugin Name: Tank Encyclopedia Custom Mods

Author: Jeffrey Gaydos & Roshindow

## Description:
A plugin created to organize the various functions of the old child theme, thereby removing the need for the child theme. Includes toggles in case any functions fail during udpates.

## Important Differences From Live Site
- The name of the zip MUST be "te-custom-mods" in order for the dark mode CSS to work
- Version numbers of enqueued JavaScript files will often be higher than those in production during development
  - This is due to the need to force the browser to pull updated scripts instead of using any cached scripts
  - Final version numbers in the release should be 1 minor version higher than what is currently in production if that js file was changed

## Releases
Releases represent a set of newly created features or any bug fixes. Any releases marked with "In Production" mean that the attached zip files have been uploaded successfully to WordPress without issue. The latest release is intended to reflect what is on the live site.

To increase quality of deploys, the following pre-checks should be taken to ensure releases will work for all platforms and all devices
- Check that all features' styles work on mobile devices
- Check that all features work on Chrome, Edge, and Firefox

## Build Process
The automated build process is activated once a PR is marked ready for review and labeled with the label "Deploy Pending". See `./.github/workflows/build_release.yml`. This will kick off a build which will do the following:
- **Minimize Version Numbers**: For any `.js` or `.css` scripts that were changed, the version in the build should be 1 minor version above those in production. Major version updates will always set the minor version to 0. Production versions are determined based on the `prod-versions.ini` file. If anything unexpected happens, check that file first. The `prod-versions.ini` file will also be updated with the new versions that this script determines it needs (based on which versions are higher in the `tec-functions.php` file) as well as any new files it detects in `tec-functions.php`. Files that are no longer used should also get deleted from the `prod-versions.ini` file.
  - Relevant Files:
    - `./includes/build_scripts/build_js_version_minimize.py`
    - `./includes/build_scripts/build_css_version_minimize.py`
- **Increment Plugin Version**: The next step takes whatever version is listed in `prod-versions.ini` (looking for `te-custom-mods:`) and increments the minor version. It will increment this regardless of what the previous version is. If you would like to have a major version update (or middle version update) and want the minor version to restart at 0, be sure to set the minor version to -1 (i.e. setting the version to `te-custom-mods: 2.4.-1` will result in the version `2.4.0`). This step also updates the readme to match the new version.
  - Relevant Files:
    - `./includes/build_scripts/build_update_plugin_version.py`
- **Zip All Necessary Files**: This creates a zip that is "WordPress-ready". Only the scripts and images are part of the actual wordpress plugin, other files are for local development and documentation only. Be sure to change this if you intend to add a new kind of file. The output zip can be found at the root of the repo and must remain named `te-custom-mods.zip` in order to work properly with WordPress. Currently, the following rules apply to zipped files:
  - Included Extensions: `.css`, `.js`, `.php`, `.png`
  - Excluded Extensions: `.orig` before the final extension (`.orig.js`)
  - Excluded Files: `additional.css`
  - Relevant Files:
    - `./includes/build_scripts/build_zip_plugin.py`
- **Create Github Release**: After making the above changes and committing them to the branch, a release draft is created with the version determined by the plugin version incremeter. Note that the workflow will not overrite a release with the same tag, so the release may not show up if you used the same tag as a previous release. The title and body of the PR from which the release was created are added to the release title and body respectively. A link to the PR is added at the end of the release notes as well. This is all internal to the workflow and does not involve any python scripts

## RSS Feed

### Current Solution

Due to cloudflare blocking the GHA python scripts we were using to scrape the website, we have pivoted to using a custom page template imported directly to the theme. The source code for that template is found in the `RSS` folder and is intended to go at the root of the currently in use theme. If the theme is updated, this file will get deleted, so be sure to re-add it if you need to update the theme. This solution was chosen as a temporary fix until we can take over the theme completely, at which point it will become a permanent solution, as the theme code will be entirely owned by TE.

### Old Solution:

The custom RSS feed is implemented via the "raw" view of the code found in `RSS/recent-articles.rss`, specifically on the `DEV-custom-rss` branch. This file is updated via the GitHub action found in `.github/.workflows/rss_updates.yml` and currently runs every hour at the 7th minute of each hour and every 10 minutes from 7:27 AM - 9:27 AM UTC (3:27 AM - 5:27 AM EST). The python file that actually updates the RSS feed file is at `RSS/update_rss.py`, but specifically on the `DEV-custom-rss` branch. The python file on the `master` branch is not actually used by the action to update the RSS feed. Any RSS-related updates should be applied to both the `master` and `DEV-custom-rss` branches.

## Dev Automation

The `dev_automation` folder is intended to be used with the VS Code plugin [Run on Save](https://marketplace.visualstudio.com/items?itemName=emeraldwalk.RunOnSave&ssr=false#overview). The file `.vscode/settings.json` needs to be configured as follows for those scripts to work correctly:
```
{
    "emeraldwalk.runonsave": {
        "commands": [
            {
                "match": "\\.css$",
                "cmd": "py .\\includes\\dev_automation\\dev_tick_css.py -f \"${file}\" >> .\\includes\\dev_automation\\log.txt"
            },
            {
                "match": "\\.js$",
                "cmd": "py .\\includes\\dev_automation\\dev_tick_js.py -f \"${file}\" >> .\\includes\\dev_automation\\log.txt"
            },
            {
                "match": ".*",
                "cmd": "py .\\includes\\dev_automation\\dev_log_roller.py"
            }
        ]
    }
}
```

## AI

The following files were written with the help of AI:
- `./.github/workflows/build_release.yml`
- `./includes/build_scripts/build_zip_plugin.py`
