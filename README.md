# Tank Encyclopedia Custom Modifications
## te-custom-mods | Current Version: 2.1.5

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
- **Minimizes Version Numbers**: For any `.js` or `.css` scripts that were changed, the version in the build should be 1 minor version above those in production. Major version updates will always set the minor version to 0. Production versions are determined based on the `prod-versions.ini` file. If anything unexpected happens, check that file first. The `prod-versions.ini` file will also be updated with the new versions that this script determines it needs (based on which versions are higher in the `tec-functions.php` file) as well as any new files it detects in `tec-functions.php`. Files that are no longer used should also get deleted from the `prod-versions.ini` file.
  - Relevant Files:
    - `./includes/build_scripts/build_js_version_minimize.py`
    - `./includes/build_scripts/build_css_version_minimize.py`
- **Increments Plugin Version**: The next step takes whatever version is listed in `prod-versions.ini` (looking for `te-custom-mods:`) and increments the minor version. It will increment this regardless of what the previous version is. If you would like to have a major version update (or middle version update) and want the minor version to restart at 0, be sure to set the minor version to -1 (i.e. setting the version to `te-custom-mods: 2.4.-1` will result in the version `2.4.0`). This step also updates the readme to match the new version.
  - Relevant Files:
    - `./includes/build_scripts/build_update_plugin_version.py`
- **Zips all necessary files**: This creates a zip that is "WordPress-ready". Only the scripts and images are part of the actual wordpress plugin, other files are for local development and documentation only. Be sure to change this if you intend to add a new kind of file. The output zip can be found at the root of the repo and must remain named `te-custom-mods.zip` in order to work properly with WordPress. Currently, the following rules apply to zipped files:
  - Included Extensions: `.css`, `.js`, `.php`, `.png`
  - Excluded Extensions: `.orig` before the final extension (`.orig.js`)
  - Excluded Files: `additional.css`
  - Relevant Files:
    - `./includes/build_scripts/build_zip_plugin.py`
- **Creates a github release**: After making the above changes and committing them to the branch, a release draft is created with the version

## AI

The following files were written with the help of AI:
- `./.github/workflows/build_release.yml`
- `./includes/build_scripts/build_zip_plugin.py`