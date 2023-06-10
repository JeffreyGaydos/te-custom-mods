# te-custom-mods

A wordpress plugin that performs various customizations for the website https://tanks-encyclopedia.com/

Plugin Name: Tank Encyclopedia Custom Mods

Author: Jeffrey Gaydos & Roshindow

## Description:
A plugin created to organize the various functions of the old child theme, thereby removing the need for the child theme. Includes toggles in case any functions fail during udpates.

## Important Differences From Live Site
- The name of the zip MUST be "te-custom-mods" in order for the dark mode CSS to work
- Version numbers of enqueued JavaScript files will often be higher than those in production
  - This is due to the need to force the browser to pull updated scripts instead of using any cached scripts
  - Final version numbers in the release should be 1 minor version higher than what is currently in production if that js file was changed

## Releases
Releases represent a set of newly created features or any bug fixes. Any releases marked with "In Production" mean that the attached zip files have been uploaded successfully to WordPress without issue. The latest release is intended to reflect what is on the live site.

To increase quality of deploys, the following pre-checks should be taken to ensure releases will work for all platforms and all devices
- Check that all features' styles work on mobile devices
- Check that all features work on Chrome, Edge, and Firefox

## Build Process
The automated build process is still a work in progress. This process will run the following steps automatically:
- **Minimizes version numbers**: for any js or css scripts that were changed, the version in the build should be 1 minor version above those in production
- **Removes references to localhost**: for certain scripts, it is necessary to specify absolute paths when working locally. All references to these absolute paths are changed to relative paths on build
- **Zips all necessary files**: This creates a zip that is "WordPress-ready". Only the scripts and images are part of the actual wordpress plugin, other files are for local development and documentation only.
- **Creates a github release**: After merging a pull request, will run the automated build process steps listed above and create a sparse release with a proper tag version